import React, { useState } from 'react';
import './Header.css';
// import pizzaImg from '../../assets/bestpizzaimg.avif'
import ExploreMenu from '../ExploreMenu/ExploreMenu'

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  
  const [category, setCategory] = useState('All')

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          dolorem, dicta itaque iure fugiat architecto.
        </p>
        <button
          className="view-menu-button"
          onClick={togglePopup}
        >
          View Menu
        </button>
      </div>


      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>
            <h3>Menu</h3>
            <ExploreMenu category={category} setCategory={setCategory}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
