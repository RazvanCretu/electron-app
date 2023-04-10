import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { readLocalData } from "../store/localDataSlice";
import { FileOpenRounded } from "@mui/icons-material";
import Bar from "../components/charts/bar";
import Controls from "../components/charts/bar/controls";

const Dashboard = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.localData.data.length);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0 1rem",
      }}
    >
      {count === 0 ? (
        <Button
          sx={{ m: "auto" }}
          size="small"
          variant="contained"
          onClick={() => dispatch(readLocalData())}
          startIcon={<FileOpenRounded />}
        >
          Load Csv
        </Button>
      ) : (
        <>
          <Bar />
          <Controls />
        </>
      )}
    </Box>
  );
};

export default Dashboard;
