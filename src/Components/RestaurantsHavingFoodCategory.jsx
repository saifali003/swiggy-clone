import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import Loader from "./Loader";
import RestaurantCards from "./RestaurantCards";
import { useSelector, useDispatch } from "react-redux";
import { fetchCollection } from "../feature/collectionSlice";
export default function RestaurantsHavingFoodCategory() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const CDN = import.meta.env.VITE_IMG_CDN;
  const { data, loading, error } = useSelector((state) => state.collection);
  const currentCollection = data[id];
  const { lat, lon } = useSelector((state) => state.location.data);
  useEffect(() => {
  if (id && lat && lon && !data[id]){
      dispatch(fetchCollection({ id, lat, lon }));
  }
  }, [id, lat, lon, data]);
  return (
    <div className="pt-[14vh]">
      <Navbar />
      <main>
        {loading ? (
          <div className="h-[88vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : error ? (
          <h1 className="text-center text-red-500">
            {error}
          </h1>
        ) : (
          <>
            <div className="w-fit mx-30 my-5">
              <h1 className="text-3xl font-extrabold">
                {currentCollection?.info?.title}
              </h1>
              <p className="text-lg">
                {currentCollection?.info?.desc}
              </p>
            </div>
            <div className="grid grid-cols-4 w-fit mx-auto gap-5 mb-10">
              {currentCollection?.cards?.map((item) => (
                <RestaurantCards
                  key={item.id}
                  data={item}
                  cdn={CDN}
                />
              ))}
            </div>
          </>
        )}
      </main> 
    </div>
  );
}