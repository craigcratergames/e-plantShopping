import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, addItem, removeItem } from './CartSlice';  // Import the actions
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Handle updating the quantity of an item
  const handleUpdateQuantity = (product, newQuantity) => {
    // Ensure the new quantity is a valid positive number
    if (newQuantity > 0) {
      dispatch(updateQuantity({ product, newQuantity }));
    }
  };

  // Handle adding an item to the cart (if not already added)
  const handleAddItem = (product) => {
    const isAlreadyInCart = cartItems.some(item => item.name === product.name);
    if (!isAlreadyInCart) {
      dispatch(addItem(product));
    }
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (product) => {
    dispatch(removeItem(product));
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
                  <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
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
