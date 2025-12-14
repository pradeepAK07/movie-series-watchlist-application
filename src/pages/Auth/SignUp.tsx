import React, { useEffect } from 'react';
import { Card, Button, Form, Input, Typography, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/slices/authSlice';
import MainLayout from '../../components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';

const { Title } = Typography;

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onFinish = (values: any) => {
    dispatch(registerUser({ email: values.email, password: values.password, name: values.name }));
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: 400, margin: '50px auto' }}>
        <Card>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>Sign Up</Title>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
              <Input.Password size="large" />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ marginBottom: 16 }}>
              Sign Up
            </Button>
            <div style={{ textAlign: 'center' }}>
              Already have an account? <Link to="/signin">Sign In</Link>
            </div>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SignUp;
