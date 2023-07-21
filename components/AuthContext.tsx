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

  const apiURL = 'https://kuku-hub-ba097a50ef10.herokuapp.com'

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get(`${apiURL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('User Data Response:', response.data);

      const userData = response.data;
      setUser(userData);
      console.log('Request Data:', response.config);
      console.log('User Data:', userData);
    } catch (error: any) {
      if (error.response) {
        console.log('Error Response Data:', error.response.data);
        console.log('Error Status:', error.response.status);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const handleLogin = async (name: string, password: string) => {
    try {
      const response = await axios.post(`${apiURL}/login`, {
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
