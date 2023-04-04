import { useMemo } from "react";

const randColor = (i) => {
  const h = Math.floor(Math.random() * 360 + i);
  return `hsl(${h}, 100%, 70%, .8)`;
};

export const useBar = () => {};
