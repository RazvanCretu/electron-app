import { Box, Typography, IconButton } from "@mui/material";
import { FaGoogle, FaDiscord } from "react-icons/fa";

const LogIn = () => {
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
      <Typography sx={{ marginBottom: "2rem" }}>
        Please choose one of the following providers:
      </Typography>{" "}
      <Box>
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
    </Box>
  );
};

export default LogIn;
