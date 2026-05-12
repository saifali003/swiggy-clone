import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
export default function Landing() {
    const nav = useNavigate();
    return (
        <div className="bg-[#FF5200] h-screen relative">
            <nav className="flex justify-between items-center px-30 py-6">
                <img src="/logo.avif" alt="logo" className="h-12 w-40" />
                <div className="flex gap-5 items-center text-white text-[16px]">
                    <Link className="hover:underline">Swiggy Corporate</Link>
                    <Link className="hover:underline">Partner with us</Link>
                    <button className="border border-white h-13.5 w-37.5 px-4 py-3 rounded-xl cursor-pointer">
                        Get the App
                    </button>
                    <button className="bg-black text-white h-13.5 w-37.5 rounded-xl px-4 py-3 cursor-pointer">
                        Sign in
                    </button>
                </div>
            </nav>
            <h1 className="text-[32px] leading-11.25 font-semibold text-white text-center mt-4">
                Order food & groceries. Discover <br />
                best restaurants. Swiggy it!
            </h1>
            <img
                className="h-[70vh] absolute left-0 top-30"
                src="/left.avif"
                alt="left"
            />
            <img
                className="h-[70vh] absolute right-0 top-30"
                src="/right.avif"
                alt="right"
            />
            <div
                onClick={() => {
                    nav("/search");
                }}
                className="flex justify-center mt-5 mx-auto w-fit relative"
            >
                <input
                    type="text"
                    placeholder="Search for restaurant, item or more"
                    className="bg-white h-12 rounded-2xl w-[42vw] outline-none px-5"
                />
                <IoIosSearch className="absolute right-5 top-4 text-xl" />
            </div>
            <div className="flex justify-center mt-5 gap-10">
                <img
                    onClick={() => {
                        nav("/restaurants");
                    }}
                    className="h-[45vh] cursor-pointer"
                    src="/card1.avif"
                    alt="card1"
                />
                <img
                    onClick={() => {
                        nav("/restaurants");
                    }}
                    className="h-[45vh] cursor-pointer"
                    src="/card2.avif"
                    alt="card2"
                />
                <img
                    onClick={() => {
                        nav("/restaurants");
                    }}
                    className="h-[45vh] cursor-pointer"
                    src="/card3.avif"
                    alt="card3"
                />
            </div>
        </div>
    );
}