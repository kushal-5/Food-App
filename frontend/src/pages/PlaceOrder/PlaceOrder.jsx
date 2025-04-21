import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    // You can add form validation or API call here
    console.log("Order placed:", data);
    navigate('/payment'); // Or your desired route
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
          <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
        </div>
        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
        <div className="multi-field">
          <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
          <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
        </div>
        <div className="multi-field">
          <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
          <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
        </div>
        <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>${getTotalCartAmount() === 0 ? 0 : 5}</p></div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
            </div>
          </div>
        </div>
        <button className='place-order-submit' type='submit'>Proceed To Payment</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
