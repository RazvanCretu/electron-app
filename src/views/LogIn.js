import {
  Box,
  Typography,
  IconButton,
  Card,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { useMutation } from "@apollo/client";
// import { useAuth } from "../contexts/auth";
import { LOGIN, QUERY_ME } from "../queries/user";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LogIn = () => {
  // const { login } = useAuth();
  const [authenticate, { error, loading, reset }] = useMutation(LOGIN, {
    update: (cache, { data: { login } }) => {
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: login.user },
      });
    },
    onCompleted: ({ login: { jwt } }) => {
      // if (jwt) {
      window.localStorage.setItem("token", jwt);
      // login();
      // }
    },
  });
  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "test@gmail.com",
      password: "test1234",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      authenticate({
        variables: {
          input: {
            identifier: values.email,
            password: values.password,
            provider: "local",
          },
        },
      });
    },
  });

  if (error) {
    return (
      <>
        {JSON.stringify(error, "\n", 2)}
        <Button variant="contined" onClick={() => reset()}>
          Reset
        </Button>
      </>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "400px",
          boxShadow: "none",
          background: "transparent",
          borderRadius: "10px",
          ".MuiTextField-root": {
            marginBottom: "1rem",
          },
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Submit
        </Button>
        <Divider
          sx={{
            height: "1px",
            mt: "1rem",
          }}
        />
        <Typography sx={{ mt: "1rem" }}>
          Or choose one of the following providers:
        </Typography>{" "}
        <Box
          sx={{
            mt: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            component="a"
            target="_blank"
            href="https://razvicodes.herokuapp.com/api/connect/google"
            rel="noreferrer"
          >
            <FaGoogle />
          </IconButton>
          <IconButton
            component="a"
            target="_blank"
            href="https://razvicodes.herokuapp.com/api/connect/discord"
            rel="noreferrer"
          >
            <FaDiscord />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default LogIn;
