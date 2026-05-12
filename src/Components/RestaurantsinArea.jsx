import RestaurantCards from "./RestaurantCards";
export default function RestaurantsinArea({ data }){
    const { title,cards } = data;
    const CDN = import.meta.env.VITE_IMG_CDN;
    return (
        <div className="w-[80vw] mx-auto mt-4">
            <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-xl">{title}</h3>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4 mb-6 gap-y-8">
                {
                    cards.map((item)=>(
                        <RestaurantCards key={item.id} cdn={CDN} data={item}/>
                    ))}
            </div>
        </div>
    );
}