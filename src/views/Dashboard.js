import {
  Box,
  Button,
  CircularProgress,
  Input,
  LinearProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { readLocalData, setData, setLoading } from "../store/localDataSlice";
import { FileOpenRounded } from "@mui/icons-material";
import Bar from "../components/charts/bar";
import Controls from "../components/charts/bar/controls";
import Loader from "../components/Loader";
import Papa from "papaparse";
import serviceWorker from "../serviceWorker.js";
import { useMemo } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.localData.data.length);
  const loading = useSelector((state) => state.localData.loading);
  // const { loading } = useSelector((state) => state.localData);
  const worker = useMemo(() => new Worker(serviceWorker), []);

  worker.postMessage("res");

  const changeHandler = (event) => {
    console.log(event.target.files[0]);

    // worker.postMessage("es");
    dispatch(setLoading());

    // worker.postMessage("res");
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      worker: true,
      complete: function (results) {
        dispatch(setData(results));
        // dispatch(setLoading(false));
      },
    });
  };

  if (loading) {
    return (
      <>
        <CircularProgress sx={{ margin: "auto" }} />;
        <LinearProgress />
      </>
    );
  }

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
        <>
          <Button
            sx={{ m: "auto" }}
            size="small"
            variant="contained"
            onClick={() => dispatch(readLocalData())}
            startIcon={<FileOpenRounded />}
          >
            Load Csv
          </Button>
          <Input
            type="file"
            name="file"
            accept=".csv,.xlsx,.xls"
            // onClick={() => {
            //   dispatch(setLoading());
            // }}
            onChange={changeHandler}
            placeholder="Import csv"
            aria-label="Import csv"
            // sx={{ display: "block", margin: "10px auto" }}
          />
        </>
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
