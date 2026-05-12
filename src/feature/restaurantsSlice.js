import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const fetchRestaurants = createAsyncThunk("restaurants/fetchRestaurants", async(location)=>{
    const response = await axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
    const data = response.data;

    const suggestions = {
      title: data.data.cards[0].card.card.header.title,
      cards: data.data.cards[0].card.card.imageGridCards.info
    };

     const topRestaurantsData =data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.map((item) => item.info);
      const topRestaurants = {
      title: data.data.cards[1].card.card.header.title,
      cards: topRestaurantsData
    };

    const areaData = data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants.map((item) => item.info);
    const restaurantsInArea = {
      title: data.data.cards[2].card.card.title,
      cards: areaData
    };
    return { suggestions, topRestaurants, restaurantsInArea };
});
const restaurantsSlice  = createSlice({
    name : "restaurants",
    initialState : {
        suggestions: {},
        topRestaurants: {},
        restaurantsInArea: {},
        loading : false,
        error : null,
        fetched: false,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchRestaurants.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRestaurants.fulfilled,(state,action)=>{
            state.loading = false;
            state.suggestions = action.payload.suggestions;
            state.topRestaurants = action.payload.topRestaurants;
            state.restaurantsInArea = action.payload.restaurantsInArea;
            state.fetched = true;
        })
        .addCase(fetchRestaurants.rejected,(state,action)=>{
            state.loading = false;
            state.error = "Something went wrong"
        })
    }
})
export default restaurantsSlice.reducer;