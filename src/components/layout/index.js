import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

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
        width: "200px",
        height: "100px",
        background: "darkGrey.dark",
      }}
    >
      <Typography>A new version has been downloaded</Typography>
      <Button onClick={() => window.electron.update()}>Update</Button>
    </Box>
  ) : null;

  if (mounted) {
    return ReactDOM.createPortal(
      content,
      document.getElementsByTagName("body")[0]
    );
  } else {
    return null;
  }
};

const Layout = () => {
  const [update, setUpdate] = useState(false);
  window.electron.handle("update_downloaded", () => {
    setUpdate(true);
  });
  return (
    <>
      {update && (
        <UpdateNotifier show={update} handleClose={() => setUpdate(false)} />
      )}
      <TopBar />
      <SideMenu />
      <StyledContainer component="main" disableGutters>
        <Outlet />
      </StyledContainer>
    </>
  );
};

export default Layout;
