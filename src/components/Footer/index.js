import React from 'react';
import LogoSenai from "../../assets/images/LogoSenai.png";
import "./footer.less";

const Footer = () => {
  return (
   <footer>
      <p>&copy; Cálculo de Tarifas 2018 - Iniciativa <img src={LogoSenai} alt="Senai SP" /> </p>
    </footer> 
    
  )
};

export default Footer;