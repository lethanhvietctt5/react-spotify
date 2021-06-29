import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ISearch {
  keyword: string;
}

const initialState: ISearch = {
  keyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { setKeyword } = searchSlice.actions;
export default searchSlice.reducer;
