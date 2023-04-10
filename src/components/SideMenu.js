import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import {
  HouseRounded,
  LogoutRounded,
  LoginRounded,
  SearchRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { useAuth } from "../contexts/auth";

const Menu = styled(AppBar)(({ theme }) => ({
  marginTop: "5vh",
  height: "100%",
  left: 0,
  backgroundColor: theme.palette.darkGrey.dark,
  width: "100%",
  maxWidth: 160,
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
  const { isAuthenticated, signOut } = useAuth();

  return (
    <Menu>
      <MenuList component="nav" aria-label="menu">
        <MenuItem
          to="/search"
          icon={<SearchRounded fontSize="small" />}
          primary="Search"
          ButtonComponent={NavLink}
        />
        {isAuthenticated && (
          <>
            <MenuItem
              to="/dashboard"
              icon={<HouseRounded fontSize="small" />}
              primary="Dashboard"
              ButtonComponent={NavLink}
            />
            <MenuItem
              to="/settings"
              icon={<SettingsRounded fontSize="small" />}
              primary="Settings"
              ButtonComponent={NavLink}
            />
          </>
        )}
        <Divider />
        {isAuthenticated ? (
          <MenuItem
            icon={<LogoutRounded fontSize="small" />}
            primary="Log out"
            onClick={signOut}
          />
        ) : (
          <MenuItem
            to="/login"
            icon={<LoginRounded fontSize="small" />}
            primary="Log in"
            ButtonComponent={NavLink}
          />
        )}
      </MenuList>
    </Menu>
  );
};

export default SideMenu;
