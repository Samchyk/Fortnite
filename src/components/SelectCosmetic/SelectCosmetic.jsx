import React from 'react';

function SelectedCosmetic({ selectedCosmetic }) {
  if (!selectedCosmetic) {
    return null;
  }

  return (
    <div>
      <h2>{selectedCosmetic.name}</h2>
      <img src={selectedCosmetic.images.featured} alt={selectedCosmetic.name} />
      <p>{selectedCosmetic.description}</p>
    </div>
  );
}

export default SelectedCosmetic;
