const MenuSidebar = ({ menus, getMenuItemCount, scrollToMenu }) => {
  if (menus.length === 0) return null;

  return (
    <div className="hidden lg:block fixed left-4 top-32 z-30 bg-white rounded-xl shadow-lg border border-gray-200 p-3 w-48">
      <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
        Menus
      </h3>
      <div className="space-y-1 max-h-80 overflow-y-auto">
        {menus.map((menu) => {
          const itemCount = getMenuItemCount(menu);
          return (
            <button
              key={menu.id}
              onClick={() => scrollToMenu(menu.id)}
              className="w-full text-left px-2 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors group"
            >
              <div className="font-medium text-xs text-gray-800 group-hover:text-orange-600 truncate">
                {menu.name}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuSidebar;
