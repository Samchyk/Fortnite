import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';
import './index.css'


function App() {
  const [cosmetics, setCosmetics] = useState([]);
  const [selectedCosmetic, setSelectedCosmetic] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://fortnite-api.com/v2/cosmetics/br')
      .then(response => {
        setCosmetics(response.data.item);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleItemClick = id => {
    setIsLoading(true);
    axios
      .get(`https://fortnite-api.com/v2/cosmetics/br/${id}`)
      .then(response => {
        setSelectedCosmetic(response.data.item);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const filteredCosmetics = cosmetics.filter(cosmetic =>
    cosmetic.name.toLowerCase().includes(search.toLowerCase())
  );


  // Пагинация.//////

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCosmetics.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredCosmetics.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        onClick={e => setCurrentPage(Number(e.target.id))}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </li>
    );
  });

  /////////////////////////////

  return (
    <div className="container">
      <h1>Cosmetics List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <ul>
            {currentItems.map(cosmetic => (
              <li
                key={cosmetic.id}
                onClick={() => handleItemClick(cosmetic.id)}
              >
                <img src={cosmetic.images.icon} alt={cosmetic.name} />
                {cosmetic.name}
              </li>
            ))}
          </ul>
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </>
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
