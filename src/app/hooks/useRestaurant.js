import { useDispatch, useSelector } from 'react-redux';
import restaurantApi from '../../services/restaurantApi';
import {
  setLoading,
  setMenuItemsLoading,
  setRestaurant,
  setMenuItems,
  setRestaurantError,
  setMenuError,
  selectMenuItems,
  selectRestaurantLoading,
  selectRestaurantError,
  selectMenuError,
  selectMenuItemsLoading,
  selectRestaurant,
  clearRestaurant
} from '../slices/restaurantSlice';

export default function useRestaurant() {
  const dispatch = useDispatch();

  // Redux selectors
  const restaurant = useSelector(selectRestaurant);
  const menuItems = useSelector(selectMenuItems);
  const restaurantLoading = useSelector(selectRestaurantLoading);
  const menuItemsLoading = useSelector(selectMenuItemsLoading);
  const restaurantError = useSelector(selectRestaurantError);
  const menuError = useSelector(selectMenuError);

  // Fetch restaurant header/details
  const fetchRestaurantDetails = async (restaurantId) => {
    try {
      dispatch(setLoading(true));
      dispatch(setRestaurantError(false));
      const restaurantData = await restaurantApi.getDetails(restaurantId);
      dispatch(setRestaurant(restaurantData));
    } catch (err) {
      dispatch(setRestaurantError(err.message || 'Failed to load restaurant'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetch restaurant menu
  const fetchRestaurantMenuItems = async (restaurantId) => {
    try {
      dispatch(setMenuItemsLoading(true));
      const menuData = await restaurantApi.getMenu(restaurantId);
      dispatch(setMenuItems(menuData));
    } catch (err) {
      dispatch(setMenuError(err.message || 'Failed to load menu items'));
      dispatch(clearRestaurant());
    } finally {
      dispatch(setMenuItemsLoading(false));
    }
  };

  return {
    restaurant,
    menuItems,
    restaurantLoading,
    menuItemsLoading,
    fetchRestaurantDetails,
    fetchRestaurantMenuItems,
    restaurantError,
    menuError
  };
}
