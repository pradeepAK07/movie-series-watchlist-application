import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, theme, Dropdown, Avatar } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuOutlined, UserOutlined, SearchOutlined, HomeOutlined, PlaySquareOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { logoutUser } from '../../store/slices/authSlice';
import './MainLayout.scss';

const { Header, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Home' },
    { key: '/search', icon: <SearchOutlined />, label: 'Search' },
    { key: '/watchlist', icon: <PlaySquareOutlined />, label: 'Watchlist' },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const userMenu = {
    items: [
      {
        key: 'logout',
        label: 'Sign Out',
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      }
    ]
  };

  return (
    <Layout className="main-layout">
      <Header className="header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>WatchList</div>
        
        {/* Desktop Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems.map(item => ({
            ...item,
            onClick: () => handleMenuClick(item.key)
          }))}
          className="desktop-menu"
        />

        <div className="header-actions">
          {user ? (
            <Dropdown menu={userMenu} placement="bottomRight">
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                 <Avatar icon={<UserOutlined />} src={user.photoURL} />
                 <span className="user-name">{user.displayName || 'User'}</span>
              </div>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <Button type="primary" icon={<UserOutlined />}>Sign In</Button>
            </Link>
          )}
          
          <Button 
            className="mobile-menu-btn" 
            type="text" 
            icon={<MenuOutlined />} 
            onClick={() => setMobileMenuOpen(true)} 
          />
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="mobile-menu-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems.map(item => ({
            ...item,
            onClick: () => handleMenuClick(item.key)
          }))}
        />
        {user ? (
           <Button type="primary" danger block icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginTop: 20 }}>
             Sign Out
           </Button>
        ) : (
           <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
             <Button type="primary" block icon={<UserOutlined />} style={{ marginTop: 20 }}>
               Sign In
             </Button>
           </Link>
        )}
      </Drawer>

      <Content className="site-layout-content" style={{ background: colorBgContainer }}>
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
