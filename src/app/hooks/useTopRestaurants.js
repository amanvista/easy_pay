import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTopRestaurants,
  selectTopRestaurants,
  selectTopRestaurantsLoading,
  selectTopRestaurantsError,
  selectTopRestaurantsZoneId,
} from '../slices/topRestaurantsSlice';
import useLocation from './useLocation';

const useTopRestaurants = () => {
  const dispatch = useDispatch();
  const {zoneId} = useLocation()
  const topRestaurants = useSelector(selectTopRestaurants);
  const loading = useSelector(selectTopRestaurantsLoading);
  const error = useSelector(selectTopRestaurantsError);
  const loadedZoneId = useSelector(selectTopRestaurantsZoneId);

  useEffect(() => {
    if (zoneId && zoneId !== loadedZoneId) {
      dispatch(fetchTopRestaurants(zoneId));
    }
  }, [zoneId, dispatch, loadedZoneId]);

  return {
    topRestaurants,
    loading,
    error,
  };
};

export default useTopRestaurants;
