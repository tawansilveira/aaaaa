import React from 'react';
import CardapioPanel from './cardapioPanel.jsx';

const CardapioAdm = () => {
  const handleAddMenuItem = (newItem) => {
  };

  const handleEditMenuItem = (itemId) => {
  };

  const handleDeleteMenuItem = (itemId) => {
  };

  return (
 
            <CardapioPanel
              onAddMenuItem={handleAddMenuItem}
              onEditMenuItem={handleEditMenuItem}
              onDeleteMenuItem={handleDeleteMenuItem}
            />
 
  );
};

export default CardapioAdm;
