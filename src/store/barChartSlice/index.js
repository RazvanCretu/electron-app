const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  by: "",
  x: "",
  y: "",
};

const barChartSlice = createSlice({
  name: "barChart",
  initialState,
  reducers: {
    setX: (state, action) => {
      state.x = action.payload;
    },
    setY: (state, action) => {
      state.y = action.payload;
    },
    setBy: (state, action) => {
      state.by = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

// Actions
export const { setX, setY, setBy } = barChartSlice.actions;

// Selectors
export const getBarChartSettings = (state) => state.barChart;

export default barChartSlice.reducer;
