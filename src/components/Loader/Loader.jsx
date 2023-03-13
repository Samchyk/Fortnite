import React from 'react';
import './Loader.css';

function Loader({ isLoading }) {
  return isLoading ? <div className="loader">Loading...</div> : null;
}

export default Loader;
