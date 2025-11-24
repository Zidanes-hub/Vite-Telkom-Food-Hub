import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('telkom-food-hub-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('telkom-food-hub-user');
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('telkom-food-hub-user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('telkom-food-hub-user');
    setUser(null);
  };

  return { user, login, logout };
};
