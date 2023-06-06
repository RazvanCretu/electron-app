import { Box, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  readLocalData,
  setData,
  setLoading,
  pushRow,
} from "../store/localDataSlice";
import { FileOpenRounded } from "@mui/icons-material";
import Bar from "../components/charts/bar";
import Controls from "../components/charts/bar/controls";
// import Loader from "../components/Loader";
import Papa from "papaparse";
import { useMemo, useState } from "react";

const Dashboard = () => {
  const [filename, setFilename] = useState("");
  const dispatch = useDispatch();
  const count = useSelector((state) => state.localData.data.length);
  const loading = useSelector((state) => state.localData.loading);

  // const worker = useMemo(() => new Worker(serviceWorker), []);

  // worker.postMessage("res");

  const changeHandler = (event) => {
    const file = event.target.files[0];
    // console.log(file);

    dispatch(setLoading());

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      worker: true,
      complete: function (results, file) {
        dispatch(setData(results.data));
      },
    });
  };

  const handleFileUpload = (e) => {
    dispatch(setLoading());

    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      // console.log(result);
      Papa.parse(result, {
        header: true,
        skipEmptyLines: true,
        worker: true,
        // step: function (results) {
        //   console.log("Row:", results.data);
        //   dispatch(pushRow(results.data));
        // },
        complete: function (results) {
          dispatch(setLoading());
          dispatch(setData(results.data));
        },
      });
    };
    // console.log(filename);
    reader.readAsText(file, "UTF-8");
  };

  if (loading) {
    return <CircularProgress sx={{ margin: "auto" }} />;
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
            // onClick={() => dispatch(readLocalData())}
            startIcon={<FileOpenRounded />}
            component="label"
          >
            Load Csv
            <input type="file" hidden onChange={changeHandler} />
          </Button>
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
