import React from 'react';
import s from './Search.module.css';


function Search({ search, setSearch }) {
  return (
    <div className={s.Search}>
      
        <input
          className={s.SearchFormInput}
          type="text"
          placeholder="Search..."
          autoFocus={true}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
    </div>
  );
}
export default Search;
