import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function FoodSuggestions({ data }) {
    const { title, cards } = data;
    const navigate = useNavigate();
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
            <div
                ref={scrollRef}
                className="flex overflow-x-auto scroll-smooth scrollbar-none [scrollbar-width:none] gap-3"
            >
                {
                    cards.map((card, index) => (
                        <img
                            key={index}
                            src={CDN + card.imageId}
                            className="w-40 h-45 shrink-0 cursor-pointer"
                            onClick={() => navigate(`/restaurants/${card.entityId.slice(36, 41)}`)}
                        />
                    ))}
            </div>
        </div>
    );
}