import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  userRole: string | null;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
};

interface MyComponentProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
