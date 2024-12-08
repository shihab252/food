import React, { useContext, useEffect, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../Context/StoreContext';

const PlaceOrder = () => {
  const { calculateCartTotals,token,food_list,cartItems,url} = useContext(StoreContext);
  const { subtotal, deliveryFee, total } = calculateCartTotals();
  const [data,setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
 })
 const onChangeHandler=(event)=>{
  const name= event.target.name;
  const value= event.target.value;
  setData(data=>({...data,[name]:value}))
 }
 useEffect(()=>{
  console.log(data);
  
 },[data])

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input name='lastName' onChange={onChangeHandler} value={data.lastNmae} type="text" placeholder='Last Name' />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input name='state' onChange={onChangeHandler}value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
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
          <button type="button">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
