import React, { ReactElement, ChangeEvent } from 'react';
import { TextField, InputAdornment, IconButton, Button, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  query: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onClearClick: () => void;
}

const SearchBar = ({ query, onSearchChange, onSearchClick, onClearClick }: SearchBarProps): ReactElement => {
  // Event handler for search input change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event); // Call the parent component's onSearchChange function
  };

  // Event handler for search button click
  const handleSearchClick = () => {
    onSearchClick(); // Call the parent component's onSearchClick function
  };

  // Event handler for clear button click
  const handleClearClick = () => {
    onClearClick(); // Call the parent component's onClearClick function
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        margin="normal"
        value={query}
        onChange={handleSearchChange} // Bind the handleSearchChange function to the input's onChange event
        InputProps={{
          id: 'search-input',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear search"
                onClick={handleClearClick} // Bind the handleClearClick function to the clear button's onClick event
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchClick} // Bind the handleSearchClick function to the search button's onClick event
        sx={{ marginInlineStart: 1 }}
      >
        SearchXXX
      </Button>
    </Box>
  );
};

export default SearchBar;