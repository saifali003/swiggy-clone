import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRef } from "react";
import RestaurantCards from "./RestaurantCards";
export default function TopRestaurants({ data }) {
    const {title,cards} = data;
    const CDN = import.meta.env.VITE_IMG_CDN;
    const scrollRef = useRef(null);
    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -500, // jitna move karna hai
            behavior: "smooth"
        });
    };
    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 500,
            behavior: "smooth"
        });
    };
    return (
        <div className="w-[80vw] mx-auto mt-4">
            <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-xl">{title}</h3>
                <div className="flex gap-3 text-xl cursor-pointer">
                    <FaArrowLeftLong onClick={scrollLeft} />
                    <FaArrowRightLong onClick={scrollRight} />
                </div>
            </div>
            <div className="flex gap-4 overflow-scroll scrollbar-none [scrollbar-width:none] mt-6" ref={scrollRef}>
              {
                cards.map((item)=>(
                    <RestaurantCards key={item.id} size={"large"} data={item} cdn={CDN}/>
                ))}
            </div>
        </div>
    );
}