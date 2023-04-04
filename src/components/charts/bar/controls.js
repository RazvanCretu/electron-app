import SelectField from "../../Select";
import {
  Box,
  Paper,
  Divider,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { FileOpenRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setBy,
  setX,
  setY,
  getBarChartSettings,
} from "../../../store/barChartSlice";
import { getLocalData, readLocalData } from "../../../store/localDataSlice";

const Controls = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.localData.data.length);
  const { data: csvData } = useSelector(getLocalData);
  const { x, y, by } = useSelector(getBarChartSettings);

  const handleTitleChange = (e) => {
    if (e.key === "Enter") {
      dispatch(setTitle(e.target.value));
      setTitle(e.target.value);
    }
  };

  return (
    <Paper
      sx={{
        marginBottom: "1rem",
        padding: ".25rem .5rem",
        height: "100%",
        backgroundColor: "darkGrey.light",
        display: "flex",
        flexFlow: "column",
      }}
      elevation={4}
    >
      {count === 0 ? (
        <IconButton
          size="small"
          variant="outlined"
          onClick={() => dispatch(readLocalData())}
        >
          <FileOpenRounded />
        </IconButton>
      ) : (
        <>
          <Typography
            sx={{
              fontStyle: "italic",
              fontSize: ".775rem",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            {count} rows
          </Typography>
          <Typography
            sx={{
              fontStyle: "italic",
              fontSize: ".95rem",
              color: "rgba(0, 0, 0, 0.6)",
              pl: "1rem",
            }}
          >
            Layout
          </Typography>
          <TextField
            sx={{ m: "8px", ml: "1.5rem", width: "auto" }}
            id="standard-basic"
            label="Title"
            variant="standard"
            onKeyUp={handleTitleChange}
            fullWidth
          />
          <Divider sx={{ margin: "1rem auto" }} />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box pl="1rem" sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: ".95rem",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                X Axis
              </Typography>
              <SelectField
                name="primary"
                selectItems={csvData.length > 0 && Object.keys(csvData[0])}
                value={x}
                onChange={(e) => dispatch(setX(e.target.value))}
              />
              <SelectField
                name="group"
                selectItems={csvData.length > 0 && Object.keys(csvData[0])}
                value={by}
                onChange={(e) => dispatch(setBy(e.target.value))}
              />
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box pl="1rem">
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: ".95rem",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                Y Axis
              </Typography>
              <SelectField
                name="Primary"
                selectItems={csvData.length > 0 && Object.keys(csvData[0])}
                value={y}
                onChange={(e) => dispatch(setY(e.target.value))}
              />
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Controls;
