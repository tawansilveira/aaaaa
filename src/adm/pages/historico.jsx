// Historico.js
import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './cardapio/stylesa.css';
import { auth } from '../../services/firebase'; // Ensure you have auth configured in your firebase service
import { signOut } from 'firebase/auth'; // Import signOut from firebase/auth

const Historico = () => {
    const [historicoItems, setHistoricoItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getHistorico = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "historico"));
                const fetchedHistoricoItems = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null, // Converte timestamp para Date ou define como null
                }));

                // Order items by date, newest first
                fetchedHistoricoItems.sort((a, b) => (b.createdAt ? b.createdAt.getTime() : 0) - (a.createdAt ? a.createdAt.getTime() : 0));

                setHistoricoItems(fetchedHistoricoItems);
            } catch (error) {
                console.error("Error fetching historico orders: ", error);
            }
        };

        getHistorico();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredHistoricoItems = historicoItems.filter((item) =>
        item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // Redirect to login or home page after logout
            window.location.href = "/adm"; // Adjust the path as needed
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <body className="sb-nav-fixed">
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Barriga Lanches</a>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user fa-fw"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#!">Configurações</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#!" onClick={handleLogout}>Sair</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Menu</div>
                                <a className="nav-link" href="homeAdm">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Pedidos
                                </a>
                                <a className="nav-link" href="cardapioAdm">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Cardápio
                                </a>
                                <a className="nav-link" href="historico">
                                    <div className="sb-nav-link-icon"><i className="fas fa-history"></i></div>
                                    Histórico
                                </a>
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Logado como:</div>
                            Barriga Lanches
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Histórico de Pedidos</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Histórico</li>
                            </ol>
                            <div className="row mb-3">
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar por número do pedido..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-history me-1"></i>
                                            Histórico de Pedidos
                                        </div>
                                        <div className="card-body">
                                            {filteredHistoricoItems.map((item) => (
                                                <div key={item.id} className="order-box">
                                                    <div>
                                                        <p>Número do Pedido: {item.orderNumber}</p>
                                                        <p>Status: {item.status}</p>
                                                        <p>Total: R$ {item.total}</p> {/* Formatted total */}
                                                        <p>Resumo do pedido: </p>
                                                        <ol className="list-group">
                                                            {item.items.map((product) => (
                                                                <li key={product.productId} className="list-group-item d-flex justify-content-between align-items-start">
                                                                    <div className="ms-2 me-auto">
                                                                        {product.title}
                                                                    </div>
                                                                    <span className="badge bg-primary rounded-pill">{product.quantity}</span>
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <script src="js/scripts.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
            <script src="assets/demo/chart-area-demo.js"></script>
            <script src="assets/demo/chart-bar-demo.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>
            <script src="js/datatables-simple-demo.js"></script>
        </body>
    );
};

export default Historico;