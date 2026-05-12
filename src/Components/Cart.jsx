import { useSelector, useDispatch } from "react-redux";
import {increaseQty,decreaseQty,removeItem,clearCart,} from "../feature/cartSlice";
import Navbar from "./Navbar";
const CDN = import.meta.env.VITE_IMG_CDN;
export default function Cart() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    return (
        <div className="pt-24 w-screen flex justify-center">
            <Navbar/>
            <div className="w-[60%]">
                <h1 className="text-3xl font-bold mb-5">Cart</h1>
                {items.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <>
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="mb-4 bg-red-500 text-white px-3 py-1 cursor-pointer rounded-xl"
                        >
                            Clear Cart
                        </button>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border p-3 my-3 rounded-lg"
                            >
                                <img
                                    src={item.imageId? CDN + item.imageId: "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D"}
                                    className="h-20 w-20 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h2 className="font-bold">{item.name}</h2>
                                    <p>
                                        ₹ {((item.defaultPrice || item.price || 0) / 100)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => dispatch(decreaseQty(item.id))}
                                        className="px-3 bg-gray-200 cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => dispatch(increaseQty(item.id))}
                                        className="px-3 bg-gray-200 cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => dispatch(removeItem(item.id))}
                                    className="text-red-500 cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}