import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavigationBar from './components/NavigationBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import PropsScreen from './components/PropsScreen'; // Import the new PropsScreen
import './global.css';



export default function App() {
  const [activeTab, setActiveTab] = useState<'props' | 'profile' | 'chat'>('props');

  // Handle tab changes
  const handleTabChange = (tab: 'props' | 'profile' | 'chat') => {
    setActiveTab(tab);
  };

  // Render the current tab content
  const renderContent = () => {
    switch (activeTab) {
      case 'props':
        return <PropsScreen />; // Use the new PropsScreen component
      case 'profile':
        return <ProfileScreen />;
      case 'chat':
        return <ChatScreen />;
      default:
        return <PropsScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />

      {/* Main content area */}
      <View className="flex-1 relative">
        {renderContent()}

        {/* Navigation Bar positioned at the bottom */}
        <NavigationBar
          activeTab={activeTab}
          onPropsPress={() => handleTabChange('props')}
          onProfilePress={() => handleTabChange('profile')}
          onChatPress={() => handleTabChange('chat')}
        />
      </View>
    </SafeAreaProvider>
  );
}