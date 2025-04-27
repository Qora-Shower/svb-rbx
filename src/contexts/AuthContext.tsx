
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user type
interface User {
  username: string;
}

// User database
const userDatabase = [
  { username: "Equinoobie", password: "S0ul" },
  { username: "Jolicraft", password: "Test" }
];

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => { success: boolean; timeoutMinutes?: number };
  logout: () => void;
  loginAttempts: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastLoginTime, setLastLoginTime] = useState<number>(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Retrieve login attempts and last login time from localStorage
    const savedAttempts = localStorage.getItem("loginAttempts");
    const savedLastTime = localStorage.getItem("lastLoginTime");
    
    if (savedAttempts) {
      setLoginAttempts(parseInt(savedAttempts));
    }
    
    if (savedLastTime) {
      setLastLoginTime(parseInt(savedLastTime));
    }
  }, []);

  const getTimeoutMinutes = (attempts: number) => {
    const totalCycles = Math.floor(attempts / 3);
    if (totalCycles === 0) return 0;
    if (attempts % 3 === 0) {
      return (totalCycles <= 3) ? totalCycles : 3;
    }
    return 0;
  };

  const login = (username: string, password: string) => {
    const now = Date.now();
    const timeoutMinutes = getTimeoutMinutes(loginAttempts);
    
    if (timeoutMinutes > 0) {
      const timeSinceLastAttempt = (now - lastLoginTime) / (1000 * 60);
      if (timeSinceLastAttempt < timeoutMinutes) {
        return { 
          success: false, 
          timeoutMinutes: timeoutMinutes 
        };
      }
    }

    const foundUser = userDatabase.find(
      (user) => user.username === username && user.password === password
    );
    
    if (foundUser) {
      const loggedInUser = { username: foundUser.username };
      setUser(loggedInUser);
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      setLoginAttempts(0);
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("lastLoginTime");
      return { success: true };
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      setLastLoginTime(now);
      localStorage.setItem("loginAttempts", newAttempts.toString());
      localStorage.setItem("lastLoginTime", now.toString());
      return { 
        success: false, 
        timeoutMinutes: getTimeoutMinutes(newAttempts) 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAttempts }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
