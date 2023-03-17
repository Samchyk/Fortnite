import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Container from 'components/Container/Container';
import { loadCosmeticItem } from '../../utils/api';
import s from './SelectCosmetic.module.css' 
import { Link } from 'react-router-dom';

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
    <Container>
      <button className={s.Button}>
        <Link className={s.link} to="/">Back to list</Link>
      </button>

      <div className={s.Cosmetic}>
        <img src={selectedCosmetic.images.icon} alt={selectedCosmetic.name} />
        <div className={s.Info}>
          <h2 className={s.title}>{selectedCosmetic.name}</h2>
          <p className={s.text}>
            <b>Description: </b>
            {selectedCosmetic.description}
          </p>
          <p className={s.text}>
            <b>Type: </b>
            {selectedCosmetic.type.value}
          </p>
          <p className={s.text}>
            <b>Rarity: </b>
            {selectedCosmetic.rarity.value}
          </p>
          {/* <p className={s.text}>
            <b>Series:</b>
            {selectedCosmetic.series.value}
          </p> */}
          <p className={s.text}>
            <b>Set: </b>
            {selectedCosmetic.set.value}
          </p>
        </div>
      </div>
    </Container>
  );
}

export default SelectedCosmetic;
