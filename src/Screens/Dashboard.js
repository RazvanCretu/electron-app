import { Box } from "@mui/material";
import BarChart from "../components/charts/bar";
import Controls from "../components/charts/bar/controls";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        height: "100%",
        padding: "0 1rem",
      }}
    >
      <BarChart />
      <Controls />
    </Box>
  );
};

export default Dashboard;
