import SelectField from "../../Select";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FileOpenRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setBy,
  setX,
  setY,
  setLegend,
  getBarChartSettings,
} from "../../../store/barChartSlice";
import {
  clear,
  getLocalData,
  readLocalData,
} from "../../../store/localDataSlice";

const Controls = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.localData.data.length);
  const { data: csvData } = useSelector(getLocalData);
  const { x, y, by, title, legend } = useSelector(getBarChartSettings);

  const handleTitleChange = (e) => {
    if (e.key === "Enter") {
      dispatch(setTitle(e.target.value));
      //   setTitle(e.target.value);
    }
  };

  const handleChecked = (e) => {
    dispatch(setLegend(e.target.checked));
  };

  const onChangeTile = (e) => dispatch(setTitle(e.target.value));

  return (
    <Paper
      sx={{
        marginBottom: "1rem",
        padding: ".75rem 1.5rem",
        height: "100%",
        maxHeight: "40%",
        backgroundColor: "darkGrey.light",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      elevation={4}
    >
      {count === 0 ? (
        <Button
          sx={{ m: "auto" }}
          size="small"
          variant="outlined"
          onClick={() => dispatch(readLocalData())}
          startIcon={<FileOpenRounded />}
        >
          Load Csv
        </Button>
      ) : (
        <>
          <Typography
            sx={{
              fontStyle: "italic",
              fontSize: ".775rem",
              color: "rgba(0, 0, 0, 0.6)",
              position: "absolute",
            }}
          >
            {count} rows
          </Typography>
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            fullWidth
            value={title}
            onChange={onChangeTile}
            onKeyUp={handleTitleChange}
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              pt: "1rem",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <SelectField
                name="X Axis"
                selectItems={csvData.length > 0 && Object.keys(csvData[0])}
                value={x}
                onChange={(e) => dispatch(setX(e.target.value))}
              />
              <SelectField
                name="Group"
                selectItems={csvData.length > 0 && Object.keys(csvData[0])}
                value={by}
                onChange={(e) => dispatch(setBy(e.target.value))}
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <SelectField
                name="Y Axis"
                selectItems={csvData.length > 0 && Object.keys(csvData[0])}
                value={y}
                onChange={(e) => dispatch(setY(e.target.value))}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              mt: "1rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            {/* <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
              }}
            > */}
            <InputLabel
              sx={{
                transform: "unset",
                "-webkit-transform": "unset",
                position: "relative",
                mr: "1rem",
              }}
              id="legend"
            >
              Legend
            </InputLabel>
            <Checkbox
              size="small"
              aria-labelledby="legend"
              checked={legend}
              onChange={handleChecked}
            />
            {/* </FormControl> */}
            {/* <FormControlLabel
              control={<Checkbox checked={legend} onChange={handleChecked} />}
              label="Legend"
            /> */}
          </Box>
          <Box mt=".6rem">
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                dispatch(clear());
              }}
            >
              Clear Data
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Controls;
