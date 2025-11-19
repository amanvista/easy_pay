import { MapPin } from "lucide-react";

const RestaurantInfo = ({ restaurantDetails, restaurant }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Restaurant Info */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-4 space-y-2">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Logo + Name/Details */}
          <div className="flex gap-4 items-start">
            <img
              src={restaurantDetails?.imageUrl || restaurant.logo_url}
              alt={restaurantDetails?.name || restaurant.name}
              className="w-14 h-14 rounded-full border object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {restaurantDetails?.name || restaurant.name}
              </h1>
              {restaurantDetails?.latitude && restaurantDetails?.longitude ? (
                <a
                  href={`https://www.google.com/maps?q=${restaurantDetails.latitude},${restaurantDetails.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 flex items-center gap-1 hover:text-orange-500 transition"
                >
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {restaurantDetails?.address || restaurant.address}
                </a>
              ) : (
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {restaurantDetails?.address || restaurant.address}
                </p>
              )}
              {restaurantDetails?.fssaiNumber && (
                <p className="text-xs text-gray-500">
                  FSSAI: {restaurantDetails.fssaiNumber}
                </p>
              )}
              <a
                href={`tel:${restaurantDetails?.contactPhone || restaurant.contact_phone}`}
                className="text-sm text-orange-500 underline"
              >
                Call: {restaurantDetails?.contactPhone || restaurant.contact_phone}
              </a>
            </div>
          </div>

          {/* Rating + Cost */}
          <div className="text-right ml-auto sm:text-left">
            <p className="text-sm text-gray-700">
              ⭐ {restaurant.avg_rating?.toFixed(1)}
            </p>
            {restaurant.top_dishes && (
              <p className="text-xs text-gray-500 mt-1">
                Top picks: {restaurant.top_dishes}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Visual Tile (Image) */}
      {(restaurantDetails?.imageUrl || restaurant.featured_image_url) && (
        <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-white/20">
          <img
            className="w-full h-56 object-cover"
            src={restaurantDetails?.imageUrl || restaurant.featured_image_url}
            alt={restaurantDetails?.name || restaurant.name}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantInfo;
