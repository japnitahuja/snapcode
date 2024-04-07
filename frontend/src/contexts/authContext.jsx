import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("Anonymous");
  const [isAuthContextLoading, setIsAuthContextLoading] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser("Anonymous");
  };

  const updateAuthContext = async (e) => {
    setIsAuthContextLoading(true);
    try {
      const response = await fetch("/api/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
      });

      const auth_response = await response.json();
      console.log(auth_response);

      if (response.ok) {
        console.log("Authenticated.");
        login();
    } 
    } catch (error) {
      console.log("Error:", error.message);
    }
    setIsAuthContextLoading(false);
  };

  useEffect(() => {
    updateAuthContext();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isAuthContextLoading,
        login,
        logout,
        updateAuthContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
