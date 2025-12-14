import React, { useState } from 'react';
import { Input, Row, Col, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addToWatchlist } from '../../store/slices/watchlistSlice';
import MovieCard from '../../components/MovieCard';
import MainLayout from '../../components/Layout/MainLayout';

const { Title } = Typography;
const { Search } = Input;

// Mock Data
const MOCK_DATA = [
  { tmdbId: 1, title: 'Inception', posterPath: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', releaseYear: 2010, type: 'movie' as const, genreIds: [1, 2], status: 'planned' as const },
  { tmdbId: 2, title: 'Interstellar', posterPath: 'https://image.tmdb.org/t/p/w500/gEU2QniL6E8ahDnMNatnZsUh8qU.jpg', releaseYear: 2014, type: 'movie' as const, genreIds: [1, 3], status: 'planned' as const },
  { tmdbId: 3, title: 'Breaking Bad', posterPath: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', releaseYear: 2008, type: 'series' as const, genreIds: [4, 5], status: 'planned' as const },
  { tmdbId: 4, title: 'The Dark Knight', posterPath: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', releaseYear: 2008, type: 'movie' as const, genreIds: [1, 2], status: 'planned' as const },
  { tmdbId: 5, title: 'Stranger Things', posterPath: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', releaseYear: 2016, type: 'series' as const, genreIds: [4, 6], status: 'planned' as const },
];

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const watchlistItems = useAppSelector((state) => state.watchlist.items);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MOCK_DATA.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (item: typeof MOCK_DATA[0]) => {
    dispatch(addToWatchlist({
      id: Math.random().toString(36).substr(2, 9), // Temp ID
      tmdbId: item.tmdbId,
      title: item.title,
      posterPath: item.posterPath,
      releaseYear: item.releaseYear,
      type: item.type,
      genreIds: item.genreIds,
      status: 'planned',
      updatedAt: Date.now(),
    }));
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: 800, margin: '0 auto 30px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Discover Movies & Series</Title>
        <Search
          placeholder="Search for movies or tv series..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Row gutter={[16, 16]}>
        {filteredData.map(item => {
          const isInWatchlist = watchlistItems.some(w => w.tmdbId === item.tmdbId);
          return (
            <Col xs={12} sm={8} md={6} lg={4} key={item.tmdbId}>
              <MovieCard 
                item={item} 
                isInWatchlist={isInWatchlist}
                onAdd={() => handleAdd(item)}
              />
            </Col>
          );
        })}
      </Row>
    </MainLayout>
  );
};

export default SearchPage;
