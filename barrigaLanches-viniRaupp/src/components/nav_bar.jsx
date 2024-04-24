import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Avatar from 'react-avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import { auth } from '../services/firebase';

const NavBar = () => {
  const [user, setUser] = React.useState(null); // Use state to manage user data

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data if available
    }
  }, []); // Empty dependency array to run only once after mount

  const handleSignOut = () => {
    auth.signOut();
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-lg-between">
        <h1 className="logo me-auto me-lg-0"><a href="/">BC<span>.</span></a></h1>
        <a href="/" className="logo me-auto me-lg-0"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/cardapio" activeClassName="active">Cardapio</NavLink></li>
            <li><NavLink to="/contato" activeClassName="active">Contato</NavLink></li>
          </ul>
        </nav>
        {
          user ? (
            <Dropdown color='white' className='me-4'>
              <Dropdown.Toggle variant="Secondary" id="dropdown-basic" color='white' >
                <Avatar name={user.email} size="40" round={true} />
              </Dropdown.Toggle>

              <Dropdown.Menu color='white'>
                <Dropdown.Item href="/perfil">Perfil</Dropdown.Item>
                <Dropdown.Item href="/pedidos">Pedidos</Dropdown.Item>
                <Dropdown.Item onClick={handleSignOut}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/login" className="get-started-btn">Login</Link>
          )
        }
      </div>
    </header>
  );
};

export default NavBar;

