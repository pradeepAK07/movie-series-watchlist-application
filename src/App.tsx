import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { useAuthListener } from './hooks/useAuthListener';
import Watchlist from './pages/Watchlist/Watchlist';
import SearchPage from './pages/Search/Search';
import Landing from './pages/Landing/Landing';
import './styles/global.scss';

const App: React.FC = () => {
  useAuthListener();
  
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#e50914',
          colorBgBase: '#141414',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<div style={{ padding: 20 }}><h1>404 Not Found</h1></div>} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
