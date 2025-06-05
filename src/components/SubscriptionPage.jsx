import React, { useState } from 'react';
import { Layout, Typography, Tabs, Card, Button, Collapse, Row, Col, Modal } from 'antd';
import { CheckOutlined, QuestionCircleOutlined, MailOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const plans = [
  {
    name: 'Free',
    price: 'FREE',
    highlight: true,
    features: ['Text To Image'],
    photoSize: '1024 px',
    numPhotos: '3 Photos/Day',
    watermark: false,
    pay: null,
    sub: null,
  },
  {
    name: 'Pay-Per Use',
    price: '5,000 VND/Credit',
    highlight: false,
    features: ['Text To Image', 'Edit In Personal Style'],
    photoSize: '1500 px',
    numPhotos: 'Charge Per Credit or Feature Used',
    watermark: true,
    pay: true,
    sub: null,
  },
  {
    name: 'Subscriptions',
    price: ['59,000 VND/Month', '649,000 VND/Year'],
    highlight: false,
    features: ['Text To Image', 'Edit In Personal Style', 'Photo Sharpen', 'AI Prompt Guidance'],
    photoSize: '1920 px',
    numPhotos: 'Unlimited',
    watermark: true,
    pay: null,
    sub: true,
  },
];

const faqs = [
  {
    q: 'What are the plans?',
    a: 'We offer three pricing plans: Free, Pro, and Business. Each plan is designed to cater to different user needs, ensuring you find the perfect fit. Explore the features of each plan to see which suits you best.'
  },
  {
    q: 'Is there a trial?',
    a: 'Yes, we offer a free trial for our Pro and Business plans. This allows you to explore all features without commitment. You can cancel anytime during the trial period.'
  },
  {
    q: 'What payment methods?',
    a: 'We accept various payment methods including credit cards, PayPal, and bank transfers. All transactions are secure and encrypted for your safety. Choose the method that works best for you.'
  },
  {
    q: 'Can I change plans?',
    a: 'Absolutely! You can upgrade or downgrade your plan at any time. Simply go to your account settings to make the change. Your billing will adjust accordingly.'
  },
  {
    q: 'What if I cancel?',
    a: 'If you cancel your subscription, you will retain access until the end of your billing cycle. We also offer a money back guarantee within the first 30 days. Your satisfaction is our priority.'
  },
];

const creatorPlans = [
  {
    name: 'Basic Plan',
    price: '99.000VND/mo\n990.000 VND/year',
    features: [
      'Access to essential AI tool',
      'Limited storage (5GB)',
      '50 image edits per month',
    ],
  },
  {
    name: 'Pro Plan',
    price: '199.000VND/mo\n1.990.000 VND/year',
    features: [
      'Everything in Basic',
      'Unlimited storage',
      '200 image edits per month',
      'Priority customer support',
    ],
  },
  {
    name: 'Elite Plan',
    price: '399.000VND/mo\n3.990.000VND/year',
    features: [
      'Everything in Pro',
      'Unlimited image edits',
      'Early access to new AI tools',
      'Exclusive AI generated assets',
      'Dedicated account manager',
    ],
  },
];

function SubscriptionPage({ goHome }) {
  const [activeTab, setActiveTab] = useState('individual');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Placeholder QR code image URL
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=neura-payment';

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const items = [
    {
      key: 'individual',
      label: 'INDIVIDUAL USERS',
      children: (
        <div className="mt-8">
          <Card className="shadow-lg">
            <Title level={4} className="mb-4">Individual Users</Title>
            <Paragraph className="text-gray-600 mb-8">
              <Text strong>One-Time Purchase:</Text> Buy extra image credits (129,000 VND for 100 additional edits)<br/>
              <Text strong>Referral Discounts:</Text> Get 20% off for 3 months when referring a friend<br/>
              <Text strong>Annual Subscription Discount:</Text> Save 2 months free when paying annually
            </Paragraph>

            <Row gutter={[24, 24]}>
              {plans.map((plan) => (
                <Col xs={24} md={8} key={plan.name}>
                  <Card 
                    className={`h-full ${plan.highlight ? 'border-blue-500' : ''}`}
                    bordered
                  >
                    <Title level={3} className="mb-4">{plan.name}</Title>
                    <div className="mb-6">
                      {Array.isArray(plan.price) ? (
                        plan.price.map((price, i) => (
                          <Button 
                            key={i}
                            type={i === 0 ? 'primary' : 'default'}
                            block
                            className="mb-2"
                            onClick={() => plan.sub || plan.pay ? handlePlanClick(plan) : null}
                            disabled={!(plan.sub || plan.pay)}
                          >
                            {price}
                          </Button>
                        ))
                      ) : (
                        <Button 
                          type={plan.highlight ? 'primary' : 'default'}
                          block
                          onClick={() => plan.sub || plan.pay ? handlePlanClick(plan) : null}
                          disabled={!(plan.sub || plan.pay)}
                        >
                          {plan.price}
                        </Button>
                      )}
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <CheckOutlined className="text-green-500 mr-2" />
                        Photo Size: {plan.photoSize}
                      </li>
                      <li className="flex items-center">
                        <CheckOutlined className="text-green-500 mr-2" />
                        {plan.numPhotos}
                      </li>
                      <li className="flex items-center">
                        <CheckOutlined className="text-green-500 mr-2" />
                        {plan.watermark ? 'No Watermark' : 'With Watermark'}
                      </li>
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckOutlined className="text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      ),
    },
    {
      key: 'creator',
      label: 'CONTENT CREATORS',
      children: (
        <div className="mt-8">
          <Card className="shadow-lg">
            <Title level={4} className="mb-4">Content Creators</Title>
            <Paragraph className="text-gray-600 mb-8">
              <Text strong>One-Time Purchase:</Text> Buy extra image credits (129,000 VND for 100 additional edits)<br/>
              <Text strong>Referral Discounts:</Text> Get 20% off for 3 months when referring a friend<br/>
              <Text strong>Annual Subscription Discount:</Text> Save 2 months free when paying annually
            </Paragraph>

            <Row gutter={[24, 24]}>
              {creatorPlans.map((plan) => (
                <Col xs={24} md={8} key={plan.name}>
                  <Card className="h-full">
                    <Title level={3} className="mb-4">{plan.name}</Title>
                    <div className="mb-6">
                      {plan.price.split('\n').map((price, i) => (
                        <Button 
                          key={i}
                          type={i === 0 ? 'primary' : 'default'}
                          block
                          className="mb-2"
                          onClick={() => handlePlanClick(plan)}
                        >
                          {price}
                        </Button>
                      ))}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckOutlined className="text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button type="primary" block onClick={() => handlePlanClick(plan)}>
                      Get started
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      ),
    },
  ];

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
            <div className="text-gray-600">User Profile</div>
          </div>
        </div>
      </Header>

      <Content className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Title level={1} className="mb-4">Perfect Plan Selection</Title>
            <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find a plan that fits your needs and experience the best in AI-powered photo editing. Our tailored options ensure you get the most value for your investment.
            </Paragraph>
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={items}
            className="bg-white rounded-lg shadow-lg p-6"
          />

          <Modal
            title="Scan QR Code to Pay"
            open={showPaymentModal}
            onCancel={() => setShowPaymentModal(false)}
            footer={null}
            centered
          >
            <div style={{ textAlign: 'center' }}>
              <img src={qrCodeUrl} alt="QR Code" style={{ width: 200, height: 200, marginBottom: 16 }} />
              <Paragraph>
                Please scan this QR code with your banking app to complete the payment for <b>{selectedPlan?.name}</b>.<br/>
                After payment, your subscription will be activated automatically.
              </Paragraph>
            </div>
          </Modal>

          <section className="mt-16">
            <div className="text-center mb-8">
              <Title level={2} className="mb-4">FAQs</Title>
              <Paragraph className="text-gray-600">
                Here are some common questions about our pricing and subscription options.
              </Paragraph>
            </div>

            <Collapse className="bg-white rounded-lg shadow-lg">
              {faqs.map((faq, i) => (
                <Panel 
                  header={faq.q} 
                  key={i}
                  extra={<QuestionCircleOutlined />}
                >
                  <Paragraph>{faq.a}</Paragraph>
                </Panel>
              ))}
            </Collapse>
          </section>

          <section className="mt-16 text-center">
            <Title level={3} className="mb-4">Still have questions?</Title>
            <Paragraph className="text-gray-600 mb-6">We're here to help!</Paragraph>
            <Button 
              type="primary" 
              size="large"
              icon={<MailOutlined />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Contact
            </Button>
          </section>
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

export default SubscriptionPage; 