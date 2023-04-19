import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  AppBar,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import {
  LogoutRounded,
  TableChartRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/auth";

const Menu = styled(AppBar)(({ theme }) => ({
  marginTop: "5vh",
  height: "100%",
  left: 0,
  backgroundColor: theme.palette.darkGrey.dark,
  width: "100%",
  maxWidth: 160,
  "&.enter": {
    transform: "translateX(-100%)",
    opacity: 0,
  },
  "&.enter-active": {
    transform: "translateX(0%)",
    opacity: "1",
    transition: ".7s",
  },
  "&.exit": {
    transform: "translateX(0%)",
    opacity: "0",
    transition: ".7s",
  },
  "&.exit-active": {
    transform: "translateX(-100%)",
  },
}));

const MenuList = styled(List)(({ theme }) => ({
  width: "100%",
  pt: "0px",
  "& .active": {
    color: theme.palette.darkGrey.light,
    svg: {
      color: theme.palette.darkGrey.light,
    },
  },
}));

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontWeight: 500,
    fontSize: ".85rem",
    letterSpacing: "0.04em",
  },
}));

const MenuItem = ({ to, icon, primary, onClick, ButtonComponent }) => {
  return (
    <ListItemButton to={to} component={ButtonComponent} onClick={onClick}>
      <ListItemIcon sx={{ minWidth: "36px" }}>{icon}</ListItemIcon>
      <ListItemTextStyled primary={primary} />
    </ListItemButton>
  );
};

const SideMenu = () => {
  const { isAuthenticated, logOut } = useAuth();
  const menuRef = useRef(null);

  return (
    <CSSTransition
      in={isAuthenticated}
      timeout={700}
      nodeRef={menuRef}
      unmountOnExit
    >
      <Menu ref={menuRef}>
        <MenuList component="nav" aria-label="menu">
          <MenuItem
            to="/dashboard"
            icon={<TableChartRounded fontSize="small" />}
            primary="Dashboard"
            ButtonComponent={NavLink}
          />
          <MenuItem
            to="/settings"
            icon={<SettingsRounded fontSize="small" />}
            primary="Settings"
            ButtonComponent={NavLink}
          />
          <Divider />
          <MenuItem
            icon={<LogoutRounded fontSize="small" />}
            primary="Log out"
            onClick={logOut}
          />
        </MenuList>
      </Menu>
    </CSSTransition>
  );
};

export default SideMenu;
