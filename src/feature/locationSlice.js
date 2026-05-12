import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
export const fetchLocation = createAsyncThunk("location/fetchLocation",async()=>{
   const Data = await new Promise((resolve,reject)=>{
       navigator.geolocation.getCurrentPosition((position)=>{
            resolve({
                lat : position.coords.latitude,
                lon : position.coords.longitude,
            })
       },
       (error)=>{
         reject(error);
       })
   })
   const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${Data.lat}&lon=${Data.lon}&format=json`);
   const apiResponse = await response.json();
   Data.location = apiResponse.display_name;
   return Data;
})
const locationSlice = createSlice({
    name:"location",
    initialState:{
        loading : false,
        error : null,
        data : {}
    },
    reducers : {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLocation.pending,(state,action)=>{
            return {
                ...state,
                loading : true
            }})
        .addCase(fetchLocation.fulfilled,(state,action)=>{
            return{
                ...state,
                loading : false,
                data : action.payload
            }})
        .addCase(fetchLocation.rejected,(state,action)=>{
            return{
                ...state,
                loading : false,
                error : action.error.message
            }})
    }
});
export default locationSlice.reducer;