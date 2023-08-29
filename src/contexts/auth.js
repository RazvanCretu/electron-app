import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { QUERY_ME } from "../queries/user";

const localToken = () => {
  // run client-side only
  if (typeof window !== "undefined") {
    const localToken = window.localStorage.getItem("token");
    return localToken || undefined;
  }
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const Auth = ({ children }) => {
  const navigate = useNavigate();
  const [login, { error, loading, data, client }] = useLazyQuery(QUERY_ME, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: () => {
      navigate("/dashboard");
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-only",
  });

  const logout = async () => {
    // navigate("/");
    window.localStorage.removeItem("token");
    await client.resetStore();
    // await client.clearStore();
    // client.cache.gc();
  };

  const isAuthenticated = data?.me !== undefined;

  useEffect(() => {
    window.electron.handleToken("token", (message) => {
      const url = new URLSearchParams(message.replace("succes/", ""));
      const params = Object.fromEntries(url.entries());

      window.localStorage.setItem("token", params.token);
      login();
    });

    if (!isAuthenticated) {
      login();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        data,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
