import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Divider, Layout, Row, Col, Card } from 'antd';
import { GoogleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Link } = Typography;
const { Footer } = Layout;

function SignInPage({ onLogin, onRegister, goHome }) {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values) => {
    // Simulate login success
    onLogin();
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-2xl font-bold text-blue-600 py-4 cursor-pointer hover:text-blue-700 transition-colors"
            onClick={goHome}
          >
            NEURAPIX
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Row gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <div className="h-full flex flex-col justify-center">
                <div className="text-sm font-semibold text-blue-600 mb-2">WELCOME TO</div>
                <Title level={1} className="text-5xl font-bold mb-6">NEURAPIX</Title>
                <Paragraph className="text-lg text-gray-600 mb-8">
                  NEURAPIX is an <b>AI-powered</b> photo editing platform that enhances images instantly. With advanced algorithms, it great details, colors, removes spots, sharpens, and restores old photos effortlessly. Perfect for both professionals and casual users—<b>no Photoshop skills needed!</b>
                </Paragraph>
                <div className="text-gray-500 mt-auto">© 2025 NEURAPIX. All rights reserved.</div>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <Card className="shadow-lg">
                <Button 
                  icon={<GoogleOutlined />} 
                  size="large" 
                  block 
                  className="mb-6"
                >
                  Sign in with Google
                </Button>

                <Divider>or</Divider>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  requiredMark={false}
                >
                  <Title level={3} className="mb-6">Log In To Your Account</Title>

                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input 
                      size="large" 
                      placeholder="Email address" 
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Password"
                      iconRender={(visible) => 
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <div className="flex justify-between items-center mb-6">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Link>Forgot Password?</Link>
                  </div>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size="large" 
                      block
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Login
                    </Button>
                  </Form.Item>

                  <div className="text-center">
                    Don't have an Account?{' '}
                    <Link onClick={onRegister}>Register here</Link>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </main>

      <Footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Row gutter={[48, 48]}>
            <Col xs={24} md={8}>
              <Title level={4} className="mb-4">NEURAPIX</Title>
              <Paragraph className="text-gray-600 mb-4">
                Subscribe to our newsletter for the latest updates on features and releases.
              </Paragraph>
              <Form layout="inline" className="mb-4">
                <Form.Item name="email" className="flex-grow mb-0">
                  <Input placeholder="Your email here" />
                </Form.Item>
                <Form.Item className="mb-0">
                  <Button type="primary">Join</Button>
                </Form.Item>
              </Form>
              <Paragraph className="text-sm text-gray-500">
                By subscribing, you consent to our Privacy Policy and receive updates.
              </Paragraph>
            </Col>

            <Col xs={24} md={4}>
              <Title level={5} className="mb-4">Quick Links</Title>
              <ul className="space-y-2">
                <li><Link>Home Page</Link></li>
                <li><Link>About Us</Link></li>
                <li><Link>Contact Us</Link></li>
                <li><Link>Blog Posts</Link></li>
                <li><Link>Support Center</Link></li>
              </ul>
            </Col>

            <Col xs={24} md={4}>
              <Title level={5} className="mb-4">Resources</Title>
              <ul className="space-y-2">
                <li><Link>FAQs</Link></li>
                <li><Link>Case Studies</Link></li>
                <li><Link>Webinars</Link></li>
                <li><Link>Guides</Link></li>
                <li><Link>E-books</Link></li>
              </ul>
            </Col>

            <Col xs={24} md={4}>
              <Title level={5} className="mb-4">Connect With Us</Title>
              <ul className="space-y-2">
                <li><Link>Facebook</Link></li>
                <li><Link>Instagram</Link></li>
                <li><Link>X</Link></li>
                <li><Link>LinkedIn</Link></li>
                <li><Link>YouTube</Link></li>
              </ul>
            </Col>
          </Row>

          <Divider />

          <div className="text-center text-gray-500">
            <Link className="mx-2">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link className="mx-2">Terms of Service</Link>
            <span className="mx-2">|</span>
            <Link className="mx-2">Cookie Settings</Link>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default SignInPage; 