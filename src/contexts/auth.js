import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

const QUERY_ME = gql`
  query User {
    me {
      id
      username
      email
    }
  }
`;

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
  const navigate = useNavigate();
  const [signIn, { data, loading, error, client, updateQuery }] = useLazyQuery(
    QUERY_ME,
    { fetchPolicy: "network-only" }
  );

  const isAuthenticated = data?.me && true;

  const logIn = (token) => {
    signIn({
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }).then((resp) => {
      if (resp.data?.me) navigate("/dashboard");
    });
  };

  const signOut = () => {
    updateQuery((prevData) => ({
      ...prevData,
      me: null,
    }));
    client.clearStore();

    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localToken();
    if (token) logIn(token);

    window.electron.handleToken("token", (message) => {
      const url = new URLSearchParams(message.replace("succes/", ""));
      const params = Object.fromEntries(url.entries());

      window.localStorage.setItem("token", params.token);

      logIn(params.token);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{ data, loading, error, isAuthenticated, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
