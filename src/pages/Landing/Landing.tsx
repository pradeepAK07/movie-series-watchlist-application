import React from 'react';
import { Typography, Button, Space } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/storeHooks';
import MainLayout from '../../components/Layout/MainLayout';
import { PlaySquareOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Landing: React.FC = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return null; // Or a loading spinner
  if (user) return <Navigate to="/dashboard" />;

  return (
    <MainLayout>
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <PlaySquareOutlined style={{ fontSize: 64, color: '#e50914', marginBottom: 20 }} />
        <Title level={1}>Track Movies & TV Series</Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 600, margin: '0 auto 30px' }}>
          Discover new content, manage your watchlist, and track what you've watched. 
          Join now to start your personal collection.
        </Paragraph>
        <Space size="middle">
          <Link to="/signup">
            <Button type="primary" size="large" style={{ width: 150 }}>Get Started</Button>
          </Link>
          <Link to="/signin">
            <Button size="large" style={{ width: 150 }}>Sign In</Button>
          </Link>
        </Space>
      </div>
    </MainLayout>
  );
};

export default Landing;
