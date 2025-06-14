import { MapPin, Star } from "lucide-react";

const RestaurantGridCard = ({
  id,
  name,
  main_image_url,
  cuisine_type,
  top_dishes,
  avg_rating,
  address,
  opening_time,
  closing_time,
}) => {
  return (
    <div
      onClick={() => (window.location.href = `/menu/${id}`)}
      className="cursor-pointer group rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={main_image_url}
          alt={name}
          className="w-full h-36 object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
          <Star size={14} className="fill-green-600 text-green-600" />
          {avg_rating?.toFixed(1)}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        {/* Name */}
        <h4 className="text-base font-semibold text-gray-900 line-clamp-1">
          {name}
        </h4>

        {/* Cuisine + Top Dishes */}
        <p className="text-xs text-gray-700 leading-tight">
          <span className="inline-block bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full text-[10px] mb-1">
            {cuisine_type}
          </span>
          <br />
          <span className="font-medium text-gray-800">Top Dishes:</span>{" "}
          {top_dishes}
        </p>

        {/* Address */}
        <div className="flex items-center text-[11px] text-gray-600 gap-1 mt-1">
          <MapPin size={12} className="text-orange-400" />
          <span className="line-clamp-1">{address}</span>
        </div>

        {/* Timing */}
        <p className="text-[11px] text-gray-500">
          <span className="font-medium">Timings:</span>{" "}
          {opening_time?.slice(0, 5)} - {closing_time?.slice(0, 5)}
        </p>
      </div>
    </div>
  );
};

export default RestaurantGridCard;
