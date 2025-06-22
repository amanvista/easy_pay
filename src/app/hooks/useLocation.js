import { useDispatch, useSelector } from 'react-redux';
import { setCity,setZone,resetLocation } from '../slices/locationSlice';

export default function useLocation() {
  const dispatch = useDispatch();

  const { cityId, cityName, zoneId, zoneName } = useSelector(
    (state) => state.location
  );

  return {
    cityId,
    cityName,
    zoneId,
    zoneName,

    // Setters
    setCity: (id, name) => dispatch(setCity({ id, name })),
    setZone: (id, name) => dispatch(setZone({ id, name })),
    resetLocation: () => dispatch(resetLocation()),
  };
}
