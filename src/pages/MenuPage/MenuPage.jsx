import restaurants from "../../data/restaurantData";
import { useNavigate, useParams } from "react-router-dom";
import MenuItems from "../../components/MenuItems/MenuItems";
import RestaurantFooter from "../../components/RestaurantFooter/RestaurantFooter";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import restaurantService from "../../services/restaurantService";
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

  const restaurant = restaurants.data.restaurants.data.find(
    (res) => res.id === Number(id)
  );

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

        setMenus((prev) => [...prev, ...newMenus]);
        setHasMore(page < response.data.totalPages);
      } catch (error) {
        console.error("Error fetching menus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [id, page]);

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

  const navigate = useNavigate();

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

  if (!restaurant) return <div className="p-4">Restaurant not found.</div>;

  return (
    <div className="bg-white min-h-screen text-black">
      <MenuPageHeader
        restaurantDetails={restaurantDetails}
        restaurant={restaurant}
        cartCount={cartCount}
        onBack={handleBack}
        onCartClick={() => navigate("/cart")}
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
        ) : (
          <MenuItems restaurant={restaurant} />
        )}

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}

        <div ref={observerTarget} className="h-4" />
      </div>

      <CartSummary
        cartCount={cartCount}
        onViewCart={() => navigate("/cart")}
      />

      <RestaurantFooter
        restaurant={restaurant}
        restaurantDetails={restaurantDetails}
      />
    </div>
  );
};

export default MenuPage;
