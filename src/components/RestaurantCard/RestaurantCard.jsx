import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const RestaurantCard = ({
  id,
  name,
  main_image_url,
  cuisine_type,
  address,
  avg_rating,
  top_dishes,
  opening_time,
  closing_time,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/menu/${id}`)}
      className="snap-start flex-shrink-0 w-64 bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 transform cursor-pointer flex flex-col justify-between"
    >
      {/* Image */}
      <img
        src={main_image_url}
        alt={`${name} image`}
        className="h-40 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-full space-y-2">
        {/* Tag */}
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full tracking-widest mb-1 w-fit">
          {cuisine_type}
        </span>

        {/* Name & Rating */}
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-lg text-gray-900">{name}</h4>
          <div className="flex items-center gap-1 text-sm text-green-800 font-medium">
            <Star size={16} className="fill-green-700 text-green-800" />
            {avg_rating?.toFixed(1)}
          </div>
        </div>

        {/* Top Dishes */}
        <p className="text-xs text-gray-700">
          <span className="font-semibold">Top Dishes:</span> {top_dishes}
        </p>

        {/* Address */}
        <p className="text-xs text-gray-600 line-clamp-1">{address}</p>

        {/* Timings at Bottom Left */}
        <p className="text-xs text-gray-500 mt-2">
          Timings: {opening_time?.slice(0, 5)} - {closing_time?.slice(0, 5)}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
