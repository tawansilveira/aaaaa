import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from '../../services/firebase';
import { doc, getDoc } from "firebase/firestore";
import { Card, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrderSummary() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          setOrder(orderSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <section id='hero' className="px-5">
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <Card className="shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Pedido Realizado</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center" style={{ fontSize: '1.25rem' }}>Número do Pedido: <br /> {order.orderNumber}</Card.Subtitle>
            <Card.Text className="mt-4">
              <h4 className="mb-3">Resumo do Pedido</h4>
              <ul className="list-group list-group-flush">
                {order.items.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item.title} - Quantidade: {item.quantity}
                  </li>
                ))}
              </ul>
              <h4 className="mt-4">Total: {formatedValue(order.total)}</h4>
            </Card.Text>
            <Button variant="dark" className="w-100 mt-4" onClick={() => navigate('/')}>
              Voltar para a Home
            </Button>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}

const formatedValue = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}
