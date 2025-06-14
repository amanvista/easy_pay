import { useDispatch, useSelector } from 'react-redux';
import { createOrder, clearOrder } from '../slices/orderSlice'; // Adjust path accordingly
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/common/Toast/Toast';

const useOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Accessing the order state from Redux store
  const order = useSelector((state) => state.order);
  
  // Function to create an order
  const createNewOrder = async (orderPayload) => {
    try {
      // Dispatch the createOrder action
      const actionResult = await dispatch(createOrder(orderPayload));
      
      // Check if the action was fulfilled (successful)
      if (createOrder.fulfilled.match(actionResult)) {
        navigate("/payment");
      } else {
        // Handle error (if rejected)
        console.error('Error creating order:', actionResult.payload);
        showToast('error', 'Error creating Order!');
      }
      navigate("/payment");
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  
  // Function to clear order details
  const resetOrder = () => {
    dispatch(clearOrder());
  };
  
  return {
    order, // Contains order details, loading, and error states
    createNewOrder, // Function to dispatch createOrder
    resetOrder, // Function to dispatch clearOrder
  };
};

export default useOrder;
