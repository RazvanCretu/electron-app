const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  by: "",
  x: "",
  y: "",
  title: "",
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
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

// Actions
export const { setX, setY, setBy, setTitle } = barChartSlice.actions;

// Selectors
export const getBarChartSettings = (state) => state.barChart;

export default barChartSlice.reducer;
