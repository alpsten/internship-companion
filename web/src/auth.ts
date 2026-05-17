export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ProgressResponse = {
  completedTaskIds: string[];
};

export type SchoolProfile = {
  slug: string;
  name: string;
  domain: string;
  theme: string;
  welcomeMessage: string;
  highlights: string[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    let message = 'Request failed.';

    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // Fall back to generic message if the response body is not JSON.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export type RegisterResponse = { email: string };

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  return request<RegisterResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function verifyEmail(email: string, code: string): Promise<AuthResponse> {
  return request<AuthResponse>('/api/auth/verify', {
    method: 'POST',
    body: JSON.stringify({ email, code })
  });
}

export async function resendVerification(email: string): Promise<void> {
  return request<void>('/api/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function logout(token: string): Promise<void> {
  return request<void>('/api/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
  return request<AuthUser>('/api/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getProgress(token: string): Promise<ProgressResponse> {
  return request<ProgressResponse>('/api/progress', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function updateProgress(
  token: string,
  completedTaskIds: string[]
): Promise<ProgressResponse> {
  return request<ProgressResponse>('/api/progress', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ completedTaskIds })
  });
}

export async function getSchoolProfile(token: string): Promise<SchoolProfile> {
  return request<SchoolProfile>('/api/school-profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export { ApiError, API_BASE_URL };
