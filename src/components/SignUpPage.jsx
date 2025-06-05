import React from 'react';
import { Form, Input, Button, Typography, Divider, Layout, Row, Col, Card, Alert } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Link } = Typography;
const { Footer } = Layout;

function SignUpPage({ onSignUp, onLogin, goHome }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (values.password !== values.confirm) {
      form.setFields([
        {
          name: 'confirm',
          errors: ['Passwords do not match'],
        },
      ]);
      return;
    }
    onSignUp({ name: values.name, email: values.email });
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
                  Sign up with Google
                </Button>

                <Divider>or</Divider>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  requiredMark={false}
                >
                  <Title level={3} className="mb-6">Create Your Account</Title>

                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input 
                      size="large" 
                      placeholder="Name" 
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input 
                      size="large" 
                      placeholder="Email address" 
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter Password Again"
                    />
                  </Form.Item>

                  <Paragraph className="text-gray-500 mb-6">
                    By continuing, you agree to our <Link>Terms of Use</Link> and <Link>Privacy Policy</Link>.
                  </Paragraph>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size="large" 
                      block
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Sign Up
                    </Button>
                  </Form.Item>

                  <div className="text-center">
                    Already a member?{' '}
                    <Link onClick={onLogin}>Login here</Link>
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

export default SignUpPage; 