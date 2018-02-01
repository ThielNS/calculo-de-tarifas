import React from 'react';
import LogoSenai from "../../assets/images/logo-senai-NEGATIVO.jpg";
import "./footer.less";

const Footer = () => {
  return (
   <footer>
      <p>&copy; Cálculo de Tarifas 2018 - Iniciativa <img src={LogoSenai} alt="Senai SP" className="senai-logo"/> </p>
    </footer> 
    
  )
};

export default Footer;