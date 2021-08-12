import React from 'react';
import './loader.scss'

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="wrapper">
        <div className="circle circle-1"></div>
        <div className="circle circle-1a"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <h1>Loading&hellip;</h1>
    </div>
  );
}

export default Loader;
