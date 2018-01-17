import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/app">
        <img src="#" alt="Logo Cálculo de Tarifas"/>
      </Link>
    </header>
  )
};

export default Header;