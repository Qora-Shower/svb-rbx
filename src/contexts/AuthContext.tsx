
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user type
interface User {
  username: string;
}

// User database
const userDatabase = [
  { username: "Equinoobie", password: "1234" },
  { username: "MaxBusFahrer", password: "password1" },
  { username: "BusProfi99", password: "busdriver" },
  { username: "HiIamSteve", password: "steve123" },
  { username: "NachtFahrer", password: "nacht2025" }
];

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Find user in database
    const foundUser = userDatabase.find(
      (user) => user.username === username && user.password === password
    );
    
    if (foundUser) {
      const loggedInUser = { username: foundUser.username };
      setUser(loggedInUser);
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
