import React from 'react';
import './WhatsAppIcon.css'; 
import whatsappLogo from '../../assets/whatsapp.png'; 


const WhatsAppIcon = () => {
  const phoneNumber = '+923554868301'; 

  return (
    <div className="whatsapp-icon">
      <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
        <img src={whatsappLogo} alt="WhatsApp" />
      </a>
    </div>
  );
};

export default WhatsAppIcon;
