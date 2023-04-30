import { Link, Outlet, useLocation } from "react-router-dom";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

const Profile = () => {
  const location = useLocation();
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography>{location.pathname}</Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          height: "80%",
          overflow: "hidden",
        }}
      >
        <Tabs value={location.pathname}>
          <Tab label="Me" value="/profile" to="" component={Link} />
          <Tab label="Edit" value="/profile/edit" to="edit" component={Link} />
        </Tabs>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Profile;
