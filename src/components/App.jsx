import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from './Container/Container';
import Cosmetics from './Cosmetics/cosmetics';
import SelectedCosmetic from './SelectCosmetic/SelectCosmetic';
import Search from './Search/Search';
import Loader from './Loader/Loader';
import './index.css';

function App() {
  const [cosmetics, setCosmetics] = useState([]);
  const [selectedCosmetic, setSelectedCosmetic] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    setIsLoading(true);
    axios
      .get(`https://fortnite-api.com/v2/cosmetics/br/${id}`)
      .then(response => {
        setSelectedCosmetic(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const filteredCosmetics =
    cosmetics &&
    cosmetics.filter(cosmetic =>
      cosmetic.name.toLowerCase().includes(search.toLowerCase())
    );
  
  

  // Пагинация.//////

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredCosmetics &&
    filteredCosmetics.slice(indexOfFirstItem, indexOfLastItem);

  const visiblePages = 10; 

  let pageNumbers = [];
  for (
    let i = 1;
    i <=
    Math.ceil((filteredCosmetics && filteredCosmetics.length) / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  let renderPageNumbers = null;

  if (pageNumbers.length > 0) {
    let firstPageToShow = currentPage - Math.floor(visiblePages / 2);
    let lastPageToShow = currentPage + Math.floor(visiblePages / 2);

    if (firstPageToShow < 1) {
      firstPageToShow = 1;
      lastPageToShow = visiblePages;
    } else if (lastPageToShow > pageNumbers.length) {
      lastPageToShow = pageNumbers.length;
      firstPageToShow = lastPageToShow - visiblePages + 1;
    }

    pageNumbers = pageNumbers.slice(firstPageToShow - 1, lastPageToShow);

    renderPageNumbers = (
      <ul id="page-numbers">
        {currentPage > 1 && (
          <li onClick={() => setCurrentPage(currentPage - 1)}>&lt;</li>
        )}
        {pageNumbers.map(number => {
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
        })}
        {currentPage < pageNumbers.length && (
          <li onClick={() => setCurrentPage(currentPage + 1)}>&gt;</li>
        )}
      </ul>
    );
  }

  /////////////////////////////

  return (
    <Container>
      <h1 className="title">Cosmetics List</h1>
      <Search search={search} setSearch={setSearch} />
      <select
        value={itemsPerPage}
        onChange={e => setItemsPerPage(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Cosmetics
            cosmetics={currentItems}
            handleItemClick={handleItemClick}
          />
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </>
      )}
      <SelectedCosmetic selectedCosmetic={selectedCosmetic} />
    </Container>
  );
}

export default App;

