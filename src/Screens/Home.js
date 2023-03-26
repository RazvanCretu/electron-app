import { useRef, useState } from "react";
import { Button, IconButton, Box, Typography } from "@mui/material";
import BarChart from "../components/charts/bar";
import { FileOpenRounded } from "@mui/icons-material";

// const data = [
//   {
//     country: "AD",
//     "hot dog": 52,
//     burger: 66,
//     sandwich: 94,
//     kebab: 2,
//     fries: 54,
//     donut: 41,
//   },
//   {
//     country: "AE",
//     "hot dog": 174,
//     burger: 61,
//     sandwich: 46,
//     kebab: 96,
//     fries: 45,
//     donut: 194,
//   },
//   {
//     country: "AF",
//     "hot dog": 33,
//     burger: 187,
//     sandwich: 47,
//     kebab: 25,
//     fries: 160,
//     donut: 142,
//   },
//   {
//     country: "AG",
//     "hot dog": 114,
//     burger: 51,
//     sandwich: 23,
//     kebab: 168,
//     fries: 49,
//     donut: 81,
//   },
//   {
//     country: "AI",
//     "hot dog": 145,
//     burger: 75,
//     sandwich: 179,
//     kebab: 165,
//     fries: 161,
//     donut: 19,
//   },
//   {
//     country: "AL",
//     "hot dog": 82,
//     burger: 29,
//     sandwich: 157,
//     kebab: 59,
//     fries: 23,
//     donut: 100,
//   },
//   {
//     country: "AM",
//     "hot dog": 69,
//     burger: 136,
//     sandwich: 85,
//     kebab: 82,
//     fries: 15,
//     donut: 146,
//   },
// ];

const Home = () => {
  // const [file, setFile] = useState();
  // const inFileRef = useRef();

  // const handleOpenFile = async () => {
  //   // inFileRef.current.click();
  //   const dir = await window.showDirectoryPicker();

  //   console.log(dir);

  //   for await (const entry of dir.values()) {
  //     console.log(entry.kind, entry.name, entry);
  //   }
  // };

  // const handleChangeFile = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.directory);
  //   setFile(e.target.files);
  // };

  return (
    <Box
      sx={{
        height: "100%",
        padding: "0 1rem",
      }}
    >
      {/* <input
        type="file"
        ref={inFileRef}
        onChange={handleChangeFile}
        style={{ display: "none" }}
      />
      {file && <Typography>{file.path}</Typography>} */}
      {/* <Button variant="contained" onClick={handleOpenFile}>
        Open Files
      </Button> */}
      <BarChart />
    </Box>
  );
};

export default Home;
