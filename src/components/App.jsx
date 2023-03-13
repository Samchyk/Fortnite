import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';

function App() {
  const [cosmetics, setCosmetics] = useState([]);
  const [selectedCosmetic, setSelectedCosmetic] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://fortnite-api.com/v2/cosmetics/br')
      .then(response => {
        setCosmetics(response.data.data);
         setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
          setIsLoading(false);
      });
  }, []);

  const handleItemClick = id => {
    axios
      .get(`https://fortnite-api.com/v2/cosmetics/br/${id}`)
      .then(response => {
        setSelectedCosmetic(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const filteredCosmetics = cosmetics.filter(cosmetic =>
    cosmetic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Cosmetics List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {isLoading ? (<Loader />
      ) : (
        
        <ul>
          {filteredCosmetics.map(cosmetic => (
            <li key={cosmetic.id} onClick={() => handleItemClick(cosmetic.id)}>
              <img src={cosmetic.images.icon} alt={cosmetic.name} />
              {cosmetic.name}
            </li>
          ))}
        </ul>
      )}
      {selectedCosmetic && (
        <div>
          <h2>{selectedCosmetic.name}</h2>
          <img
            src={selectedCosmetic.images.featured}
            alt={selectedCosmetic.name}
          />
          <p>{selectedCosmetic.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
