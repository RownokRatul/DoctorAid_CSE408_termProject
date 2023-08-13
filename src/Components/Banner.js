// components/Banner.js

import React from 'react';

const Banner = ({ src }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={src} alt="Banner" style={{ width: '100%' }} />
    </div>
  );
};

export default Banner;
