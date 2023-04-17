import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import { Box, Button, Collapse, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/auth";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: 0,
  paddingTop: "5vh",
  paddingLeft: "160px",
  background: theme.palette.darkGrey.main,
  height: "100vh",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "unset",
  },
}));

const UpdateNotifier = (show = false, handleClose) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const content = show ? (
    <Box
      sx={{
        position: "absolute",
        width: "50%",
        height: "100px",
        margin: "0 auto",
        background: "darkGrey.dark",
        left: 0,
        right: 0,
        top: "50%",
        zIndex: 1103,
      }}
    >
      <Typography>A new version has been downloaded</Typography>
      <Button onClick={() => window.electron.update()}>Update</Button>
    </Box>
  ) : null;

  if (mounted) {
    return createPortal(content, document.getElementsByTagName("body")[0]);
  } else {
    return null;
  }
};

const Layout = () => {
  const [update, setUpdate] = useState(false);
  const { isAuthenticated } = useAuth();

  window.electron.handle("update_downloaded", () => {
    setUpdate(true);
  });

  return (
    <>
      {update && (
        <UpdateNotifier show={update} handleClose={() => setUpdate(false)} />
      )}
      <TopBar />
      <Collapse
        orientation="horizontal"
        in={isAuthenticated}
        mountOnEnter
        unmountOnExit
      >
        <SideMenu />
      </Collapse>
      <StyledContainer component="main" disableGutters>
        <Outlet />
      </StyledContainer>
    </>
  );
};

export default Layout;
