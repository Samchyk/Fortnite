import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cosmetics, setCosmetics] = useState([]);

  useEffect(() => {
    axios
      .get('https://fortnite-api.com/v2/cosmetics/br/search')
      .then(response => {
        setCosmetics(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Cosmetics List</h1>
      <ul>
        {cosmetics.map(cosmetic => (
          <li key={cosmetic.id}>
            <img src={cosmetic.images.icon} alt={cosmetic.name} />
            {cosmetic.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
