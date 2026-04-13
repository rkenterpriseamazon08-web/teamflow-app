import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginWithSheetCredentials } from '../services/loginService';

const AuthContext = createContext(null);
const STORAGE_KEY = 'teamflow_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await loginWithSheetCredentials(email, password);
    setUser(response.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(response.user));
    return response.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };
 const value = useMemo(() => ({ user, login, logout, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
