import React from 'react';
import { Row, Col, Typography, Empty, Segmented } from 'antd';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import MovieCard from '../../components/MovieCard';
import MainLayout from '../../components/Layout/MainLayout';
import { removeFromWatchlist, updateWatchlistItem, setFilter, type WatchStatus } from '../../store/slices/watchlistSlice';

const { Title } = Typography;

const Watchlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, filter } = useAppSelector((state) => state.watchlist);
  
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.status === filter);

  const handleRemove = (id: string) => {
    dispatch(removeFromWatchlist(id));
  };

  const handleUpdateStatus = (id: string, status: WatchStatus) => {
    const item = items.find(i => i.id === id);
    if (item) {
      dispatch(updateWatchlistItem({ ...item, status }));
    }
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>My Watchlist</Title>
        <Segmented
          options={[
            { label: 'All', value: 'all' },
            { label: 'Planned', value: 'planned' },
            { label: 'Watching', value: 'watching' },
            { label: 'Completed', value: 'completed' },
            { label: 'Dropped', value: 'dropped' },
          ]}
          value={filter}
          onChange={(value) => dispatch(setFilter(value as WatchStatus | 'all'))}
        />
      </div>

      {filteredItems.length === 0 ? (
        <Empty description="No items in watchlist" image={Empty.PRESENTED_IMAGE_SIMPLE} /> 
      ) : (
        <Row gutter={[16, 16]}>
          {filteredItems.map(item => (
            <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
              <MovieCard 
                item={item} 
                isInWatchlist={true}
                onRemove={() => handleRemove(item.id)}
                onUpdateStatus={(status) => handleUpdateStatus(item.id, status)}
              />
            </Col>
          ))}
        </Row>
      )}
    </MainLayout>
  );
};

export default Watchlist;
