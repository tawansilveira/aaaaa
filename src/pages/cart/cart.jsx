import React, { useContext } from "react";
import { db } from '../../services/firebase';
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { CartContext } from "../../contexts/cart_provider";
import { useNavigate } from "react-router-dom";
import { updateDoc, getDoc } from "firebase/firestore";

export default function ProductCards() {
  const { productsCart, calcularTotal, clearCart } = useContext(CartContext);
  const userJson = localStorage.getItem("user");
  const navigate = useNavigate();

  if (!userJson) {
    navigate('/login');
  }
  const user = JSON.parse(userJson);

  function generateUniqueID(minLength = 5) {
    let uniqueID;
    do {
      uniqueID = Math.random().toString(10).slice(2, minLength + 2);
      uniqueID = uniqueID.replace('.', '');
    } while (uniqueID.length < minLength);
    return uniqueID.padStart(minLength, '0');
  }

  const save = async () => {
    if (productsCart.length === 0) {
      window.alert('O carrinho está vazio.');
      return;
    }
  
    const orderData = {
      userId: user.uid,
      items: productsCart.map((item) => ({
        productId: item.product.id,
        quantity: item.qtdCarrinho,
        title: item.product.title,
      })),
      total: calcularTotal(),
      orderNumber: generateUniqueID(),
      status: 'pendente',
      createdAt: serverTimestamp(),
    };
  
    try {
      // Save the order
      const ordersRef = collection(db, 'orders');
      const newOrderRef = doc(ordersRef);
      await setDoc(newOrderRef, orderData);
  
      // Update stock for each product in the cart
      for (const item of productsCart) {
        const productRef = doc(db, 'cardapio', item.product.id); // Reference to the product document
        const productSnap = await getDoc(productRef);
  
        if (productSnap.exists()) {
          const currentQuantity = productSnap.data().quantity;
          const newQuantity = currentQuantity - item.qtdCarrinho;
  
          if (newQuantity >= 0) {
            await updateDoc(productRef, { quantity: newQuantity });
          } else {
            throw new Error(`Estoque insuficiente para o produto: ${item.product.title}`);
          }
        } else {
          throw new Error(`Produto não encontrado: ${item.product.title}`);
        }
      }
  
      clearCart();
      navigate(`/orderSummary/${newOrderRef.id}`);
      console.log('Order saved successfully:', newOrderRef.id);
    } catch (error) {
      console.error('Error saving order:', error);
      window.alert('Ocorreu um erro ao salvar o pedido. Por favor, tente novamente.');
    }
  };

  return (
    <section id="hero" className="h-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-white opacity-75">Carrinho</h3>
              <div>
                <p className="mb-0"></p>
              </div>
            </div>

            {productsCart.map((product, index) => (
              <div key={index}>
                <ProductCard product={product.product} qtdPedido={product.qtdCarrinho} />
                {index !== productsCart.length - 1 && <hr />} {/* Renderiza uma linha horizontal se não for o último produto */}
              </div>
            ))}

            <div className="card mb-2">
              <div className="card-body d-flex flex-row p-2">
                <input className="form-control flex-fill me-2" type="text" placeholder="Cupom de desconto" />
                <button className="btn btn-dark btn-lg">Aplicar</button>
              </div>
            </div>

            <div className="card d-flex flex-row align-items-center justify-content-between mb-3">
              <div className="card-body">
                <h5 className="mb-0">{formatedValue(calcularTotal())}</h5>
              </div>
              <div className="card-body text-end">
                <button className="btn btn-lg btn-dark" style={{ border: "1px solid #fff" }} onClick={() => { save() }}>Agendar pedido</button>
              </div>
            </div>
          </div>
        </div>
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
};

function ProductCard({ product, qtdPedido }) {
  const { removeProductToCart, addProducToCart, removeAllById } = useContext(CartContext);

  return (
    <div className="card mb-2">
      <div className="card-body d-flex flex-row p-2">
        <img
          src={product.image}
          alt={product.name}
          className="me-2"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div className="flex-fill">
          <h5 className="mb-0">{product.title}</h5>
          <p className="mb-0 text-muted">{product.description}</p>
          <div className="d-flex flex-row align-items-center">
            <p className="mb-0 text-muted me-2">Quantidade:</p>
            <button className="btn btn-sm btn-light me-2" onClick={() => { removeProductToCart(product.id) }}>
              <p className="mb-0">-</p>
            </button>
            <p className="mb-0">{qtdPedido}</p>
            <button className="btn btn-sm btn-light me-2" onClick={() => { addProducToCart(product) }}>
              <p className="mb-0">+</p>
            </button>
          </div>
          <p className="mb-0 text-muted card-text">
            <span className="text-muted"></span>{formatedValue(product.price * qtdPedido)}
          </p>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-top">
          <i
            className="ri-delete-bin-line me-2"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => removeAllById(product.id)}
            role="button"
            aria-label="Delete product"
          ></i>
        </div>
      </div>
    </div>
  );
}
