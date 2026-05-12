import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FcRating } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { addItem } from "../feature/cartSlice";
export default function Accordian({ title, cards = [], cdn }){
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="my-5">
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}>
                    <h2 className="font-extrabold text-lg">
                        {title} ({cards.length})
                    </h2>
                    {isOpen ? (
                        <IoIosArrowUp className="text-3xl" />
                    ) : (
                        <IoIosArrowDown className="text-3xl" />
                    )}
                </div>
                {isOpen && (
                    <div>
                        {cards.map((item, index) => {
                            const info = item?.card?.info || {};
                            const { name, defaultPrice, ratings, imageId, description, itemAttribute } = info;
                            return (
                                <article key={index} className="flex">
                                    <div className="w-[70%] mt-5">
                                        <img
                                            src={
                                                itemAttribute?.vegClassifier === "VEG"
                                                    ? "/Veg.svg"
                                                    : "/non-veg.svg"
                                            }
                                            alt="veg indicator"
                                        />
                                        <h2 className="font-bold">{name || "Unknown Item"}</h2>
                                        <p>₹ {defaultPrice ? defaultPrice / 100 : "N/A"}</p>
                                        <p className="flex gap-1 items-center text-sm">
                                            <FcRating />
                                            <span className="text-green-900">
                                                {ratings?.aggregatedRating?.rating || "NA"}
                                            </span>
                                            <span>
                                                ({ratings?.aggregatedRating?.ratingCountV2 || 0})
                                            </span>
                                        </p>
                                        <p>
                                            {description
                                                ? description.length > 130
                                                    ? description.slice(0, 130) + "..."
                                                    : description
                                                : "No description available"}
                                        </p>
                                    </div>
                                    <div className="w-[30%] relative flex justify-center">
                                        {imageId ? (
                                            <img
                                                src={cdn + imageId}
                                                className="h-32 w-full mt-5 ml-3 rounded-xl"
                                                alt={name}
                                            />
                                        ) : (
                                            <div className="mt-5">
                                                <img className="h-32 w-full  ml-3 rounded-xl" src="https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D" />
                                            </div>
                                        )}
                                        <button
                                            className="text-green-700 w-30 h-8 rounded-lg border border-gray-300 absolute bottom-0 bg-white cursor-pointer"
                                            onClick={() =>
                                                dispatch(addItem({
                                                        id: info.id,
                                                        name,
                                                        defaultPrice: info.defaultPrice || info.price || 0,
                                                        imageId,
                                                    })
                                                )
                                            }
                                        >
                                            ADD
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="h-5 bg-gray-200"></div>
        </>
    );
}