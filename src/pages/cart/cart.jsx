import React, { useContext } from "react";
import { db } from '../../services/firebase';
import { collection, setDoc, doc } from "firebase/firestore";
import {CartContext} from "../../contexts/cart_provider";

export default function ProductCards() {
  const { productsCart, calcularTotal, clearCart } = useContext(CartContext);
  const userJson = localStorage.getItem("user")
  if (!userJson) {
    window.location.href = '/login'
  }
  const user = JSON.parse(userJson)

  console.log("User >> ", user.uid)

  function generateUniqueID(minLength = 5) {
    let uniqueID;
  
    do {
      // Gera string aleatória com base numérica
      uniqueID = Math.random().toString(10).slice(2, minLength + 2); // Exclui zeros à esquerda e garante tamanho mínimo
      // Remove ponto flutuante
      uniqueID = uniqueID.replace('.', '');
    } while (uniqueID.length < minLength); // Garante comprimento mínimo
  
    return uniqueID.padStart(minLength, '0'); // Preenche com zeros à esquerda
  }
  
  
  const save = async () => {
    const orderData = {
      userId: user.uid, // Replace with actual user ID
      items: productsCart.map((item) => ({
          productId: item.product.id,
          quantity: item.qtdCarrinho,
      })),
      orderNumber: generateUniqueID(),
      status: 'pendente', // Initial order status (e.g., "pending")
    };
    
    try {
      const ordersRef = collection(db, 'orders');  // Collection reference
      const newOrderRef = doc(ordersRef);           // Document reference within the collection
      await setDoc(newOrderRef, orderData).then(() => {
        clearCart()
        window.location.href = '/'
      });       // Save order data to the document
      console.log('Order saved successfully:', newOrderRef.id);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  return (
    <section className="h-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-white opacity-75">Carrinho</h3>
              <div>
                <p className="mb-0">
                  <span className="text-muted me-2" style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>Ordenar por:</span>
                  <a href="#!" className="text-body">preco <i className="fas fa-angle-down mt-1"></i></a>
                </p>
              </div>
            </div>

            {productsCart.map((product, index) => (
              <div key={index}>
                <ProductCard product={product.product} qtdPedido={product.qtdCarrinho} />
                {index !== productsCart.length - 1} {/* Renderiza uma linha horizontal se não for o último produto */}
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
                <button className="btn btn-lg btn-dark" style={{ border: "1px solid #fff" }} onClick={() => {save()}}>Agendar pedido</button>
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
  })
}

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
            <button className="btn btn-sm btn-light me-2" onClick={() => {removeProductToCart(product.id)}}>
              <p className="mb-0">-</p>
            </button>
            <p className="mb-0">{qtdPedido}</p>
            <button className="btn btn-sm btn-light me-2" onClick={() => {addProducToCart(product)}}>
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


