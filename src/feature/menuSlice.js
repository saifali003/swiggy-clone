import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const fetchMenu = createAsyncThunk("menu/fetchMenu", async({lat, lon, id})=>{
    const response = await axios.get(`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lon}&restaurantId=${id}&submitAction=ENTER`);
    const data = response.data;
    const lastIdx = data.data.cards.length-1;
    const kaamkaIdx = data.data.cards[lastIdx].groupedCard.cardGroupMap.REGULAR.cards.length - 1;

    let sanitisedCards = data.data.cards[lastIdx].groupedCard.cardGroupMap.REGULAR.cards.slice(2, kaamkaIdx - 1).map((item)=>{
            if(item.card.card.itemCards){
                return{
                    title : item.card.card.title,
                    cards : item.card.card.itemCards
                }
            }
        });
        sanitisedCards = sanitisedCards.filter((item)=> item);
         return{
            title : data.data.cards[0].card.card.text,
            cards : sanitisedCards
        }
})
const menuSlice = createSlice({
    name : "menu",
    initialState:{
        data : {},
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMenu.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMenu.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchMenu.rejected,(state,action)=>{
            state.loading = false;
            state.error  = action.error.message
        })
    }
})
export default menuSlice.reducer;