import { configureStore } from "@reduxjs/toolkit";
import localDataReducer from "./localDataSlice";
import barChartReducer from "./barChartSlice";

export default configureStore({
  reducer: {
    localData: localDataReducer,
    barChart: barChartReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     immutableCheck: false,
  //     serializableCheck: false,
  //   }),
});
