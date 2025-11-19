import MenuItem from "./MenuItem";

const MenuList = ({ 
  menus, 
  menuRefs, 
  getMenuItemCount, 
  restaurantDetails, 
  restaurant 
}) => {
  return (
    <>
      {menus.map((menu) => {
        const itemCount = getMenuItemCount(menu);
        return (
          <div
            key={menu.id}
            className="space-y-12"
            ref={(el) => (menuRefs.current[menu.id] = el)}
          >
            {/* Menu Name - Enhanced Style */}
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-50 to-transparent rounded-2xl p-6 border-l-4 border-orange-500 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-1">
                      🍽️ {menu.name}
                    </h2>
                    {menu.description && (
                      <p className="text-gray-600 mt-2">{menu.description}</p>
                    )}
                    <p className="text-sm text-orange-600 font-medium mt-2">
                      {itemCount} delicious item{itemCount !== 1 ? "s" : ""}{" "}
                      available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {menu.categories?.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-5">
                  {category.imageUrl && (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <h3 className="text-2xl font-bold text-gray-800">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.items?.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      restaurantDetails={restaurantDetails}
                      restaurant={restaurant}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default MenuList;
