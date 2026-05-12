import { FcRating } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
export default function RestaurantCards({data,cdn,size}){
    const navigate = useNavigate();
    const {id,areaName, avgRating, cloudinaryImageId, cuisines, name, sla} = data;
    const {slaString} = sla;
    return(
        <div className="shrink-0 cursor-pointer" onClick={() => navigate(`/menu/${id}`)}>
            <img src={cdn+cloudinaryImageId} className={`rounded-2xl ${size === "large" ? "h-55 w-70" : "h-40 w-60"}`}/>
            <div>
                <h2 className="font-bold truncate w-full">{name.slice(0,18)}</h2>
                <p className="flex gap-1 items-center"><FcRating />
                <span>{avgRating}</span>
                &bull;
                <span>{slaString}</span>
                </p>
                <p className="text-gray-600 text-sm">{cuisines.join(",").length>25? cuisines.join(",").slice(0,25)+"..." : cuisines.join(",")}</p>
                <p className="text-gray-600 text-sm">{areaName}</p>
            </div>
        </div>
    )
}