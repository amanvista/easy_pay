import React from "react";

const RestaurantFooter = ({ restaurant }) => {
  return (
    <div className="mt-4 px-4 py-6 bg-orange-100 shadow-inner  max-w-3xl mx-auto text-sm text-gray-600 space-y-4">
      {/* FSSAI & License */}
      <div className="flex items-center gap-4">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i"
          alt="FSSAI"
          className="w-24 h-auto"
        />
        <p>License No. 13323004000052</p>
      </div>

      {/* Restaurant Info */}
      <div className="space-y-1">
        <p className="font-medium text-gray-800">{restaurant.name}</p>
        <p className="text-gray-500">
          (Outlet: {restaurant.address.split(",")[0]})
        </p>
        <div className="flex gap-2 items-start text-gray-500">
          <span className="mt-0.5">📍</span>
          <p>{restaurant.address}</p>
        </div>
      </div>

      {/* Branding & External Links */}
      <div className="flex flex-col gap-2 border-t pt-4">
        <p className="font-semibold text-gray-700">Enjoyed your meal?</p>
        <p className="text-gray-500">Follow us for offers & updates:</p>
        <div className="flex gap-4 text-sm">
          <a
            href="https://www.instagram.com/vlogfitbrothers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            Instagram
          </a>
          <a href="#" className="text-orange-500 hover:underline">
            Website
          </a>
          <a href="#" className="text-orange-500 hover:underline">
            Feedback
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFooter;
