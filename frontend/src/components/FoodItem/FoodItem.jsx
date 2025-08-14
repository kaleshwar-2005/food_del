import React, {useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets';
const FoodItem = (props) => {
    const { food_details } = props;
    const {_id, name, description, price, image} = food_details;
    
    const {cartItem,addToCart,removeFromCart}=useContext(StoreContext);
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-image" />
        {!cartItem[_id]
            ? <img className='add' src={assets.add_icon_white} onClick={()=>addToCart(_id)}/>
            :<div className='food-item-counter'>
                 <img onClick={()=>removeFromCart(_id)} src={assets.remove_icon_red} alt="" />   
                 <p>{cartItem[_id]}</p>
                 <img onClick={()=>addToCart(_id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">
           {description} 
        </p>
        <p className="food-item-price">
            ${price}
        </p>
      </div>
    </div>
  )
}

export default FoodItem
