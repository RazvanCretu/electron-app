import { AppBar, IconButton, Container } from "@mui/material";
import {
  MinimizeRounded,
  FullscreenRounded,
  CloseRounded,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useAuth } from "../contexts/auth";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: 0,
  paddingTop: "5vh",
  paddingLeft: "160px",
  height: "800px",
  minHeight: "100vh",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "unset",
  },
}));

const Layout = () => {
  const { data } = useAuth();

  console.log(data);

  return (
    <>
      <AppBar
        sx={{
          paddingRight: "1rem",
          height: "5vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "end",
          backgroundColor: "background.paper",
          zIndex: "1101",
          WebkitAppRegion: "drag",
          button: {
            WebkitAppRegion: "no-drag",
          },
        }}
      >
        <IconButton
          color="info"
          sx={{
            marginRight: ".5rem",
            padding: "2px",
          }}
          onClick={() => {
            window.electron.minimize();
          }}
        >
          <MinimizeRounded />
        </IconButton>
        <IconButton
          color="info"
          sx={{
            marginRight: ".5rem",
            padding: "2px",
          }}
          onClick={() => {
            window.electron.maximize();
          }}
        >
          <FullscreenRounded />
        </IconButton>
        <IconButton
          color="error"
          sx={{
            marginRight: ".5rem",
            padding: "2px",
          }}
          onClick={() => {
            window.electron.close();
          }}
        >
          <CloseRounded />
        </IconButton>
      </AppBar>
      <SideMenu />
      <StyledContainer component="main" disableGutters>
        <Outlet />
      </StyledContainer>
    </>
  );
};

export default Layout;
