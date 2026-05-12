import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing"
import Restaurants from "./Components/Restaurants"
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { fetchLocation } from "./feature/locationSlice";
import RestaurantsHavingFoodCategory from "./Components/RestaurantsHavingFoodCategory";
import Menu from "./Components/Menu";
import Cart from "./Components/Cart";
export default function App(){
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(fetchLocation());
  },[])
  return(
    <div>
      <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/restaurants" element={<Restaurants/>}/>
          <Route path="/restaurants/:id" element={<RestaurantsHavingFoodCategory/>}/>
          <Route path="/menu/:id" element={<Menu/>}/>
          <Route path="/cart" element={<Cart />}/>
      </Routes>
    </div>
  )
}