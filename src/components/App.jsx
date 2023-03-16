import React, { useState, useEffect } from 'react';
import Container from './Container/Container';
import Cosmetics from './Cosmetics/cosmetics';
import SelectedCosmetic from './SelectCosmetic/SelectCosmetic';
import Search from './Search/Search';
import Loader from './Loader/Loader';
import './index.css';
import {
  loadAllCosmetic,
  loadCosmeticItem,
  searchCosmeticByName,
} from '../utils/api';
import { getPaginationItems } from '../utils/get-pagination-items';
import Pagination from '@mui/material/Pagination';
import { MenuItem, Select } from '@mui/material';

function App() {
  const [cosmetics, setCosmetics] = useState([]);
  const [selectedCosmetic, setSelectedCosmetic] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [paginated, setPaginatedItems] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const request = search?.length
      ? searchCosmeticByName(search)
      : loadAllCosmetic();
    request
      .then(res => {
        setCosmetics(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [search]);

  useEffect(() => {
    const paginated = getPaginationItems(cosmetics, currentPage, itemsPerPage);
    setPaginatedItems(paginated);
  }, [cosmetics, currentPage, itemsPerPage, setPaginatedItems]);

  const handleItemClick = id => {
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
  };

  return (
    <Container>
      <h1 className="title">Cosmetics List</h1>
      <Search search={search} setSearch={setSearch} />
      <Select
        id="select-per-page"
        value={itemsPerPage}
        label="Per page"
        onChange={e => setItemsPerPage(e.target.value)}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={40}>40</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Cosmetics
            cosmetics={paginated?.items || []}
            handleItemClick={handleItemClick}
          />
          <div className="pagination">
            <Pagination
              count={paginated?.totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
            />
          </div>
        </>
      )}
      <SelectedCosmetic selectedCosmetic={selectedCosmetic} />
    </Container>
  );
}

export default App;
