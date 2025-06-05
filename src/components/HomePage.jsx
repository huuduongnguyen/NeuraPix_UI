import React from 'react';
import { Layout, Card, Button, Typography, Row, Col, Space, Tag } from 'antd';
import { 
  StarOutlined, 
  ClockCircleOutlined, 
  ThunderboltOutlined,
  ScissorOutlined,
  PictureOutlined,
  ExperimentOutlined
} from '@ant-design/icons';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = ({ onSectionClick }) => {
  const cardData = [
    {
      title: "Background Remove",
      description: "Remove background from your images with AI-powered precision",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
      onClick: () => onSectionClick('background-remove'),
      tags: ['AI', 'Background Removal'],
      stats: {
        time: '2-3 seconds',
        accuracy: '99%'
      }
    },
    {
      title: "Sharpen Image",
      description: "Enhance image clarity and sharpness with advanced algorithms",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
      onClick: () => onSectionClick('sharpen'),
      tags: ['Enhancement', 'AI'],
      stats: {
        time: '1-2 seconds',
        accuracy: '98%'
      }
    },
    {
      title: "Generate Background",
      description: "Create stunning AI-generated backgrounds for your images",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
      onClick: () => onSectionClick('generate-background'),
      tags: ['AI', 'Background Generation'],
      stats: {
        time: '3-4 seconds',
        accuracy: '97%'
      }
    }
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Images with AI
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the power of artificial intelligence in image processing. Remove backgrounds, enhance clarity, and generate stunning backgrounds with just a few clicks.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} className="mb-12">
          {cardData.map((card, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                className="h-full transform transition-all duration-300 hover:scale-105"
                cover={
                  <div className="relative h-48 overflow-hidden">
                    <img
                      alt={card.title}
                      src={card.img}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                }
                actions={[
                  <Button 
                    type="primary" 
                    icon={<ThunderboltOutlined />}
                    onClick={card.onClick}
                  >
                    Try Now
                  </Button>
                ]}
              >
                <Card.Meta
                  title={
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{card.title}</span>
                      <Space>
                        <Tag icon={<ClockCircleOutlined />} color="blue">
                          {card.stats.time}
                        </Tag>
                        <Tag icon={<StarOutlined />} color="green">
                          {card.stats.accuracy}
                        </Tag>
                      </Space>
                    </div>
                  }
                  description={
                    <div>
                      <Paragraph className="text-gray-600 mb-4">
                        {card.description}
                      </Paragraph>
                      <Space wrap>
                        {card.tags.map((tag, i) => (
                          <Tag key={i} color="blue">{tag}</Tag>
                        ))}
                      </Space>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mb-12">
          <Title level={2} className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose NEURAPIX?
          </Title>
          <Row gutter={[24, 24]} className="mt-8">
            <Col xs={24} sm={8}>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <ScissorOutlined className="text-4xl text-blue-500 mb-4" />
                <Title level={4}>Precise Background Removal</Title>
                <Paragraph className="text-gray-600">
                  Remove backgrounds with pixel-perfect accuracy using advanced AI algorithms
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <PictureOutlined className="text-4xl text-blue-500 mb-4" />
                <Title level={4}>Image Enhancement</Title>
                <Paragraph className="text-gray-600">
                  Sharpen and enhance your images with state-of-the-art processing
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <ExperimentOutlined className="text-4xl text-blue-500 mb-4" />
                <Title level={4}>AI Background Generation</Title>
                <Paragraph className="text-gray-600">
                  Create stunning AI-generated backgrounds for your images
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer className="text-center bg-white">
        <Paragraph className="text-gray-600">
          © 2024 NEURAPIX. All rights reserved.
        </Paragraph>
      </Footer>
    </Layout>
  );
};

export default HomePage; 