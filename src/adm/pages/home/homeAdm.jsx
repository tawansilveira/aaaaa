import React from 'react';
import './scripts.js';
import './styles.css';
import AdminPanel from './adminPanel.jsx';

const HomePageAdm = () => {
  const handleAddMenuItem = (newItem) => {
  };

  const handleEditMenuItem = (itemId) => {
  };

  const handleDeleteMenuItem = (itemId) => {
  };

  return (
    <body class="sb-nav-fixed">
      <div id="layoutSidenav_content">
        <main>
          <div class="container-fluid px-4">
            <AdminPanel
              onAddMenuItem={handleAddMenuItem}
              onEditMenuItem={handleEditMenuItem}
              onDeleteMenuItem={handleDeleteMenuItem}
            />
          </div>
        </main>
      </div>
    </body>
  );
};

export default HomePageAdm;
