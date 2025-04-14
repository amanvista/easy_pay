import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

const MenuCategory = ({ category }) => {
  return (
    <div className="menu-category">
      <h2 className="category-title">{category.name}</h2>
      <div className="menu-items">
        {category.items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;