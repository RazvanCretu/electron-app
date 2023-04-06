import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getLocalData } from "../../store/localDataSlice";
import { getBarChartSettings } from "../../store/barChartSlice";

const randColor = (i) => {
  const h = Math.floor(Math.random() * 360 + i);
  return `hsl(${h}, 100%, 70%, .8)`;
};

const agregate = (csvData, x, y, by) => {
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

export const useBar = () => {
  const { x, y, by, title, legend } = useSelector(getBarChartSettings);
  const { data: csvData, error, loading } = useSelector(getLocalData);

  const dataChart = useMemo(() => {
    if (x && y) {
      const barData = agregate(csvData, x, y, by);

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
        display: legend,
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

  return { cfg: { options, data: dataChart }, error, loading };
};
