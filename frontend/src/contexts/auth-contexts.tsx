import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";



interface JwtPayload {
  userId: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'CASHIER' | 'USER';
}




interface User {
  id: number;
  name: string;
  email: string;
  phonenumber: string;
  role: 'ADMIN' | 'CASHIER' | 'USER';
  createdAt?: string;
  updatedAt?: string;
}



interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signup: (email: string, password: string, name: string, phonenumber: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token and user data on mount
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (token) {
        try {
          // Decode the JWT token
          const decoded = jwtDecode<JwtPayload>(token);
          // Get user data from storage or create from token payload
          const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
          let userData: User;
          
          if (savedUser) {
            userData = JSON.parse(savedUser);
          } else {
            // Create user object from token payload
            userData = {
              id: decoded.userId,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              phonenumber: '' // Set default or get from elsewhere
            };
          }
          
          setUser(userData);
        } catch (error) {
          // If there's an error parsing the token or user data, clear both storages
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };
  
    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    const { user, token } = data;
    
    // save token and user data in local storage or session storage
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }else{
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
   
    
    setUser(user);
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string, phonenumber: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, phonenumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // After successful signup, log the user in
      await login(email, password, true);
    },
    [login]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};