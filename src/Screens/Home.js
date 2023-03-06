import { useRef, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { ResponsiveBarCanvas } from "@nivo/bar";

const data = [
  {
    country: "AD",
    "hot dog": 52,
    "hot dogColor": "hsl(348, 70%, 50%)",
    burger: 66,
    burgerColor: "hsl(332, 70%, 50%)",
    sandwich: 94,
    sandwichColor: "hsl(145, 70%, 50%)",
    kebab: 2,
    kebabColor: "hsl(346, 70%, 50%)",
    fries: 54,
    friesColor: "hsl(297, 70%, 50%)",
    donut: 41,
    donutColor: "hsl(276, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 174,
    "hot dogColor": "hsl(33, 70%, 50%)",
    burger: 191,
    burgerColor: "hsl(58, 70%, 50%)",
    sandwich: 46,
    sandwichColor: "hsl(8, 70%, 50%)",
    kebab: 96,
    kebabColor: "hsl(51, 70%, 50%)",
    fries: 45,
    friesColor: "hsl(240, 70%, 50%)",
    donut: 194,
    donutColor: "hsl(176, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 33,
    "hot dogColor": "hsl(173, 70%, 50%)",
    burger: 187,
    burgerColor: "hsl(117, 70%, 50%)",
    sandwich: 47,
    sandwichColor: "hsl(328, 70%, 50%)",
    kebab: 25,
    kebabColor: "hsl(337, 70%, 50%)",
    fries: 160,
    friesColor: "hsl(300, 70%, 50%)",
    donut: 142,
    donutColor: "hsl(334, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 114,
    "hot dogColor": "hsl(83, 70%, 50%)",
    burger: 51,
    burgerColor: "hsl(299, 70%, 50%)",
    sandwich: 23,
    sandwichColor: "hsl(179, 70%, 50%)",
    kebab: 168,
    kebabColor: "hsl(298, 70%, 50%)",
    fries: 49,
    friesColor: "hsl(147, 70%, 50%)",
    donut: 81,
    donutColor: "hsl(295, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 145,
    "hot dogColor": "hsl(217, 70%, 50%)",
    burger: 75,
    burgerColor: "hsl(149, 70%, 50%)",
    sandwich: 179,
    sandwichColor: "hsl(80, 70%, 50%)",
    kebab: 165,
    kebabColor: "hsl(114, 70%, 50%)",
    fries: 161,
    friesColor: "hsl(306, 70%, 50%)",
    donut: 19,
    donutColor: "hsl(2, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 82,
    "hot dogColor": "hsl(240, 70%, 50%)",
    burger: 29,
    burgerColor: "hsl(20, 70%, 50%)",
    sandwich: 157,
    sandwichColor: "hsl(35, 70%, 50%)",
    kebab: 59,
    kebabColor: "hsl(87, 70%, 50%)",
    fries: 23,
    friesColor: "hsl(211, 70%, 50%)",
    donut: 100,
    donutColor: "hsl(149, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 69,
    "hot dogColor": "hsl(358, 70%, 50%)",
    burger: 136,
    burgerColor: "hsl(359, 70%, 50%)",
    sandwich: 85,
    sandwichColor: "hsl(127, 70%, 50%)",
    kebab: 82,
    kebabColor: "hsl(20, 70%, 50%)",
    fries: 15,
    friesColor: "hsl(156, 70%, 50%)",
    donut: 146,
    donutColor: "hsl(176, 70%, 50%)",
  },
];

const Home = () => {
  const [file, setFile] = useState();
  const inFileRef = useRef();
  const ref = useRef();

  const handleOpenFile = async () => {
    // inFileRef.current.click();
    const dir = await window.showDirectoryPicker();

    console.log(dir);

    for await (const entry of dir.values()) {
      console.log(entry.kind, entry.name, entry);
    }
  };

  const handleChangeFile = (e) => {
    e.preventDefault();
    console.log(e.target.directory);
    setFile(e.target.files);
  };

  return (
    <Box>
      <input
        type="file"
        ref={inFileRef}
        onChange={handleChangeFile}
        style={{ display: "none" }}
      />
      {file && <Typography>{file.path}</Typography>}
      <Button variant="contained" onClick={handleOpenFile}>
        Open Files
      </Button>
      <Box sx={{ width: "500px", height: "400px" }}>
        <Button
          onClick={() => {
            const canvas = ref.current;
            const link = document.createElement("a");
            link.download = "chart.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          }}
        >
          Donwload Chart
        </Button>
        <ResponsiveBarCanvas
          ref={ref}
          data={data}
          keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
