import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = (props) => {
    const { category, setCategory } = props;
    
    console.log('ExploreMenu rendered with category:', category);
    
    const handleCategoryClick = (menuName) => {
        console.log('Category clicked:', menuName, 'Current category:', category);
        // If clicking the same category, set to "All", otherwise set to the clicked category
        if (category === menuName) {
            setCategory("All");
            console.log('Setting category to All');
        } else {
            setCategory(menuName);
            console.log('Setting category to:', menuName);
        }
    };
    
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>Choose from diverse menu featuring a delectable array of dishes crafted with finest ingredients that satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    const isActive = category === item.menu_name;
                    console.log(`Menu item ${item.menu_name}: isActive = ${isActive}`);
                    return (
                        <div 
                            key={index} 
                            className={`explore-menu-item ${isActive ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(item.menu_name)}
                        >
                            <img src={item.menu_image} alt={item.menu_name} />
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu
