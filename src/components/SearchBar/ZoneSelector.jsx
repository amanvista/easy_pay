import React, { useState, useEffect } from 'react';
import APISelect from '../common/Select/ApiSelect';
import { MapPin } from 'lucide-react';

const ZoneSelector = ({ selectedCity,selectedZone ,onChange}) => {
  const [zoneUrl, setZoneUrl] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      setZoneUrl(`location/getzones?city_id=${selectedCity}`);
    }
  }, [selectedCity]);

  return (zoneUrl && (
        <APISelect
          url={zoneUrl}
          value={selectedZone}
          onChange={onChange}
          placeholder="Select a zone"
          icon={MapPin}
        />
      ))
  
};

export default ZoneSelector;
