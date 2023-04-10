import { useRef } from "react";
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
import { useBar } from "../../../hooks/charts/useBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Bar = () => {
  const ref = useRef();
  const {
    cfg: { options, data },
  } = useBar();

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
            "&:hover + .MuiButtonBase-root": {
              display: "inline-flex",
            },
          },
          // "&:hover .MuiButtonBase-root": {
          //   display: "inline-flex",
          // },
        }}
      >
        {data.datasets.length !== 0 && (
          <Chart
            width={null}
            height={null}
            type="bar"
            options={options}
            data={data}
            ref={ref}
          />
        )}
        <IconButton
          sx={{
            position: "absolute",
            top: "1.75rem",
            right: "1rem",
            display: "none",
            "&:hover": {
              display: "inline-flex",
            },
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
      </Box>
    </>
  );
};

export default Bar;
