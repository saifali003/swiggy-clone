import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCollection = createAsyncThunk("collection/fetchCollection",async ({ id, lat, lon }) => {
    console.log("COLLECTION API CALLED");
    const response = await axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lon}&collection=${id}&tags=layout_CCS_NorthIndian&sortBy=&filters=&type=rcv2&offset=0&page_type=null`);
    const apiData = response.data;
    const kaamkaData = apiData.data.cards.slice(3).map((item) => item.card.card.info);
    return {
      id,
      info: {
        title: apiData.data.cards[0].card.card.title,
        desc:
          apiData.data.cards[0].card.card.description,
      },
      cards: kaamkaData,
    };
  }
);
const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    loading: false,
    error: null,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.id] = {
          info: action.payload.info,
          cards: action.payload.cards,
        };
      })
      .addCase(fetchCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default collectionSlice.reducer;