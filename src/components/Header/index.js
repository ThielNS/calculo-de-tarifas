import React from 'react';
import { Link } from "react-router-dom";
import LogoTipo from '../../assets/images/LogoTipo.png';
import './header.less';

const Header = () => {
  return (
    <header className="container header row -justify-content-center _margin">
      <Link to="/app">
        <img src={LogoTipo} alt="Logo Cálculo de Tarifas" className="logo"/>
      </Link>
    </header>
  )
};

export default Header;