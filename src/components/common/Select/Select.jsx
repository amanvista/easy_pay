import React from 'react';

const Select = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select',
  icon: Icon // 🟠 Icon component passed as prop (e.g., MapPin)
}) => {
  return (
    <div className="relative w-full md:w-1/4">
      {Icon && (
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
          size={20}
        />
      )}
      <select
        value={value}
        onChange={onChange}
        className="appearance-none pl-12 pr-4 py-3 rounded-xl w-full bg-white/80 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Select;
