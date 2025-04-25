import { useLocation } from 'react-router-dom';

export const useQuery = (...fields) => {
  const searchParams = new URLSearchParams(useLocation().search);
  const result = {};
  fields.forEach(field => {
    result[field] = searchParams.get(field);
  });
  return result;
};
