import React, { useEffect } from 'react';
import { Card, Button, Form, Input, Typography, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../store/slices/authSlice';
import MainLayout from '../../components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';

const { Title } = Typography;

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onFinish = async (values: any) => {
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: 400, margin: '50px auto' }}>
        <Card>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>Sign In</Title>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password size="large" />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ marginBottom: 16 }}>
              Sign In
            </Button>
            <div style={{ textAlign: 'center' }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SignIn;
