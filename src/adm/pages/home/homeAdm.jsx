import React, { useState, useEffect } from 'react';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { db, auth } from '../../../services/firebase'; // Ensure you have auth configured in your firebase service
import { collection, doc, addDoc, updateDoc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // Import signOut from firebase/auth
import './scripts.js';
import './stylesa.css';

const Pedidos = () => {
    const [items, setItems] = useState([]);
    const [ongoingItems, setOngoingItems] = useState([]);
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
        const ordersQuery = query(collection(db, "orders"), where("status", "!=", "Finalizado"));
        const unsubscribe = onSnapshot(ordersQuery, (querySnapshot) => {
            const fetchedItems = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
    
            // Separate items based on their status
            const newItems = fetchedItems.filter(item => item.status !== 'Em Andamento');
            const ongoingItems = fetchedItems.filter(item => item.status === 'Em Andamento');
    
            // Sort items by createdAt in descending order
            newItems.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
            ongoingItems.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
    
            setItems(newItems);
            setOngoingItems(ongoingItems);
        }, (error) => {
            console.error("Error fetching orders: ", error);
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    
    

    const handleConfirmReceipt = async (orderId) => {
        try {
            // Update the status in Firestore
            const orderDoc = doc(db, "orders", orderId);
            await updateDoc(orderDoc, { status: 'Em Andamento' });

            // No need to update local state, as onSnapshot will handle it
        } catch (error) {
            console.error("Error updating order status: ", error);
        }
    };

    const handleFinalizeOrder = async (orderId) => {
        try {
            const orderDoc = doc(db, "orders", orderId);
            const orderSnapshot = await getDoc(orderDoc);
            const item = orderSnapshot.data();

            // Add the item to the "historico" collection in Firestore
            await addDoc(collection(db, "historico"), item);

            // Update the status in Firestore
            await updateDoc(orderDoc, { status: 'Finalizado' });

            // No need to update local state, as onSnapshot will handle it
        } catch (error) {
            console.error("Error finalizing order: ", error);
        }
    };

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
                <a href="index.html">Barriga Lanches</a>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#!">Configurações</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#!" onClick={handleLogout}>Sair</a></li> {/* Add onClick for logout */}
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
                            <h1 className="mt-4">Pedidos</h1>
                            <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                            <div className="row">
                                <div className="col-xl-4 col-md-6">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-chart-area me-1"></i>
                                            Pedidos novos
                                        </div>

                                        <div className="card-body">
                                            {items.map((item) => (
                                                <div key={item.id} className="order-box">
                                                    <div key={item.orderId}> {/* Key prop for each order */}
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
                                                    <br />
                                                    <button
                                                        className="confirm-receipt-button"
                                                        onClick={() => handleConfirmReceipt(item.id)}
                                                        disabled={item.status === 'Recebido' || item.status === 'Em Andamento'} // Disable if already received or in progress
                                                    >
                                                        Confirmar Recebimento
                                                    </button>
                                                    <hr />
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-chart-bar me-1"></i>
                                            Pedidos em andamento
                                        </div>
                                        <div className="card-body">
                                            {ongoingItems.map((item) => (
                                                <div key={item.id} className="order-box">
                                                    <div key={item.orderId}> {/* Key prop for each order */}
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
                                                    <br />
                                                    <button
                                                        className="finalize-order-button"
                                                        onClick={() => handleFinalizeOrder(item.id)}
                                                    >
                                                        Finalizar
                                                    </button>
                                                    <hr />
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

export default Pedidos;
