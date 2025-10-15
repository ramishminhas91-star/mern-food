import React from 'react';
import { gallery_list } from '../../assets/assets'; // Import the gallery list
import './Gallery.css'; // Import the CSS styling

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Explore Our Gallery</h1>
      <div className="gallery">
        {gallery_list.map((item, index) => (
          <div key={index} className="gallery-item">
            <img 
              src={item.image_src} 
              alt={item.image_name} 
              className="gallery-image"
            />
            <div className="gallery-overlay">
              <p className="gallery-text">{item.image_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
