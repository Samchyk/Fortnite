import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { loadCosmeticItem } from '../../utils/api';

function SelectedCosmetic() {
  const { id } = useParams();
  const [selectedCosmetic, setSelectedCosmetic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    loadCosmeticItem(id)
      .then(res => {
        setSelectedCosmetic(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!selectedCosmetic) {
    return <div>Selected cosmetic not found</div>;
  }

  return (
    <div>
      <h2>{selectedCosmetic.name}</h2>
      <img src={selectedCosmetic.images.icon} alt={selectedCosmetic.name} />
      <p>{selectedCosmetic.description}</p>
      <p>{selectedCosmetic.type.value}</p>
      <p>{selectedCosmetic.rarity.value}</p>
    </div>
  );
}

export default SelectedCosmetic;
