import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const CardapioPanel = ({ onAddMenuItem, onEditMenuItem, onDeleteMenuItem }) => {
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    image: '',
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const querySnapshot = await getDocs(collection(db, "cardapio"));
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(fetchedItems);
    };

    getItems();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDoc(collection(db, "cardapio"), newItem)
      .then(() => {
        console.log('Item adicionado com sucesso!');
        setNewItem({ title: '', description: '', price: 0, quantity: 0, image: '' });
      })
      .catch((error) => {
        console.error('Falha ao adicionar item:', error);
      });
  };

  const handleEditItem = (item) => {
    // Create a copy of the item object to avoid mutation
    const itemToUpdate = { ...item };
    setNewItem(itemToUpdate);
  };
  

  const handleSaveEditedItem = (itemId) => {
    const updatedItem = { ...newItem }; // Use the updated newItem state
    updateDoc(doc(db, "cardapio", itemId), updatedItem)
      .then(() => {
        console.log('Item atualizado com sucesso!');
        setItems(items.map((existingItem) => existingItem.id === itemId ? updatedItem : existingItem));
      })
      .catch((error) => {
        console.error('Falha ao atualizar item:', error);
      });
  };
  

  const handleDeleteItem = (itemId) => {
    deleteDoc(doc(db, "cardapio", itemId))
      .then(() => {
        console.log('Item removido com sucesso!');
        setItems(items.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error('Falha ao remover item:', error);
      });
  };

  return (
    <div className="admin-panel">
      <h2>Gerenciar Cardápio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" value={newItem.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" name="description" value={newItem.description} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="price">Preço:</label>
          <input type="number" id="price" name="price" value={newItem.price} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="quantity">Quantidade:</label>
          <input type="number" id="quantity" name="quantity" value={newItem.quantity} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="image">Imagem:</label>
          <input type="text" id="image" name="image" value={newItem.image} onChange={handleChange} />
        </div>
        <button type="submit">Adicionar Item</button>
      </form>
      <hr />
      <h3>Itens Existentes</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div className="item-details">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <p>R$ {parseFloat(item.price).toFixed(2)}
                              </p>
                              </div>
                              <div className="item-actions">
                                <button onClick={() => handleEditItem(item)}>Editar</button>
                                <button onClick={() => handleDeleteItem(item.id)}>Excluir</button>
                                <button onClick={() => handleSaveEditedItem(item.id)}>Confirmar Edição</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  };
                  
                  export default CardapioPanel;
                  