import { useEffect, useState } from 'react';
import axios from 'axios';

const useRestaurants = (page = 1, limit = 5) => {
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost/easy_pay_backend/api/restaurants/get?page=${page}&limit=${limit}`);
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
  }, [page, limit]);

  return { restaurants, totalPages, loading, error };
};

export default useRestaurants;
