import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  List,
  ListSubheader,
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

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontWeight: 500,
    fontSize: ".85rem",
    letterSpacing: "0.04em",
  },
}));

const SideMenu = () => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <AppBar
      sx={{
        marginTop: "5vh",
        height: "100%",
        left: 0,
        backgroundColor: "darkGrey.dark",
        width: "100%",
        maxWidth: 160,
      }}
    >
      <List
        component="nav"
        sx={{
          width: "100%",
          pt: "0px",
          "& .active": {
            bgcolor: "red",
          },
        }}
        aria-label="menu"
      >
        <ListItemButton to="/dashboard" component={NavLink}>
          <ListItemIcon sx={{ minWidth: "36px" }}>
            <HouseRounded fontSize="small" />
          </ListItemIcon>
          <StyledListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton to="/search" component={NavLink}>
          <ListItemIcon sx={{ minWidth: "36px" }}>
            <SearchRounded fontSize="small" />
          </ListItemIcon>
          <StyledListItemText primary="Search" />
        </ListItemButton>
        {isAuthenticated && (
          <ListItemButton to="/settings" component={NavLink}>
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <SettingsRounded fontSize="small" />
            </ListItemIcon>
            <StyledListItemText primary="Settings" />
          </ListItemButton>
        )}
        <Divider />
        {isAuthenticated ? (
          <ListItemButton onClick={signOut}>
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <LogoutRounded fontSize="small" />
            </ListItemIcon>
            <StyledListItemText primary="Log Out" />
          </ListItemButton>
        ) : (
          <ListItemButton to="/login" component={NavLink}>
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <LoginRounded fontSize="small" />
            </ListItemIcon>
            <StyledListItemText primary="Log In" />
          </ListItemButton>
        )}
      </List>
    </AppBar>
  );
};

export default SideMenu;
