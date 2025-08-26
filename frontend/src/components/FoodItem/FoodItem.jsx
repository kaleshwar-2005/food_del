import React, {useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = (props) => {
    const { food_details } = props;
    const {_id, name, description, price, image} = food_details;
    
    const {cartItem,addToCart,removeFromCart,url}=useContext(StoreContext);
    
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={url+"/images/"+image} alt="" className="food-item-image" />
                {!cartItem[_id]
                    ? <img className='add' src={assets.add_icon_white} onClick={()=>addToCart(_id)} alt="add"/>
                    :<div className='food-item-counter'>
                        <img onClick={()=>removeFromCart(_id)} src={assets.remove_icon_red} alt="remove" />   
                        <p>{cartItem[_id]}</p>
                        <img onClick={()=>addToCart(_id)} src={assets.add_icon_green} alt="add" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="rating" />
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
