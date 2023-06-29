import React, { useState, useEffect, ReactElement, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Box,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Masonry from '@mui/lab/Masonry';

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
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos/?client_id=Js4RVQ76R2SGGiBp3CMa_w55ERNVC6lQXMv_qF5_2zc&query=${query}&per_page=25`
        );
        const data = await response.json();
        setPhotos(data.results);
      } catch (error) {
        console.error('Error fetching photos', error);
      }
    };
    if (query !== '') {
      fetchPhotos();
    }
  }, [query]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchInputRef.current) {
      setQuery(searchInputRef.current.value);
    }
  };

  const handleFilterClick = (filter: string) => {
    setQuery(filter);
  };

  const handleClearClick = () => {
    setQuery('');
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'background.paper' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Search"
              variant="outlined"
              margin="normal"
              value={query}
              onChange={handleSearchChange}
              InputProps={{
                id: 'search-input',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear search"
                      onClick={handleClearClick}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchClick}
              sx={{ marginInlineStart: 1 }}
            >
              Search
            </Button>
          </Box>
        </Toolbar>
        <Box sx={{ m: 2 }}>
          {filters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onClick={() => handleFilterClick(filter)}
              sx={{ mx: 1 }}
            />
          ))}
        </Box>
      </AppBar>
      <Box sx={{ m: 2 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
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
