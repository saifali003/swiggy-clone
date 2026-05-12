import { SiSwiggy } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { PiBagSimpleBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { MdAssignmentInd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLocation } from "../feature/locationSlice";
export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location?.data?.location);
    useEffect(() => {
        dispatch(fetchLocation());
    }, []);
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0);
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between px-20 h-[14vh] items-center shadow-lg bg-white">
            <div className="flex items-center gap-2">
                <SiSwiggy className="bg-[#FF5200] text-white text-5xl p-2 rounded-xl shadow-md hover:scale-110 transition duration-300 cursor-pointer"
                    onClick={() => navigate("/restaurants")}
                />
                <p>
                    {location ? location.slice(0, 53) + "..." : "Fetching location..."}
                </p>
            </div>
            <div className="flex gap-5">
                <Link className="flex gap-2 items-center font-semibold hover:underline"> <PiBagSimpleBold className="text-xl" /> Swiggy Corporate</Link>
                <Link className="flex gap-2 items-center font-semibold hover:underline"> <IoSearch className="text-xl" /> Search</Link>
                <Link className="flex gap-2 items-center font-semibold hover:underline"> <BiSolidOffer className="text-xl" /> Offers</Link>
                <Link className="flex gap-2 items-center font-semibold hover:underline"> <IoHelpBuoyOutline className="text-xl" /> Help</Link>
                <Link className="flex gap-2 items-center font-semibold hover:underline"> <MdAssignmentInd className="text-xl" /> Sign In</Link>
                <Link to="/cart" className="flex gap-2 items-center font-semibold relative hover:underline" >
                <PiBagSimpleBold />
                Cart
                {cartCount > 0 && (
               <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs px-2 rounded-full">
               {cartCount}
             </span>
          )}
        </Link>
        </div>
        </nav>
    )
}