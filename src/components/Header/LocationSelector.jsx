import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Popup from '../Popup/Popup';
import CitySelector from './CitySelector';
import ZoneSelector from './ZoneSelector';
import useLocation from '../../app/hooks/useLocation';

const LocationSelector = () => {
  const { cityId, cityName, zoneId, zoneName, setCity, setZone} = useLocation();

  const [showPopup, setShowPopup] = useState(false);

  const userLocation =
    cityName && zoneName ? `${cityName}-${zoneName}` : 'Select location';

  const onChangeLocation = () => setShowPopup(true);
  useEffect(()=>{
    console.log(cityName)
    console.log(zoneName)
  },[cityName,zoneName])
  return (
    <div className="location">
      <FaMapMarkerAlt className="location-icon" />
      <span>{userLocation}</span>
      <button className="location-change" onClick={onChangeLocation}>Change</button>

      {showPopup && (
        <Popup
          isOpen={showPopup}
          title="Select Your Location"
          onClose={() => setShowPopup(false)}
        >
          <CitySelector
            selectedCity={cityId}
            onChange={(id, name) => {
                setCity(id,name);
            }}
          />
          <ZoneSelector
            selectedCity={cityId}
            selectedZone={zoneId}
            onChange={(id, name) => {
              setZone(id,name);
            }}
          />
        </Popup>
      )}
    </div>
  );
};

export default LocationSelector;
