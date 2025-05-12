import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../app/slices/cartSlice';
import { addItem, removeItem } from '../../app/slices/cartSlice';
import { FaPlus, FaMinus } from 'react-icons/fa';
import useRestaurant from '../../app/hooks/useRestaurant';

const OrderSummary = ({cartItems,total,restaurant}) => {
    const dispatch = useDispatch();
   

    const handleIncreaseQuantity = (item) => {
        dispatch(addItem(item));
    };

    const handleDecreaseQuantity = (item) => {
        dispatch(removeItem(item));
    };
    const image_url = `http://localhost/images/food/restaurant/${restaurant.logo_url}` || '/default-logo.jpg'


    return (
        <div className="right-panel">
            <div className="restaurant-info">
                <img src={image_url} alt="Restaurant" />
                <div>
                    <h4>{restaurant.name}</h4>
                    <p>{restaurant.address}</p>
                </div>
            </div>

            {cartItems?.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <div key={item?.id || item?.name} className="order-item">
                            <div className="item-info">
                                <p>{item?.name || 'Unnamed Item'}</p>
                                <p className="item-price">
                                    ₹{(item?.price || 0) * (item?.quantity || 1)}
                                </p>
                            </div>
                            <div className="quantity-control">
                                <button 
                                    onClick={() => handleDecreaseQuantity(item.id)}
                                    className="quantity-btn"
                                >
                                    <FaMinus />
                                </button>
                                <span className="quantity">{item?.quantity || 1}</span>
                                <button 
                                    onClick={() => handleIncreaseQuantity(item)}
                                    className="quantity-btn"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="order-total">
                        <h4>Total: ₹{total || 0}</h4>
                    </div>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}

            <textarea placeholder="Any suggestions? We will pass it on..."></textarea>
        </div>
    );
};

export default OrderSummary;