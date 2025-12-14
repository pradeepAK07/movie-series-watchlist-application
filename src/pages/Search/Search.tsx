import React, { useState } from 'react';
import { Input, Row, Col, Typography, Empty, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addToWatchlist } from '../../store/slices/watchlistSlice';
import MovieCard from '../../components/MovieCard';
import MainLayout from '../../components/Layout/MainLayout';
import { searchMovies, type IMDBResult } from '../../services/imdbApi';

const { Title } = Typography;
const { Search } = Input;

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const watchlistItems = useAppSelector((state) => state.watchlist.items);
  const [results, setResults] = useState<IMDBResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce logic
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim()) {
        setLoading(true);
        setSearched(true);
        const data = await searchMovies(searchTerm);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
        setSearched(false);
      }
    }, 1000); // 1000ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleAdd = (item: IMDBResult) => {
    dispatch(addToWatchlist({
      id: Math.random().toString(36).substr(2, 9), // Temp ID until Firestore sync
      imdbId: item['#IMDB_ID'],
      title: item['#TITLE'],
      posterPath: item['#IMG_POSTER'],
      releaseYear: item['#YEAR'],
      type: 'movie', // API doesn't distinguish, default to movie
      status: 'planned',
      updatedAt: Date.now(),
    }));
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: 800, margin: '0 auto 30px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Discover Movies & Series</Title>
        <Search
          placeholder="Search for movies (e.g. Spiderman)..."
          allowClear
          enterButton={false} // Removed button requirement
          size="large"
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
          loading={loading}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : results.length > 0 ? (
        <Row gutter={[16, 16]}>
          {results.map(item => {
            const isInWatchlist = watchlistItems.some(w => w.imdbId === item['#IMDB_ID']);
            console.log("item", item);
            
            return (
              <Col xs={12} sm={8} md={6} lg={4} key={item['#IMDB_ID']}>
                <MovieCard 
                  item={{
                    title: item['#TITLE'],
                    posterPath: item['#IMG_POSTER'],
                    releaseYear: item['#YEAR'],
                    rating: 0 // API doesn't return rating in search
                  }} 
                  isInWatchlist={isInWatchlist}
                  onAdd={() => handleAdd(item)}
                />
              </Col>
            );
          })}
        </Row>
      ) : searched ? (
        <Empty description="No results found" />
      ) :   <Title level={5} style={{ textAlign: 'center' }}>Please Search for movies or series...</Title>}
    </MainLayout>
  );
};

export default SearchPage;
