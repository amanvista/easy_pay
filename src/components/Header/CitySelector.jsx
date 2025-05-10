import React, { useState } from 'react';
import APISelect from '../Select/ApiSelect';

const CitySelector = ({selectedCity,onChange}) => {

  return (
    <div>
      <APISelect
        url="location/getcities"
        value={selectedCity}
        onChange={onChange}
        placeholder="Select a city"
      />
    </div>
  );
};

export default CitySelector;
