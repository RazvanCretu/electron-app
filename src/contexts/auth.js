import { createContext, useContext, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const AuthContext = createContext();

const localToken = () => {
  // run client-side only
  if (typeof window !== "undefined") {
    const localToken = window.localStorage.getItem("token");
    return localToken || undefined;
  }
};

export const useAuth = () => useContext(AuthContext);

export const Auth = ({ children }) => {
  const [signIn, { data, loading, error, client, updateQuery }] = useLazyQuery(
    gql`
      query User {
        me {
          id
          username
          email
        }
      }
    `,
    { fetchPolicy: "network-only" }
  );

  useEffect(() => {
    const token = localToken();
    if (token) {
      signIn({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, [signIn]);

  window.electron.handleToken("token", (message) => {
    const url = new URLSearchParams(message.replace("succes/", ""));
    const params = Object.fromEntries(url.entries());

    window.localStorage.setItem("token", params.token);

    signIn({
      context: {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      },
    });
  });

  const isAuthenticated = data?.me && true;

  const signOut = async () => {
    updateQuery((prevData) => ({
      me: null,
    }));
    await client.clearStore();

    window.localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ data, loading, error, isAuthenticated, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
