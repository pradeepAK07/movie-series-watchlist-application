import React from 'react';
import { Card, Tag, Rate, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import type { WatchlistItem, WatchStatus } from '../store/slices/watchlistSlice';
import './MovieCard.scss';

const { Meta } = Card;

interface MovieCardProps {
  item: Partial<WatchlistItem>;
  isInWatchlist?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  onUpdateStatus?: (status: WatchStatus) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, isInWatchlist, onAdd, onRemove, onUpdateStatus }) => {
  return (
    <Card
      hoverable
      cover={<img alt={item.title} src={item.posterPath || 'https://via.placeholder.com/300x450?text=No+Image'} />}
      className="movie-card"
      actions={[
        isInWatchlist ? (
          <Tooltip title="Remove from Watchlist">
            <DeleteOutlined key="remove" onClick={onRemove} style={{ color: 'red' }} />
          </Tooltip>
        ) : (
          <Tooltip title="Add to Watchlist">
            <PlusOutlined key="add" onClick={onAdd} />
          </Tooltip>
        ),
        isInWatchlist && (
           <Tooltip title="Mark as Completed">
             <CheckOutlined key="complete" onClick={() => onUpdateStatus?.('completed')} />
           </Tooltip>
        )
      ]}
    >
      <Meta 
        title={item.title} 
        description={
          <div>
            <div style={{ marginBottom: 5 }}>{item.releaseYear}</div>
            <Rate disabled defaultValue={item.rating} style={{ fontSize: 12 }} />
            {item.status && <Tag color="blue" style={{ marginTop: 5 }}>{item.status.toUpperCase()}</Tag>}
          </div>
        } 
      />
    </Card>
  );
};

export default MovieCard;
