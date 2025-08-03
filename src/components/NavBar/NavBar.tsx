import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <Link to="/" className="navbar-logo">
          RetroDrive Autopeças
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/products" className="navbar-link">
          Produtos
        </Link>
        <Link to="/categories" className="navbar-link">
          Categorias
        </Link>
        <Link to="/suppliers" className="navbar-link">
          Fornecedores
        </Link>
        <Link to="/clients" className="navbar-link">
          Clientes
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
