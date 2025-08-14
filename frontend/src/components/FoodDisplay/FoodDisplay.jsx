import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = (props) => {
    const {category} = props
    const {food_list} = useContext(StoreContext);
    
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem key={index} food_details={item} />
                        )
                    }
                    return null; // Add explicit return for items that don't match
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
