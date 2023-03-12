import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconButton,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { SaveRounded, FileOpenRounded } from "@mui/icons-material";
// ChartJS charting library
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const randColor = (i) => {
  const h = Math.floor((Math.random() * 360) / (i + 1));
  return `hsl(${h}, 100%, 70%, .8)`;
};

const BarChart = () => {
  const [csvData, setCsvData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const ref = useRef();
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [by, setBy] = useState("");

  const handleTitleChange = (e) => {
    if (e.key === "Enter") {
      setChartTitle(e.target.value);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 16,
        },
      },
    },
  };

  const getBarChartData = useCallback(
    () => agregate(csvData, by, x, y),
    [csvData, by, x, y]
  );
  const barData = csvData ? getBarChartData() : [];

  const data = {
    labels: barData.length >= 1 ? Object.keys(barData[0]).slice(1) : [], // X Axis
    datasets:
      barData?.map((item, i) => ({
        // Y Axis
        label: Object.values(item)[0],
        data: Object.values(item).slice(1),
        backgroundColor: randColor(i),
      })) || [],
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        canvas: {
          aspectRatio: "auto",
        },
        "&:hover .MuiButtonBase-root": {
          display: "inline-flex",
        },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "none",
        }}
        size="small"
        onClick={() => {
          const chart = ref.current;
          const link = document.createElement("a");
          link.download = `${chartTitle}.png`;
          link.href = chart.canvas.toDataURL("image/png");
          link.click();
        }}
      >
        <SaveRounded />
      </IconButton>
      <Chart
        width="auto"
        height="auto"
        type="bar"
        options={options}
        data={data}
        ref={ref}
        aspectratio="auto / auto"
      />
      {csvData && <Typography>Loaded {csvData.length} entries.</Typography>}
      <input type="text" onKeyUp={handleTitleChange} />
      <IconButton
        size="small"
        variant="outlined"
        onClick={async () => {
          const csvData = await window.electron.openCsv();
          setCsvData(csvData);
        }}
      >
        <FileOpenRounded />
      </IconButton>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="by">By</InputLabel>
        <Select
          labelId="by"
          id="by"
          value={by}
          label="By"
          onChange={(e) => setBy(e.target.value)}
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          {csvData.length >= 1 &&
            Object.keys(csvData[0]).map((item, i) => (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="x">X</InputLabel>
        <Select
          labelId="x"
          id="x"
          value={x}
          label="X"
          onChange={(e) => setX(e.target.value)}
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          {csvData.length >= 1 &&
            Object.keys(csvData[0]).map((item, i) => (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="y">Y</InputLabel>
        <Select
          labelId="y"
          id="y"
          value={y}
          label="Y"
          onChange={(e) => setY(e.target.value)}
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          {csvData.length >= 1 &&
            Object.keys(csvData[0]).map((item, i) => (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const agregate = (csvData, by, x, y) => {
  const barData = csvData?.reduce((accumulator, item, i, arr) => {
    if (x && y && by) {
      const existItem = accumulator.filter(
        (accItem) => accItem[by] === item[by]
      )[0];

      if (!existItem) {
        accumulator.push({
          [by]: item[by],
          [item[x]]: Number(item[y]),
        });
      } else {
        const index = accumulator.indexOf(existItem);
        accumulator[index] = {
          ...existItem,
          [item[x]]: (
            Number(existItem[item[x]] || 0) + Number(item[y])
          ).toFixed(2),
        };
      }
    }
    return accumulator;
  }, []);

  console.log(barData);
  return barData;
};

export default BarChart;
