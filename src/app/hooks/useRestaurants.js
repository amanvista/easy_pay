import { useEffect, useState } from 'react';
import axios from 'axios';
import useLocation from './useLocation';

const useRestaurants = (page = 1, limit = 5) => {
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {zoneId} = useLocation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `http://localhost/easy_pay_backend/api/restaurants/get?page=${page}&limit=${limit}`
        if(zoneId){
            url = url +`&zone_id=${zoneId}` 
        }
        const response = await axios.get(url);
        const resData = response.data?.data?.restaurants;

        if (resData) {
          setRestaurants(resData.data);
          setTotalPages(resData.pagination.total_pages);
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, limit,zoneId]);

  return { restaurants, totalPages, loading, error };
};

export default useRestaurants;
