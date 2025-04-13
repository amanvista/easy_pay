import React from 'react';

const ThemeSelector = ({ changeTheme }) => {
  const themes = [
    { name: 'classic', color: '#8b0000', label: 'Classic' },
    { name: 'green', color: '#2e8b57', label: 'Green' },
    { name: 'blue', color: '#4682b4', label: 'Blue' },
    { name: 'purple', color: '#4b0082', label: 'Purple' },
    { name: 'rustic', color: '#d2691e', label: 'Rustic' }
  ];

  return (
    <div className="theme-selector">
      <span>Theme: </span>
      {themes.map(theme => (
        <button
          key={theme.name}
          className="theme-btn"
          style={{ background: theme.color }}
          onClick={() => changeTheme(theme.name)}
          title={theme.label}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;