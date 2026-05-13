import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './auth/AuthContext';
import { LocaleProvider } from './i18n/LocaleContext';
import { ThemeProvider } from './theme/ThemeContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <LocaleProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </LocaleProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
