import React from 'react'
import APISelect from '../common/Select/ApiSelect'
import { MapPin } from 'lucide-react'

const CitySelector = ({selectedCity,onChange}) => {
  return (
      <APISelect
        url="location/getcities"
        value={selectedCity}
        onChange={onChange}
        placeholder="Select a city"
        icon={MapPin}
      />
  )
}

export default CitySelector