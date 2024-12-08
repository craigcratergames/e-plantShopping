import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, addItem, removeItem } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Handle incrementing the quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ product: item, newQuantity: item.quantity + 1 }));
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ product: item, newQuantity: item.quantity - 1 }));
    } else {
      // Remove the item if quantity goes to 0
      dispatch(removeItem(item));
    }
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  // Placeholder for checkout functionality
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty. Add some plants to your cart!</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="cart-item-price">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => handleRemoveItem(item)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <button onClick={onContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default CartItem;
