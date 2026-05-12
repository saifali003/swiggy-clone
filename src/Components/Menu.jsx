import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import Accordian from "./Accordian";
import { fetchMenu } from "../feature/menuSlice";
const CDN = import.meta.env.VITE_IMG_CDN;
export default function Menu(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const {lat,lon} = useSelector((state)=> state.location.data);
    const {data} = useSelector((state)=> state.menu);
   useEffect(()=>{
    dispatch(fetchMenu({lat,lon,id}));
   },[lat,lon,id])
    return(
        <div className="pt-[14vh]">
            <Navbar/>
            {
                data.title? (
                    <div className="w-screen flex justify-center">
                        <main className="w-[60%] mt-10">
                            <h1 className="text-3xl font-extrabold mb-10">{data.title}</h1>
                        <div>
                             {
                                data.cards.map((item)=>(
                                    <Accordian key={item.title} title = {item.title} cards = {item.cards} cdn={CDN}/>
                                ))}
                        </div>
                        </main>
                    </div>
                ) : (
                    <div className="h-[88vh] flex justify-center items-center">
                        <Loader/>
                    </div>
                )
            }
        </div>
    )
}