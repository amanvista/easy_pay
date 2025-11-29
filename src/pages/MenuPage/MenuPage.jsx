import restaurants from "../../data/restaurantData";
import { useNavigate, useParams } from "react-router-dom";
import MenuItems from "../../components/MenuItems/MenuItems";
import RestaurantFooter from "../../components/RestaurantFooter/RestaurantFooter";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import restaurantService from "../../services/restaurantService";
import { toast } from "react-toastify";
import MenuPageHeader from "./MenuPageHeader";
import RestaurantInfo from "./RestaurantInfo";
import MenuSidebar from "./MenuSidebar";
import MenuList from "./MenuList";
import CartSummary from "./CartSummary";

const MenuPage = () => {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [menus, setMenus] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const menuRefs = useRef({});
  const observerTarget = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = restaurants.data.restaurants.data.find(
    (res) => res.id === Number(id)
  );

  // Get authentication state
  const isAuthenticated = useSelector((state) => !!state.auth.userToken);

  // Fetch restaurant details from API
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (id) {
        try {
          const data = await restaurantService.getRestaurantById(id);
          setRestaurantDetails(data);
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
        }
      }
    };
    fetchRestaurantDetails();
  }, [id]);

  // Fetch menus with infinite scrolling
  useEffect(() => {
    const fetchMenus = async () => {
      if (loading || !hasMore || !id) return;

      setLoading(true);
      try {
        const response = await restaurantService.getMenusWithDetails(
          id,
          page,
          5
        );
        const newMenus = response.data.menus || [];

        // Sort items by position within each category
        const sortedMenus = newMenus.map(menu => ({
          ...menu,
          categories: menu.categories?.map(category => ({
            ...category,
            items: category.items?.sort((a, b) => {
              // Sort by position, if position is same or undefined, maintain original order
              const posA = a.position ?? Number.MAX_SAFE_INTEGER;
              const posB = b.position ?? Number.MAX_SAFE_INTEGER;
              return posA - posB;
            })
          }))
        }));

        setMenus((prev) => {
          // Prevent duplicates by checking if menu already exists
          const existingIds = new Set(prev.map(m => m.id));
          const uniqueNewMenus = sortedMenus.filter(m => !existingIds.has(m.id));
          return [...prev, ...uniqueNewMenus];
        });
        setHasMore(page < response.data.totalPages);
      } catch (error) {
        console.error("Error fetching menus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [id, page, loading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading]);

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const scrollToMenu = (menuId) => {
    const element = menuRefs.current[menuId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getMenuItemCount = (menu) => {
    return (
      menu.categories?.reduce((total, category) => {
        return total + (category.items?.length || 0);
      }, 0) || 0
    );
  };

  // Handle cart navigation with authentication check
  const handleViewCart = () => {
    if (!isAuthenticated) {
      toast.info("Please login to view your cart");
      navigate("/login", { state: { from: `/menu/${id}` } });
      return;
    }
    navigate("/cart");
  };

  if (!restaurant) return <div className="p-4">Restaurant not found.</div>;

  return (
    <div className="bg-white min-h-screen text-black">
      <MenuPageHeader
        restaurantDetails={restaurantDetails}
        restaurant={restaurant}
        cartCount={cartCount}
        onBack={handleBack}
        onCartClick={handleViewCart}
      />

      <RestaurantInfo
        restaurantDetails={restaurantDetails}
        restaurant={restaurant}
      />

      <MenuSidebar
        menus={menus}
        getMenuItemCount={getMenuItemCount}
        scrollToMenu={scrollToMenu}
      />

      <div className="mt-8 px-4 md:px-12 max-w-4xl mx-auto space-y-12">
        {menus.length > 0 ? (
          <MenuList
            menus={menus}
            menuRefs={menuRefs}
            getMenuItemCount={getMenuItemCount}
            restaurantDetails={restaurantDetails}
            restaurant={restaurant}
          />
        ) : !loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 mb-6 opacity-50">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/>
                <path d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Menu Available</h3>
            <p className="text-gray-600 mb-4">This restaurant hasn't added any menu items yet.</p>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
            >
              Browse Other Restaurants
            </button>
          </div>
        ) : null}

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}

        <div ref={observerTarget} className="h-4" />
      </div>

      <CartSummary
        cartCount={cartCount}
        onViewCart={handleViewCart}
      />

      <RestaurantFooter
        restaurant={restaurant}
        restaurantDetails={restaurantDetails}
      />
    </div>
  );
};

export default MenuPage;
