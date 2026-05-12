import {useEffect} from "react";
import Navbar from "./Navbar";
import { useSelector,useDispatch } from "react-redux";
import Loader from "./Loader";
import FoodSuggestions from "./FoodSuggestions";
import TopRestaurants from "./TopRestaurants";
import RestaurantsinArea from "./RestaurantsinArea";
import { fetchRestaurants } from "../feature/restaurantsSlice";
export default function Restaurants(){
    const location = useSelector((state)=> state.location);
    const {suggestions,topRestaurants,restaurantsInArea,fetched} = useSelector((state)=> state.restaurants);
    const dispatch = useDispatch();
    useEffect(() => {
    if (location.data.lat &&!fetched){
      dispatch(fetchRestaurants(location.data));
    }
  }, [location, fetched]);
    return suggestions.title? (
        <div className="pt-[14vh]">
            <Navbar/>
            <div>
              <FoodSuggestions data={suggestions}/>
              <hr className="w-[80vw] mx-auto mt-4 border-gray-400"/>
              <TopRestaurants data={topRestaurants}/>
              <hr className="w-[80vw] mx-auto mt-4 border-gray-400"/>
              <RestaurantsinArea data={restaurantsInArea}/>
            </div>
        </div>
    ) : (
        <div>
            <Navbar/>
            <div className="h-screen flex justify-center items-center">
                 <Loader/>
            </div>
        </div>
    )}
