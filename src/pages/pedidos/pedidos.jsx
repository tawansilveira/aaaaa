import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PedidosUsu = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userJson);
      const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const ordersData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
        };
      });

      setOrders(ordersData);
      setLoading(false);
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="hero" className="h-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h3 className="fw-normal mb-4 text-white opacity-75">Histórico de Pedidos</h3>
            {orders.length === 0 ? (
              <div className="card p-3 mb-4">
                <div className="card-body">
                  <h5 className="card-title">Nenhum pedido encontrado</h5>
                  <p className="card-text">Você ainda não fez nenhum pedido.</p>
                </div>
              </div>
            ) : (
              orders.map(order => (
                <div className="card p-3 mb-4" key={order.id}>
                  <div className="card-body">
                    <h5 className="card-title">Pedido #{order.orderNumber}</h5>
                    <p className="card-text">Status: {order.status}</p>
                    <p className="card-text">Total: {formatedValue(order.total)}</p>
                    <p className="card-text">Data: {order.createdAt.toLocaleString()}</p>
                    <ul className="list-group list-group-flush">
                      {order.items.map((item, index) => (
                        <li className="list-group-item" key={index}>
                          {item.title} - {item.quantity} unidade(s)
                        </li>
                      ))}
                    </ul>
                    <Link to={`/orderSummary/${order.id}`} className="btn btn-primary mt-3">Ver Detalhes</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const formatedValue = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};


export default PedidosUsu;
