import React from 'react'
import './Header.css'
import headerImg from '../../assets/header_img.png'

const Header = () => {
  console.log('Header component rendered');
  console.log('Header image path:', headerImg);
  
  return (
    <div className='header'>
      <img 
        src={headerImg} 
        alt="Header" 
        className="header-img"
        onLoad={() => console.log('Header image loaded successfully')}
        onError={(e) => console.error('Header image failed to load:', e)}
      />
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with finest ingredients that satisfy your cravings and elevate your dining experience,one delicious meal ata time.</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
