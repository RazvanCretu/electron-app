import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { getLocalData } from "../../store/localDataSlice";
import { getBarChartSettings } from "../../store/barChartSlice";
import { IconButton, Box } from "@mui/material";
import { SaveRounded } from "@mui/icons-material";
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
  const h = Math.floor(Math.random() * 360 + i);
  return `hsl(${h}, 100%, 70%, .8)`;
};

const BarChart = () => {
  const ref = useRef();
  const { x, y, by, title } = useSelector(getBarChartSettings);
  const { data: csvData } = useSelector(getLocalData);

  const dataChart = useMemo(() => {
    if (x && y) {
      const barData = agregate(csvData, by, x, y);

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

      groupedData &&
        Object.keys(groupedData).forEach((item, i) => {
          groupedData[item].sort((a, b) => {
            return labels.indexOf(a.x) - labels.indexOf(b.x);
          });
        });

      return {
        // X Axis
        labels: labels,

        // Y Axis
        datasets: by
          ? Object.keys(groupedData).map((el, i) => ({
              label: el,
              data: labels.map((label) => {
                const index = groupedData[el].findIndex(
                  (item) => item.x === label
                );
                if (index !== -1 && groupedData[el][index].x === label) {
                  return groupedData[el][index].y;
                }
                return null;
              }),
              color: "rgba(255,255,255,1)",
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
    } else {
      return {
        labels: [],
        datasets: [],
      };
    }
  }, [csvData, by, x, y]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    skipNull: true,
    color: "rgba(255,255,255,.75)",
    scales: {
      x: {
        grid: {
          color: "rgba(255,255,255,.3)",
        },
        ticks: {
          color: "rgba(255,255,255,.75)",
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,.3)",
        },
        ticks: {
          color: "rgba(255,255,255,.75)",
        },
      },
    },
    plugins: {
      legend: {
        display: by ? true : false,
        position: "bottom",
      },
      title: {
        display: !!title,
        text: title,
        color: "rgba(255,255,255,.85)",
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          minHeight: "60%",
          position: "relative",
          padding: "1rem 0",
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
    </>
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
