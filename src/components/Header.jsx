import React, { useState } from 'react';
import { Layout, Button, Avatar, Space, Menu, Dropdown, Badge, Tooltip } from 'antd';
import { 
  UserOutlined, 
  BellOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  QuestionCircleOutlined,
  CreditCardOutlined,
  TeamOutlined,
  BookOutlined
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;

function Header({ goHome, goSubscription, goProfile, user }) {
  const [notifications, setNotifications] = useState(3);

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: goProfile,
    },
    {
      key: 'subscription',
      icon: <CreditCardOutlined />,
      label: 'Subscription',
      onClick: goSubscription,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: 'Help & Support',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const resourcesMenuItems = [
    {
      key: 'documentation',
      icon: <BookOutlined />,
      label: 'Documentation',
    },
    {
      key: 'community',
      icon: <TeamOutlined />,
      label: 'Community',
    },
    {
      key: 'tutorials',
      icon: <BookOutlined />,
      label: 'Tutorials',
    },
  ];

  return (
    <AntHeader className="bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center space-x-8">
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={goHome}
        >
          <img 
            src="/LOGO-01.png" 
            alt="NeuraPix Logo" 
            className="h-32 w-auto"
          />
        </div>
        <Menu 
          mode="horizontal" 
          className="border-0 bg-transparent"
          items={[
            {
              key: 'features',
              label: 'Features',
            },
            {
              key: 'pricing',
              label: 'Pricing',
              onClick: goSubscription,
            },
            {
              key: 'resources',
              label: 'Resources',
              children: resourcesMenuItems,
            },
          ]}
        />
      </div>

      <Space size="middle">
        <Button 
          type="primary"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={goSubscription}
        >
          Upgrade
        </Button>

        <Tooltip title="Notifications">
          <Badge count={notifications} size="small">
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              className="text-gray-600 hover:text-blue-600"
            />
          </Badge>
        </Tooltip>

        <Dropdown
          menu={{ items: userMenuItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <Avatar 
              icon={<UserOutlined />} 
              className="bg-blue-600"
            />
            <span className="text-gray-700">
              {user && user.name ? user.name : 'User Profile'}
            </span>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
}

export default Header; 