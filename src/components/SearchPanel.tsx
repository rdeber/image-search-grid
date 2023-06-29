import React, { useState, useEffect, ReactElement, useRef } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import FilterChips from './FilterChips';
import SearchBar from './SearchBar';

interface IPhotoProps {
  alt_description?: string;
  description?: string;
  urls?: {
    regular?: string;
  };
  user?: {
    name?: string;
    username?: string;
  };
}

const PhotoGrid = ({
  alt_description = '',
  description = '',
  urls,
  user,
}: IPhotoProps): ReactElement => {
  const [photos, setPhotos] = useState<IPhotoProps[]>([]);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filters = ['Nature', 'Food', 'Travel', 'Animals', 'Technology', 'Coke'];

  useEffect(() => {
    // Define an asynchronous function to fetch photos
    const fetchPhotos = async () => {
      try {
        // Make an API request to fetch photos based on the query
        const response = await fetch(
          `https://api.unsplash.com/search/photos/`
        );

        // Parse the response as JSON
        const data = await response.json();

        // Update the photos state with the fetched results
        setPhotos(data.results);
      } catch (error) {
        console.error('Error fetching photos', error);
      }
    };

    // Only fetch photos when the query changes
    if (query !== '') {
      fetchPhotos();
    }
  }, [query]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the query state with the value from the input field
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchInputRef.current) {
      // Update the query state with the value from the input field
      setQuery(searchInputRef.current.value);
    }
  };

  const handleFilterClick = (filter: string) => {
    // Update the query state with the selected filter value
    setQuery(filter);
  };

  const handleClearClick = () => {
    // Clear the query state
    setQuery('');
  };

  return (
    <>
      {/* Render the SearchBar component */}
      <SearchBar
        query={query}
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        onClearClick={handleClearClick}
      />

      {/* Render the FilterChips component */}
      <FilterChips filters={filters} onFilterClick={handleFilterClick} />

      <Box sx={{ m: 2 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {/* Render the photo cards based on the photos array */}
          {photos.map((photo, index) => (
            <Card key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={urls?.regular}
                  alt={alt_description}
                />
                <CardContent>
                  <Typography variant="subtitle1">{description}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Photo by {user?.name} (@{user?.username})
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Masonry>
      </Box>
    </>
  );
};

export default PhotoGrid;
