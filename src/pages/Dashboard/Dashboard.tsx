import React from 'react';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import { VideoCameraOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks/storeHooks';
import MainLayout from '../../components/Layout/MainLayout';
import MovieCard from '../../components/MovieCard';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { items } = useAppSelector((state) => state.watchlist);
  
  const total = items.length;
  const completed = items.filter(i => i.status === 'completed').length;
  const watching = items.filter(i => i.status === 'watching').length;
  
  // Get last 5 added items
  const recentItems = [...items].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4);

  return (
    <MainLayout>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Total Watchlist" value={total} prefix={<VideoCameraOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Completed" value={completed} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Watching" value={watching} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#eb2f96' }} />
          </Card>
        </Col>
      </Row>
      
      <Title level={3} style={{ marginTop: 24 }}>Recently Added</Title>
      {recentItems.length === 0 ? (
        <p>No items in watchlist yet.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {recentItems.map(item => (
            <Col xs={12} sm={8} md={6} lg={6} key={item.id}>
              <MovieCard item={item} isInWatchlist={true} />
            </Col>
          ))}
        </Row>
      )}
    </MainLayout>
  );
};

export default Dashboard;
