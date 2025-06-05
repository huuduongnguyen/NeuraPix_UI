import React, { useRef, useState, useEffect } from 'react';
import { Layout, ConfigProvider, theme, message } from 'antd';
import Header from './components/Header.jsx';
import HomePage from './components/HomePage.jsx';
import SharpenSection from './components/SharpenSection.jsx';
import BackgroundRemoveSection from './components/BackgroundRemoveSection.jsx';
import GenerateBackgroundSection from './components/GenerateBackgroundSection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import SignInPage from './components/SignInPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import SubscriptionPage from './components/SubscriptionPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import './styles/index.css';

const { Content } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState('signin'); // 'signin' or 'signup'
  const [subscriptionPage, setSubscriptionPage] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const sharpenRef = useRef(null);
  const backgroundRemoveRef = useRef(null);
  const generateBackgroundRef = useRef(null);

  const handleSectionClick = (section) => {
    let ref;
    switch (section) {
      case 'sharpen':
        ref = sharpenRef;
        break;
      case 'background-remove':
        ref = backgroundRemoveRef;
        break;
      case 'generate-background':
        ref = generateBackgroundRef;
        break;
      default:
        return;
    }
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goHome = () => {
    setLoggedIn(true);
    setAuthPage('signin');
    setSubscriptionPage(false);
    setProfilePage(false);
    message.success('Welcome back!');
  };

  const goSubscription = () => {
    setSubscriptionPage(true);
    setProfilePage(false);
  };

  const goProfile = () => {
    setProfilePage(true);
    setSubscriptionPage(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAuthPage('signin');
    setSubscriptionPage(false);
    setProfilePage(false);
    setUser({ name: '', email: '' });
    message.info('You have been logged out');
  };

  const renderContent = () => {
    if (!loggedIn) {
      if (authPage === 'signin') {
        return (
          <div className="min-h-screen bg-gray-50 transition-colors duration-300">
            <SignInPage 
              onLogin={(name) => { 
                setUser({ name, email: name }); 
                setLoggedIn(true);
                message.success('Welcome to NEURAPIX!');
              }}
              onRegister={() => setAuthPage('signup')}
              goHome={goHome} 
            />
          </div>
        );
      } else {
        return (
          <div className="min-h-screen bg-gray-50 transition-colors duration-300">
            <SignUpPage 
              onSignUp={({ name, email }) => { 
                setUser({ name, email }); 
                setLoggedIn(true);
                message.success('Account created successfully!');
              }}
              onLogin={() => setAuthPage('signin')}
              goHome={goHome} 
            />
          </div>
        );
      }
    }

    if (subscriptionPage) {
      return (
        <div className="min-h-screen bg-gray-50 transition-colors duration-300">
          <SubscriptionPage goHome={goHome} />
        </div>
      );
    }

    if (profilePage) {
      return (
        <div className="min-h-screen bg-gray-50 transition-colors duration-300">
          <ProfilePage 
            goHome={goHome} 
            goSubscription={goSubscription} 
            user={user} 
            onLogout={handleLogout} 
          />
        </div>
      );
    }

    return (
      <Layout className="min-h-screen bg-white transition-colors duration-300">
        <Header 
          goHome={goHome} 
          goSubscription={goSubscription} 
          goProfile={goProfile} 
          user={user}
        />
        <Content className="bg-transparent">
          <HomePage onSectionClick={handleSectionClick} />
          <div ref={sharpenRef}>
            <SharpenSection />
          </div>
          <div ref={backgroundRemoveRef}>
            <BackgroundRemoveSection />
          </div>
          <div ref={generateBackgroundRef}>
            <GenerateBackgroundSection />
          </div>
          <TestimonialsSection />
        </Content>
      </Layout>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      {renderContent()}
    </ConfigProvider>
  );
}

export default App; 