import { createContext, useContext } from 'react';

type AuthContextProps = {
  logIn: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FCWC = ({ children }) => {
  const logIn = () => {
    console.log('logged in');
  };

  return <AuthContext.Provider value={{ logIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
