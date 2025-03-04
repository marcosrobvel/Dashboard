import React, { useState } from 'react';

export const SortDropdown = ({ onSortChange }) => {
    const [sortCriteria, setSortCriteria] = useState('date');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleCriteriaChange = (e) => {
        const newCriteria = e.target.value;
        setSortCriteria(newCriteria);
        onSortChange(newCriteria, sortDirection);
    };

    const handleDirectionChange = (e) => {
        const newDirection = e.target.value;
        setSortDirection(newDirection);
        onSortChange(sortCriteria, newDirection); 
    };

    return (
        <div className="sort-dropdown">
            <select
                value={sortCriteria}
                onChange={handleCriteriaChange}
                className="dropdownFilterOrder"
            >
                <option className='orderByOption' value="">Order by</option>
                <option value="date">Import date</option>
                <option value="width">Width</option>
                <option value="height">Height</option>
                <option value="likes">Likes</option>
            </select>

            <select
                value={sortDirection}
                onChange={handleDirectionChange}
                className="dropdownFilterOrderAscDesc"
            >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
        </div>
    );
};