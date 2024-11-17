import React, { useContext, useState } from 'react';
import "./Cart.css";
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, calculateCartTotals,url = 'http://localhost:4000' } = useContext(StoreContext);
  const [flashItem, setFlashItem] = useState(null);
  const navigate = useNavigate();
  
  const { subtotal, deliveryFee, total } = calculateCartTotals();

  const handleRemove = (itemId) => {
    setFlashItem(itemId); // Trigger the flash effect
    removeFromCart(itemId);

    // Remove the flash effect after 1 second
    setTimeout(() => {
      setFlashItem(null);
    }, 1000);
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p className={flashItem === item._id ? 'decrease-quantity' : ''}>৳{item.price}</p> 
                  <p className={flashItem === item._id ? 'decrease-quantity' : ''}>{cartItems[item._id]}</p>
                  <p className={flashItem === item._id ? 'decrease-quantity' : ''}>৳{item.price * cartItems[item._id]}</p> 
                  <p className='cross' onClick={() => handleRemove(item._id)}>x</p> 
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>৳{subtotal}</p> 
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>৳{subtotal === 0 ? 0 : deliveryFee}</p> 
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>৳{total}</b> 
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocod">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocod-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
