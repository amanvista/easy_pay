import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../app/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./menuitem.css"
const MenuItem = ({ item }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Check if item is already in cart when component mounts or cartItems change
    useEffect(() => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setIsInCart(true);
            setQuantity(existingItem.quantity);
        } else {
            setIsInCart(false);
            setQuantity(1);
        }
    }, [cartItems, item.id]);

    const handleAddToCart = () => {
        dispatch(addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        }));
        toast.success(`${item.name} added to cart!`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleIncrease = () => {
        dispatch(addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        }));
    };

    const handleDecrease = () => {
        dispatch(removeItem(item.id));
    };

    return (
        <div className="menu-item">
            <img 
                src={item.image} 
                alt={item.name} 
                className="item-image" 
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                }} 
            />
            <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-desc">{item.description}</div>
                <div className="item-price">₹ {item.price}</div>
                <div className="item-footer">
                    {item.is_available ? (
                        isInCart ? (
                            <div className="quantity-control">
                                <button 
                                    onClick={handleDecrease}
                                    className="quantity-btn minus"
                                >
                                    -
                                </button>
                                <span className="quantity-value">{quantity}</span>
                                <button 
                                    onClick={handleIncrease}
                                    className="quantity-btn plus"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button className="order-btn" onClick={handleAddToCart}>
                                Add to Order
                            </button>
                        )
                    ) : (
                        <span className="unavailable">Currently Unavailable</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuItem;