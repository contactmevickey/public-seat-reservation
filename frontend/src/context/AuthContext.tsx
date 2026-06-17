import {
  createContext,
  useContext,
  useState,
} from "react";

type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: any) => {
  const [user, setUser] = useState<User | null>(
    null
  );

  const handleLogin = (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => {
    localStorage.setItem(
      "accessToken",
      accessToken
    );

    localStorage.setItem(
      "refreshToken",
      refreshToken
    );

    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
