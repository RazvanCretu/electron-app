import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
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

const Layout = () => {
  return (
    <>
      <TopBar />
      <SideMenu />
      <StyledContainer component="main" disableGutters>
        <Outlet />
      </StyledContainer>
    </>
  );
};

export default Layout;
