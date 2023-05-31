import React, { useEffect } from 'react';
import '../css/pageLoader.css';

export default function PageLoader() {
  return (
    <div className="loader-container">
      <div className="loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      </div>
    </div>
  )
}
