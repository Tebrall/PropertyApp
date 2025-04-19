import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatListItem from './ChatListItem';
import ConversationView from './ConversationView';
import NewChatView from './NewChatView';
import { ChatConversation } from './types';

// MOCK DATA
const MOCK_CONVERSATIONS: ChatConversation[] = [
  {
    id: '1',
    propertyId: '101',
    propertyTitle: 'Luxury Penthouse',
    propertyImage: require('../assets/properties/property1.jpg'),
    agentName: 'Sarah Johnson',
    agentAvatar: require('../assets/properties/property1.jpg'),
    isVerified: true,
    lastActive: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        text: 'Hello, I saw your listing for the Luxury Penthouse and I\'m very interested.',
        sender: 'user',
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        read: true,
      },
      {
        id: 'm2',
        text: 'Hi there! Thank you for your interest. Would you like to schedule a viewing?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 55 * 60 * 1000), // 55 minutes ago
        read: true,
      },
      {
        id: 'm3',
        text: 'Yes, I would. Is it available this weekend?',
        sender: 'user',
        timestamp: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
        read: true,
      },
      {
        id: 'm4',
        text: 'Absolutely! We have slots available on Saturday at 10 AM or 2 PM, and Sunday at 11 AM. Which would work best for you?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
      },
      {
        id: 'm5',
        text: 'I can also provide more information about the neighborhood if you\'re interested.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
        read: false,
      },
    ],
  },
  {
    id: '2',
    propertyId: '102',
    propertyTitle: 'Modern Villa',
    propertyImage: require('../assets/properties/property1.jpg'),
    agentName: 'PropertyHelper AI',
    agentAvatar: require('../assets/properties/property1.jpg'),
    isVerified: true,
    lastActive: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        text: 'I\'m looking for a villa with at least 4 bedrooms in Palm Jumeirah.',
        sender: 'user',
        timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
        read: true,
      },
      {
        id: 'm2',
        text: 'I found 5 properties matching your criteria. Would you like me to show you the top listings?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
        read: true,
      },
      {
        id: 'm3',
        text: 'Yes please, and what\'s the price range?',
        sender: 'user',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        read: true,
      },
      {
        id: 'm4',
        text: 'The available villas range from AED 8.5M to AED 15M. The most popular one is a 5-bedroom villa with private beach access for AED 12.5M. Would you like more details about this property?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
      },
    ],
  },
  {
    id: '3',
    propertyId: '103',
    propertyTitle: 'Downtown Apartment',
    propertyImage: require('../assets/properties/property1.jpg'),
    agentName: 'Michael Chang',
    agentAvatar: require('../assets/properties/property1.jpg'),
    isVerified: false,
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        text: 'Hi, is the Downtown Apartment still available?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        read: true,
      },
      {
        id: 'm2',
        text: 'Hello! Yes, it\'s still available. Are you interested in viewing it?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 3 days ago + 30 minutes
        read: true,
      },
      {
        id: 'm3',
        text: 'I\'d like to know more about the building amenities first.',
        sender: 'user',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: true,
      },
      {
        id: 'm4',
        text: 'Of course! The building features a rooftop pool, fully equipped gym, 24/7 security, and underground parking. There\'s also a children\'s play area and a communal garden terrace.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000), // 2 days ago + 15 minutes
        read: true,
      },
    ],
  },
];


const ChatScreen: React.FC = () => {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const insets = useSafeAreaInsets();

  const handleConversationPress = (conversationId: string) => {
    setActiveConversation(conversationId);
    const updatedConversations = conversations.map((conv) =>
      conv.id === conversationId
        ? {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map((msg) => ({ ...msg, read: true })),
        }
        : conv
    );
    setConversations(updatedConversations);
  };

  const handleBack = () => {
    setActiveConversation(null);
    setShowNewChat(false);
  };

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const totalUnread = conversations.reduce(
    (total, conv) => total + conv.unreadCount,
    0
  );

  if (activeConversation) {
    const conversation = conversations.find((c) => c.id === activeConversation);
    if (conversation) {
      return <ConversationView conversation={conversation} onBack={handleBack} />;
    }
  }

  if (showNewChat) {
    return <NewChatView onBack={handleBack} />;
  }

  return (
    <View className="flex-1 bg-neutral-900" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View className="p-4 border-b border-neutral-800">
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-bold text-2xl">Chats</Text>
          <View className="flex-row">
            <TouchableOpacity className="p-2 mr-2">
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2" onPress={handleNewChat}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View className="flex-row py-3 px-4 border-b border-neutral-800">
        <TouchableOpacity className="bg-purple-600 rounded-full px-4 py-2 mr-3 flex-row items-center">
          <Text className="text-white font-medium">All</Text>
          {totalUnread > 0 && (
            <View className="bg-white rounded-full w-5 h-5 items-center justify-center ml-2">
              <Text className="text-purple-600 font-bold text-xs">{totalUnread}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity className="bg-neutral-800 rounded-full px-4 py-2 mr-3">
          <Text className="text-neutral-400">Agents</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-neutral-800 rounded-full px-4 py-2">
          <Text className="text-neutral-400">Properties</Text>
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              conversation={item}
              onPress={handleConversationPress}
              isActive={activeConversation === item.id}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <View className="bg-neutral-800/50 w-20 h-20 rounded-full items-center justify-center mb-4">
            <Ionicons name="chatbubble-ellipses-outline" size={40} color="#9300b8" />
          </View>
          <Text className="text-white text-xl font-bold mb-2">No conversations yet</Text>
          <Text className="text-neutral-400 text-center mb-6 px-10">
            Start a new conversation with our AI assistant or property agents
          </Text>
          <TouchableOpacity
            className="bg-purple-600 px-6 py-3 rounded-full"
            onPress={handleNewChat}
          >
            <Text className="text-white font-bold">Start New Chat</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Floating Action */}
      {conversations.length > 0 && (
        <TouchableOpacity
          className="absolute bottom-20 right-6 bg-purple-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
          style={{
            shadowColor: '#9300b8',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={handleNewChat}
        >
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatScreen;