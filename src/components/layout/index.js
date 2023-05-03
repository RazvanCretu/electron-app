import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/auth";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";
import { CSSTransition } from "react-transition-group";

const StyledContainer = styled(Container)(({ theme, isAuthenticated }) => ({
  margin: 0,
  paddingTop: "5vh",
  background: theme.palette.darkGrey.main,
  height: "100vh",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "unset",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  margin: "0 auto",
  color: "hsla(0,0%,100%,1)",
  background: "rgba(0,0,0,.5)",
  overflowY: "hidden",
  borderRadius: "10px",
  zIndex: 1103,
  "&.enter": {
    opacity: 0,
    transform: "scale(0)",
  },
  "&.enter-active": {
    opacity: 1,
    transform: "scale(1)",
    transition: "transform .2s, opacity .7s",
  },
  "&.exit": {
    transform: "scale(1)",
    transition: "opacity .2s, transform .7s",
  },
  "&.exit-active": {
    opacity: 0,
    transform: "scale(0)",
  },
}));

const UpdateNotifier = ({ show = false, handleClose }) => {
  const [mounted, setMounted] = useState(false);
  const notifyRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const content = (
    <CSSTransition in={show} timeout={1000} nodeRef={notifyRef} unmountOnExit>
      <StyledBox ref={notifyRef}>
        <Typography>A new version has been downloaded</Typography>
        <Box>
          <Button variant="contained" onClick={() => window.electron.update()}>
            Update
          </Button>
          <Button variant="contained" onClick={handleClose} color="error">
            Close
          </Button>
        </Box>
      </StyledBox>
    </CSSTransition>
  );

  if (mounted) {
    return createPortal(content, document.getElementsByTagName("body")[0]);
  } else {
    return null;
  }
};

const Layout = () => {
  const [update, setUpdate] = useState(false);
  const { loading, isAuthenticated } = useAuth();

  window.electron.handle("update_downloaded", () => {
    setUpdate(true);
  });

  return (
    <>
      <UpdateNotifier show={update} handleClose={() => setUpdate(false)} />

      <TopBar />
      <SideMenu />
      <StyledContainer
        component="main"
        disableGutters
        sx={{
          paddingLeft: isAuthenticated ? "160px" : "0px",
          transition: ".3s",
          transitionProperty: "padding-left",
        }}
      >
        {loading && <div>Loading</div>}
        {/* <Button onClick={() => setUpdate(true)}>Notifier</Button> */}
        <Outlet />
      </StyledContainer>
    </>
  );
};

export default Layout;
