import React, { useState } from 'react';
import { Layout, Typography, Form, Input, Button, Card, Row, Col, Upload, Avatar, Divider } from 'antd';
import { UserOutlined, UploadOutlined, LogoutOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

function ProfilePage({ goHome, goSubscription, user, onLogout }) {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({
    name: user.name || '',
    displayName: '',
    email: user.name || '',
    phone: '',
    region: '',
    description: '',
    image: null,
  });

  const handleChange = (changedValues) => {
    setProfile((prev) => ({ ...prev, ...changedValues }));
  };

  const handleImage = (info) => {
    if (info.file.status === 'done') {
      setProfile((prev) => ({ ...prev, image: URL.createObjectURL(info.file.originFileObj) }));
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
              onClick={goHome}
            >
              NEURAPIX
            </div>
            <div className="text-gray-600">{profile.name || 'User Profile'}</div>
          </div>
        </div>
      </Header>

      <Content className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card className="shadow-lg">
                <Title level={2} className="mb-8">Profile</Title>
                
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-4">
                    {profile.image ? (
                      <Avatar 
                        src={profile.image} 
                        size={120}
                        className="border-4 border-blue-500"
                      />
                    ) : (
                      <Avatar 
                        icon={<UserOutlined />} 
                        size={120}
                        className="border-4 border-blue-500"
                      />
                    )}
                    <Upload
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={handleImage}
                      className="absolute bottom-0 right-0"
                    >
                      <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<UploadOutlined />}
                        className="bg-blue-500 hover:bg-blue-600"
                      />
                    </Upload>
                  </div>
                  <Text className="text-gray-500">Upload profile picture</Text>
                </div>

                <Form
                  form={form}
                  layout="vertical"
                  initialValues={profile}
                  onValuesChange={handleChange}
                >
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Name" />
                  </Form.Item>

                  <Form.Item
                    name="displayName"
                    label="Display Name"
                  >
                    <Input prefix={<UserOutlined />} placeholder="Display Name" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Phone number" />
                  </Form.Item>

                  <Form.Item
                    name="region"
                    label="Region"
                  >
                    <Input prefix={<GlobalOutlined />} placeholder="Region" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Description"
                  >
                    <TextArea 
                      placeholder="Type your description" 
                      rows={4}
                      className="resize-none"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      className="bg-blue-500 hover:bg-blue-600 mr-4"
                    >
                      Save Changes
                    </Button>
                    <Button 
                      icon={<LogoutOutlined />}
                      onClick={onLogout}
                    >
                      Log Out
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card className="shadow-lg mb-6">
                <Title level={2} className="mb-4">Subscription</Title>
                <div className="space-y-4">
                  <div>
                    <Text strong>Basic Plan</Text>
                    <Text className="text-gray-500"> | $0/mo with 100 monthly credits</Text>
                  </div>
                  <div className="text-2xl font-bold">$0/month <span className="text-blue-500">• 100</span></div>
                  <Text className="text-gray-500">Reset to 100 credits next month</Text>
                  <Button 
                    type="primary" 
                    block
                    onClick={goSubscription}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    UPGRADE
                  </Button>
                </div>
              </Card>

              <Card className="shadow-lg">
                <Title level={2} className="mb-4">Transaction History</Title>
                <div className="text-center text-gray-500 py-8">
                  No recent transactions.
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500">
            © 2025 NEURAPIX. All rights reserved.
          </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default ProfilePage; 