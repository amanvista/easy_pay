// components/CustomSelect.jsx
import React from 'react';
import "./Select.css"
const Select = ({ id = 'custom-select', value, options = [], placeholder = 'Select', onChange }) => {
  return (
    <div className="api-select-wrapper">
      <select
        id={id}
        className="api-select"
        value={value || ''}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.name||opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
