import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();


// PROVIDER
export const AuthProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState(null);

  // LOAD USER FROM LOCAL STORAGE
  useEffect(() => {

    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }

  }, []);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("userInfo");

    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// CUSTOM HOOK
export const useAuth = () => {
  return useContext(AuthContext);
};