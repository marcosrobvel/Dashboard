import React, { useState } from 'react';

export const SortDropdown = ({ onSortChange }) => {
 
    const handleChange = (e) => {
        const [criteria, direction] = e.target.value.split('_');
        onSortChange(criteria, direction);
      };
    
      return (
        <select className="dropdownOrder" onChange={handleChange}>
            <option value="" disabled selected>Order by</option>
          <option value="date_asc">Import date ↑</option>
          <option value="date_desc">Import date ↓</option>
          <option value="likes_asc">Likes ↑</option>
          <option value="likes_desc">Likes ↓</option>
          <option value="width_asc">Width ↑</option>
          <option value="width_desc">Width ↓</option>
          <option value="height_asc">Height ↑</option>
          <option value="height_desc">Height ↓</option>
        </select>
      );
};
