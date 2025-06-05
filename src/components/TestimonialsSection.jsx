import React, { useState } from 'react';
import { Card, Button, Typography, Rate, Avatar, Row, Col, Space, Statistic, Carousel, Tag, Modal, Form, Input, message } from 'antd';
import { 
  StarFilled, 
  StarOutlined, 
  UserOutlined, 
  LikeOutlined, 
  MessageOutlined,
  ShareAltOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

function TestimonialsSection() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Professional Photographer",
      text: "The image sharpening tool has revolutionized my workflow. The results are consistently impressive!",
      rating: 5,
      likes: 128,
      comments: 24,
      date: "2 days ago",
      verified: true,
      tags: ["Photography", "Professional"]
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Digital Artist",
      text: "I use this tool daily for my digital art. The quality of the sharpening is unmatched. The AI technology behind it is truly remarkable.",
      rating: 5,
      likes: 95,
      comments: 18,
      date: "1 week ago",
      verified: true,
      tags: ["Digital Art", "AI"]
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Content Creator",
      text: "Perfect for enhancing my social media content. The AI-powered sharpening is incredible. It saves me hours of manual editing!",
      rating: 4,
      likes: 76,
      comments: 12,
      date: "3 days ago",
      verified: false,
      tags: ["Social Media", "Content"]
    }
  ];

  const stats = [
    { title: "Total Users", value: "10K+" },
    { title: "Average Rating", value: "4.8" },
    { title: "Images Processed", value: "1M+" },
    { title: "Countries", value: "50+" }
  ];

  const handleSubmitReview = (values) => {
    console.log('Review submitted:', values);
    message.success('Thank you for your review!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title level={2} className="mb-4">
            What Our Users Say
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who have transformed their images with our AI-powered sharpening technology.
          </Paragraph>
          <Space>
            <Button 
              type="primary"
              size="large"
              icon={<StarFilled />}
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsModalVisible(true)}
            >
              Write a Review
            </Button>
            <Button 
              size="large"
              icon={<ShareAltOutlined />}
            >
              Share Your Experience
            </Button>
          </Space>
        </div>

        <Row gutter={[24, 24]} className="mb-12">
          {stats.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]}>
          {testimonials.map((testimonial) => (
            <Col xs={24} md={12} lg={8} key={testimonial.id}>
              <Card 
                className="h-full hover:shadow-lg transition-shadow"
                actions={[
                  <Space>
                    <LikeOutlined />
                    <Text>{testimonial.likes}</Text>
                  </Space>,
                  <Space>
                    <MessageOutlined />
                    <Text>{testimonial.comments}</Text>
                  </Space>,
                  <ShareAltOutlined />
                ]}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <Rate 
                      disabled 
                      defaultValue={testimonial.rating} 
                      className="text-yellow-400"
                    />
                    <Text type="secondary" className="text-sm">
                      {testimonial.date}
                    </Text>
                  </div>
                  
                  <Paragraph className="text-gray-600 mb-6 flex-grow">
                    {testimonial.text}
                  </Paragraph>

                  <Space className="mb-4" wrap>
                    {testimonial.tags.map((tag, index) => (
                      <Tag key={index} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </Space>

                  <div className="flex items-center">
                    <Avatar 
                      className="bg-blue-600 text-white"
                      size={40}
                    >
                      {testimonial.name[0]}
                    </Avatar>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <Title level={5} className="mb-0 mr-2">
                          {testimonial.name}
                        </Title>
                        {testimonial.verified && (
                          <CheckCircleOutlined className="text-blue-600" />
                        )}
                      </div>
                      <Paragraph className="text-gray-500 mb-0">
                        {testimonial.role}
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title="Write a Review"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitReview}
        >
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please rate our service!' }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Your Role"
          >
            <Input placeholder="e.g., Photographer, Designer, etc." />
          </Form.Item>

          <Form.Item
            name="review"
            label="Your Review"
            rules={[{ required: true, message: 'Please write your review!' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Share your experience with our service..."
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-700"
              block
            >
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}

export default TestimonialsSection; 