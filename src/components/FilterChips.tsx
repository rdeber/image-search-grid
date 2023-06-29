import React from 'react';
import { Box, Chip } from '@mui/material';

interface FilterChipsProps {
  filters: string[];
  onFilterClick: (filter: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ filters, onFilterClick }) => {
  return (
    <Box sx={{ m: 2 }}>
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          onClick={() => onFilterClick(filter)}
          sx={{ mx: 1 }}
        />
      ))}
    </Box>
  );
};

export default FilterChips;
