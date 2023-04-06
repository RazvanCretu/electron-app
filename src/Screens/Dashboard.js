import { Box } from "@mui/material";
import Bar from "../components/charts/bar";
import Controls from "../components/charts/bar/controls";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0 1rem",
      }}
    >
      <Bar />
      <Controls />
    </Box>
  );
};

export default Dashboard;
