import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from './Select';

const APISelect = ({ url, value, onChange, placeholder = "Select an option" }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const finalUrl = 'http://localhost/easy_pay_backend/api/'+url
    axios.get(finalUrl)
      .then(res => {
        if (res.data && res.data.data) {
          setOptions(res.data.data);
        }
      })
      .catch(err => console.error("Error fetching options:", err));
  }, [url]);
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(opt => opt.id == selectedValue);
    if (selectedOption) {
      onChange(selectedOption.id, selectedOption.name);
    }
  };

  // Automatically select the first option if value is not set
  useEffect(() => {
    if (!value && options.length > 0) {
      const firstOption = options[0];
      onChange(firstOption.id, firstOption.name);
    }
  }, [options, value, onChange]);
  

  return (
    <Select
      id="api-select"
      value={value||options?.[0]?.id}
      options={options}
      placeholder="Select API"
      onChange={handleChange}
    />
  );
};

export default APISelect;
