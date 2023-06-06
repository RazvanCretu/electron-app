const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const readLocalData = createAsyncThunk("localData/read", async () => {
  const csvData = await window.electron.openCsv();
  return csvData;
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const localDataSlice = createSlice({
  name: "localData",
  initialState,
  reducers: {
    clear: (state, action) => {
      state.data = [];
    },
    setData: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    pushRow: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readLocalData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(readLocalData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(readLocalData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});

// Selectors
export const getLocalData = (state) => state.localData;

export const { clear, setData, setError, setLoading, pushRow } =
  localDataSlice.actions;

export default localDataSlice.reducer;
