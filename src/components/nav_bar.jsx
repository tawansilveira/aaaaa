import { Link, NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import { auth } from '../services/firebase';
import React, { useState, useContext } from "react";
import { CartContext } from "../contexts/cart_provider"; // Import CartContext
import '../assets/css/style.css'

const NavBar = ({ toggleNavbarVisibility }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { productsCart } = useContext(CartContext); // Use CartContext

  const toggleDropdownMenu = () => setShowDropdown(!showDropdown);

  var user = localStorage.getItem('user');

  // Calculate total items in cart
  const totalItemsInCart = productsCart.reduce((total, item) => total + item.qtdCarrinho, 0);


  return (
    <header id="header" className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container d-flex align-items-center justify-content-lg-between">
          <h1 className="logo me-auto me-lg-0 bc-logo">
            <a href="/">BC<span>.</span></a>
          </h1>
          <a href="/" className="logo me-auto me-lg-0">
            <img src="assets/img/logo.png" alt="" className="img-fluid" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <nav id="navbar" className="navbar order-last order-lg-0">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cardapio" activeClassName="active" className="nav-link">Cardapio</NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink to="/carrinho" activeClassName="active" className="nav-link">
                    Carrinho
                    {totalItemsInCart > 0 && (
                      <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                        {totalItemsInCart}
                      </span>
                    )}
                  </NavLink>
                </li>
              </ul>
            </nav>
            {user ? (
              <Dropdown className="me-4">
                <Dropdown.Toggle variant="Secondary" id="dropdown-basic" className="d-flex align-items-center">
                  <Avatar name={JSON.parse(user).email} size="40" round={true} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/pedidos1">Pedidos</Dropdown.Item> 
                  <Dropdown.Item onClick={() => {
                    auth.signOut();
                    localStorage.removeItem('user');
                    window.location.href = '/';
                  }}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="get-started-btn" style={{ display: 'inline-block', textAlign: 'center', color: 'white', margin: 0, padding: '10px 20px', textDecoration: 'none' }}>Login</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
