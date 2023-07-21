import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:3001/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const handleLogin = async (name: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        name,
        password,
      });

      const { user, token } = response.data as { user: User; token: string };

      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.log('Error during login:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export  { AuthContext, AuthProvider };
