import React, {useState, useEffect, useContext} from 'react';
import {FaCartPlus, FaHeart} from 'react-icons/fa';
import {db} from '../../../services/firebase';
import {collection, doc, getDocs} from 'firebase/firestore';
import './scripts.js';
import './stylesa.css'

const Pedidos = () => {
    const [items, setItems] = useState([]);
    const [hoveredItems, setHoveredItems] = useState([]);

    const handleMouseEnter = (itemId) => {
        setHoveredItems((prevItems) => [...prevItems, itemId]);
    };

    const handleMouseLeave = (itemId) => {
        setHoveredItems((prevItems) => prevItems.filter((id) => id !== itemId));
    };

    const isHovered = (itemId) => {
        return hoveredItems.includes(itemId);
    };

    useEffect(() => {
        const getPedidos = async () => {
            const querySnapshot = await getDocs(collection(db, "orders"));
            const fetchedItems = querySnapshot.docs.map((doc) => ({
                ...doc.data()
            }));

            setItems(fetchedItems);
        };

        getPedidos();
    }, []);

    const mockItem = [{
        orderId: 'abc123',
        orderNumber: 1234,
        status: 'pendente',
        total: 24.22,
        items: [
            {
                productId: 'abc123',
                name: 'Refrigerante Lata',
                productQuantity: 2,
            }
        ]
    }]

    const handleConfirmReceipt = (orderId) => {
        // Implement logic to update the order status in Firestore to "Received"
        console.log(`Confirming receipt for order ${orderId}`);
    };

    return (
        /*<div>
          <h2>Pedidos</h2>
          {items.map((item) => (
            <div key={item.id} className="order-box">
              <div className="order-details">
                <p>Número do Pedido: {item.orderNumber}</p>
                <p>Status: {item.status}</p>
                <p>Resumo do pedido: </p>
                {/* Add more details as needed *}
              </div>
              <button
                className="confirm-receipt-button"
                onClick={() => handleConfirmReceipt(item.id)}
                disabled={item.status === 'Recebido'} // Disable if already received
              >
                Confirmar Recebimento
              </button>
            </div>
          ))}
        </div>*/

        <body class="sb-nav-fixed">
                      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                          <a href="index.html">Barriga Lanches</a>
                          <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                              <li class="nav-item dropdown">
                                  <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                      <li><a class="dropdown-item" href="#!">Configurações</a></li>
                                      <li><hr class="dropdown-divider" /></li>
                                      <li><a class="dropdown-item" href="adm">Sair</a></li>
                                  </ul>
                              </li>
                          </ul>
                      </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Menu</div>
                            <a class="nav-link" href="homeAdm">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Pedidos
                            </a>
                            <a class="nav-link" href="cardapioAdm">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Cardápio
                            </a>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logado como:</div>
                        Barriga Lanches
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Pedidos</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div class="row">
                            <div class="col-xl-4 col-md-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-area me-1"></i>
                                        Pedidos novos
                                    </div>

                                    <div class="card-body">
                                        {items.map((item) => (
                                            <div key={item.id} className="order-box">
                                                {console.log(JSON.stringify(item))}
                                                <div key={item.orderId}>  {/* Key prop for each order */}
                                                    <p>Número do Pedido: {item.orderNumber}</p>
                                                    <p>Status: {item.status}</p>
                                                    <p>Total: R$ {item.total}</p>  {/* Formatted total */}
                                                    <p>Resumo do pedido: </p>
                                                    <ol className="list-group">
                                                        {item.items.map((product) => (
                                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                                <div className="ms-2 me-auto">
                                                                    {product.title}
                                                                </div>
                                                                <span
                                                                    className="badge bg-primary rounded-pill">{product.quantity}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                                <br/>
                                                <button
                                                    className="confirm-receipt-button"
                                                    onClick={() => handleConfirmReceipt(item.id)}
                                                    disabled={item.status === 'Recebido'} // Disable if already received
                                                >
                                                    Confirmar Recebimento
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-md-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-bar me-1"></i>
                                        Pedidos em andamento
                                    </div>
                                    <div class="card-body">

                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-md-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-bar me-1"></i>
                                        Pedidos Entregues
                                    </div>
                                    <div class="card-body">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
                crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"
                crossorigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js"
                crossorigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
        </body>
    );
};

export default Pedidos;


