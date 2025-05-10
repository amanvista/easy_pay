import React, { useState, useEffect } from 'react';
import APISelect from '../Select/ApiSelect';

const ZoneSelector = ({ selectedCity,selectedZone ,onChange}) => {
  const [zoneUrl, setZoneUrl] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      setZoneUrl(`location/getzones?city_id=${selectedCity}`);
    }
  }, [selectedCity]);

  return (
    <div>
      {zoneUrl && (
        <APISelect
          url={zoneUrl}
          value={selectedZone}
          onChange={onChange}
          placeholder="Select a zone"
        />
      )}
    </div>
  );
};

export default ZoneSelector;
