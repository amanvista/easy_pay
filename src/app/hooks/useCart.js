import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  removeItem,
  clearCart,
  toggleCart,
  setDay,
  setSlotId,
  selectCartItems,
  selectShowCart,
  selectCartTotal,
  selectCartCount,
  setRestaurantData,
  selectRestaurantData
} from '../slices/cartSlice'; // adjust path as needed

const useCart = () => {
  const dispatch = useDispatch();

  // Selectors
  const items = useSelector(selectCartItems);
  const showCart = useSelector(selectShowCart);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartCount);
  const day = useSelector(state => state.cart.day);
  const slotId = useSelector(state => state.cart.slotId);
  const restaurantData = useSelector(state => state.cart.restaurantData);

  // Actions
  const addToCart = (item) => dispatch(addItem(item));
  const removeFromCart = (id) => dispatch(removeItem(id));
  const clear = () => dispatch(clearCart());
  const toggle = () => dispatch(toggleCart());
  const updateDay = (selectedDay) => dispatch(setDay(selectedDay));
  const updateSlotId = (slotId) => dispatch(setSlotId(slotId));
  const updateRestaurantData = (data) => dispatch(setRestaurantData(data));

  return {
    items,
    showCart,
    total,
    itemCount,
    day,
    slotId,
    restaurantData,
    addToCart,
    removeFromCart,
    clear,
    toggle,
    updateDay,
    updateSlotId,
    updateRestaurantData
  };
};

export default useCart;
