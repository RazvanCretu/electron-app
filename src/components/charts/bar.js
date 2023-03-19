import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalData, readLocalData } from "../../store/localDataSlice";
import {
  getBarChartSettings,
  setX,
  setY,
  setBy,
} from "../../store/barChartSlice";
import { IconButton, Box, Typography, TextField, Divider } from "@mui/material";
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
import SelectField from "../Select";

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
  const h = Math.floor(Math.random() * 360 + i);
  return `hsl(${h}, 100%, 70%, .8)`;
};

const BarChart = () => {
  const [chartTitle, setChartTitle] = useState("");
  const { x, y, by } = useSelector(getBarChartSettings);
  const { data: csvData, loading, error } = useSelector(getLocalData);
  const dispatch = useDispatch();
  const ref = useRef();

  const handleTitleChange = (e) => {
    if (e.key === "Enter") {
      setChartTitle(e.target.value);
    }
  };

  const getBarChartData = useMemo(() => {
    if (x && y) {
      return agregate(csvData, by, x, y);
    }
  }, [csvData, by, x, y]);

  const barData = getBarChartData || [];

  const labels = barData.reduce((acc, item) => {
    const isItem = acc.filter((i) => i === item.x)[0];

    if (!isItem) {
      acc.push(item.x);
    }

    return acc;
  }, []);

  const groupedData =
    by &&
    barData.reduce((acc, item) => {
      const isGroupItem = acc[item.group];
      if (isGroupItem) {
        acc[item.group].push(item);
      } else {
        acc[item.group] = [item];
      }
      return acc;
    }, {});

  // Sort 'inplace' all the grouped datasets to respect the order of the Labels
  Object.keys(groupedData).forEach((item, i) => {
    groupedData[item].sort((a, b) => {
      return labels.indexOf(a.x) - labels.indexOf(b.x);
    });
  });
  // console.log(groupedData);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    skipNull: true,
    plugins: {
      legend: {
        display: by ? true : false,
        position: "top",
      },
      title: {
        display: chartTitle ? true : false,
        text: chartTitle,
        font: {
          size: 16,
        },
      },
    },
  };

  const dataChart = {
    // X Axis
    labels: labels,
    // Y Axis
    datasets: by
      ? Object.keys(groupedData).map((el, i) => ({
          label: el,
          // data: groupedData[el].map((item) => item.y),
          data: labels.map((label) => {
            const index = groupedData[el].findIndex((item) => item.x === label);
            if (
              index !== -1 &&
              groupedData[el][index].x === label
              // groupedData[el][index].group === el
            ) {
              return groupedData[el][index].y;
            }
            return null;
          }),
          backgroundColor: randColor(i),
        }))
      : [
          {
            label: "",
            data: barData.map((item) => item.y),
            backgroundColor: randColor(Math.random() * 360),
          },
        ],
  };

  return (
    <Box
      sx={{
        padding: "1rem 1rem",
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          maxHeight: "60%",
          position: "relative",
          margin: "0 auto",
          canvas: {
            aspectRatio: "auto / auto",
            width: "100% !important",
            height: "100% !important",
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
            link.download = `chart.png`;
            link.href = chart.canvas.toDataURL("image/png");
            link.click();
          }}
        >
          <SaveRounded />
        </IconButton>
        <Chart
          width={null}
          height={null}
          type="bar"
          options={options}
          data={dataChart}
          ref={ref}
        />
      </Box>
      {csvData && <Typography>Loaded {csvData.length} entries.</Typography>}
      <TextField
        sx={{ m: "8px" }}
        id="standard-basic"
        label="Title"
        variant="standard"
        onKeyUp={handleTitleChange}
      />
      <IconButton
        size="small"
        variant="outlined"
        onClick={() => dispatch(readLocalData())}
      >
        <FileOpenRounded />
      </IconButton>
      <Divider sx={{ margin: "1rem auto" }} />
      <SelectField
        name="by"
        selectItems={csvData.length > 0 && Object.keys(csvData[0])}
        value={by}
        onChange={(e) => dispatch(setBy(e.target.value))}
      />
      <SelectField
        name="x"
        selectItems={csvData.length > 0 && Object.keys(csvData[0])}
        value={x}
        onChange={(e) => dispatch(setX(e.target.value))}
      />
      <SelectField
        name="y"
        selectItems={csvData.length > 0 && Object.keys(csvData[0])}
        value={y}
        onChange={(e) => dispatch(setY(e.target.value))}
      />
    </Box>
  );
};

const agregate = (csvData, by, x, y) => {
  const barData = csvData?.reduce((accumulator, item, i, arr) => {
    if (x && y) {
      const existItem = by
        ? accumulator.filter(
            (accItem) => accItem.x === item[x] && accItem.group === item[by]
          )[0]
        : accumulator.filter((accItem) => accItem.x === item[x])[0];

      if (!existItem) {
        accumulator.push({
          group: by ? item[by] : null,
          x: item[x],
          y: Number(item[y]),
        });
      } else {
        const index = accumulator.findIndex(
          (item) => item.x === existItem.x && item.group === existItem.group
        );
        accumulator[index].y = (Number(existItem.y) + Number(item[y])).toFixed(
          2
        );
      }
    }
    return accumulator;
  }, []);

  return barData;
};

export default BarChart;
