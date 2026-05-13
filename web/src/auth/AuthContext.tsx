import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  type AuthUser,
  type LoginPayload,
  type RegisterPayload
} from '../auth';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const TOKEN_STORAGE_KEY = 'internship-companion-auth-token';

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  });
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => token !== null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (token) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
      return;
    }

    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }, [token]);

  useEffect(() => {
    let isCancelled = false;

    async function restoreUser() {
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const currentUser = await getCurrentUser(token);
        if (!isCancelled) {
          setUser(currentUser);
        }
      } catch {
        if (!isCancelled) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void restoreUser();

    return () => {
      isCancelled = true;
    };
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: user !== null && token !== null,
      isLoading,
      async login(payload: LoginPayload) {
        const response = await loginRequest(payload);
        setToken(response.token);
        setUser(response.user);
      },
      async register(payload: RegisterPayload) {
        const response = await registerRequest(payload);
        setToken(response.token);
        setUser(response.user);
      },
      async logout() {
        if (token) {
          try {
            await logoutRequest(token);
          } catch {
            // Clear local auth state even if the backend token is already gone.
          }
        }

        setToken(null);
        setUser(null);
      }
    }),
    [isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
