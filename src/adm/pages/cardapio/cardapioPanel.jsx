import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const CardapioPanel = ({ onAddMenuItem, onEditMenuItem, onDeleteMenuItem }) => {
  const [newItem, setNewItem] = useState({
    id: '',
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
    console.log('ID PRODUTO', newItem.id)
    if (newItem.id != '') {
        handleSaveEditedItem(newItem.id);
        return
    }
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
        // Clear input fields after saving
        setNewItem({ title: '', description: '', price: 0, quantity: 0, image: '' });
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
    /*<div className="admin-panel">
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
                      </div>*/

                      <body class="sb-nav-fixed">
                      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                          <a class="navbar-brand ps-3" href="index.html">Barriga Lanches</a>
                          <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
                          <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                          </form>
                          <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                              <li class="nav-item dropdown">
                                  <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                      <li><a class="dropdown-item" href="#!">Configurações</a></li>
                                      <li><hr class="dropdown-divider" /></li>
                                      <li><a class="dropdown-item" href="#!">Sair</a></li>
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
                                          <a class="nav-link" href="index.html">
                                              <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                              Pedidos
                                          </a>
                                          <a class="nav-link" href="charts.html">
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
                                      <h1 class="mt-4">Cardápio</h1>
                                      <ol class="breadcrumb mb-4">
                                      </ol>
                                      <div class="card mb-4">
                                          
                                      </div>
                                      <div class="row">
                                          <div class="col-lg-6">
                                              <div class="card mb-4">
                                                  <div class="card-header">
                                                      <i class="fas fa-chart-bar me-1"></i>
                                                      Gerenciamento de Cardápio
                                                  </div>
                                                  <div class="card-body"></div>
                                                  <form onSubmit={handleSubmit}>
                                                      <div class="mb-3 mt-3">
                                                        <label for="email" class="form-label">Nome do Produto:</label>
                                                       <br />
                                                       <input type="text" class="form-control" id="title" name="title" value={newItem.title} onChange={handleChange} required />
                                                      </div>
                                                      <div class="mb-3">
                                                        <label for="pwd" class="form-label">Descrição:</label>
                                                        <br />
                                                        <input type="text" class="form-control" id="description" name="description" value={newItem.description} onChange={handleChange} required />
                                                      </div>
                                                      <div class="mb-3">
                                                        <label for="pwd" class="form-label">Preço:</label>
                                                        <br />
                                                        <input type="number" class="form-control" id="price" name="price" value={newItem.price} onChange={handleChange} required />
                                                      </div>
                                                      <div class="mb-3">
                                                        <label for="pwd" class="form-label">Quantidade:</label>
                                                        <br />
                                                        <input type="number" class="form-control" id="quantity" name="quantity" value={newItem.quantity} onChange={handleChange} required />
                                                      </div>
                                                      <div class="mb-3">
                                                        <label for="pwd" class="form-label">Imagem:</label>
                                                        <br />
                                                        <input type="text" class="form-control" id="image" name="image" value={newItem.image} onChange={handleChange} required />
                                                      </div>
                                                     <br />                                                  
                                                      <button type="submit" class="btn btn-primary">Adicionar Item</button>
                                                      <button type="submit" class="btn btn-primary" onClick={() => handleSaveEditedItem(newItem.id)}>Confirmar</button>
                                                    </form> 
                                                 
                                              </div>
                                          </div>
                                          <div class="col-lg-6">
                                            <div class="card mb-4">
                                              <div class="card-header">
                                                <i class="fas fa-chart-pie me-1"></i>
                                                Cardápio
                                              </div>
                                              <div class="card-body">
                                                <section className="mx-5">
                                                  <ul className="list-group"> {/* Use list-group class */}
                                                    {items.length > 0 ? (
                                                      items.map((item) => (
                                                        <li key={item.id} className="list-group-item">
                                                          <div className="row no-gutters">
                                                            <div className="col-md-4">
                                                              <div
                                                                style={{
                                                                  width: "100%",
                                                                  height: "200px",
                                                                  overflow: "hidden",
                                                                }}
                                                              >
                                                                <img
                                                                  src={item.image}
                                                                  className="card-img"
                                                                  alt={item.title}
                                                                  style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover",
                                                                  }}
                                                                />
                                                              </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                              <div className="card-body">
                                                                <h5 className="card-title d-flex justify-content-between align-items-center">
                                                                  {item.title}
                                                                </h5>
                                                                <p
                                                                  style={{ borderBottom: "1px solid #ccc" }}
                                                                  className="card-text"
                                                                >
                                                                  {item.description}
                                                                </p>
                                                                <p className="card-text">Quantidade disponível: {item.quantity}</p>
                                                              </div>
                                                              <div className="d-flex justify-content-between align-items-center p-3">
                                                                <h6 className="card-subtitle text-muted">
                                                                  <span className="text-success">R$ {parseFloat(item.price).toFixed(2)}</span>
                                                                </h6>
                                                                <div className="item-actions">
                                                                            <button type='submit' class='btn btn-warning' onClick={() => handleEditItem(item)}>Editar</button>
                                                                            <button type='submit' class='btn btn-danger' onClick={() => handleDeleteItem(item.id)}>Excluir</button>
                                                                            <button type='submit' class='btn btn-success' onClick={() => handleSaveEditedItem(item.id)}>Confirmar Edição</button>
                                                                          </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </li>
                                                      ))
                                                    ) : (
                                                      <div className="col-12 text-center">
                                                        <p>Nenhum item disponível no cardápio.</p>
                                                      </div>
                                                    )}
                                                  </ul>
                                                </section>
                                                    </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </main>
                              <footer class="py-4 bg-light mt-auto">
                                  <div class="container-fluid px-4">
                                      <div class="d-flex align-items-center justify-content-between small">
                                          <div class="text-muted">Copyright &copy; Your Website 2023</div>
                                          <div>
                                              <a href="#">Privacy Policy</a>
                                              &middot;
                                              <a href="#">Terms &amp; Conditions</a>
                                          </div>
                                      </div>
                                  </div>
                              </footer>
                          </div>
                      </div>
                      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
                      <script src="js/scripts.js"></script>
                      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
                      <script src="assets/demo/chart-area-demo.js"></script>
                      <script src="assets/demo/chart-bar-demo.js"></script>
                      <script src="assets/demo/chart-pie-demo.js"></script>
                  </body>
                      
                    );
                  };


                  
                  export default CardapioPanel;
                  