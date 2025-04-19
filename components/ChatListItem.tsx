import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatConversation } from './types'; // Make sure to define shared types

interface Props {
  conversation: ChatConversation;
  onPress: (conversationId: string) => void;
  isActive: boolean;
}

const formatTime = (date: Date) => {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

const ChatListItem: React.FC<Props> = ({ conversation, onPress, isActive }) => {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        className={`p-4 border-b border-neutral-800 ${isActive ? 'bg-neutral-800' : ''}`}
        onPress={() => onPress(conversation.id)}
        activeOpacity={0.7}
      >
        <View className="flex-row">
          {/* Avatar */}
          <View className="relative">
            <Image
              source={conversation.agentAvatar}
              className="w-16 h-16 rounded-full"
            />
            {conversation.isVerified && (
              <View className="absolute bottom-0 right-0 bg-purple-600 rounded-full w-5 h-5 items-center justify-center border border-neutral-900">
                <Ionicons name="checkmark" size={12} color="white" />
              </View>
            )}
          </View>

          {/* Info */}
          <View className="flex-1 ml-3 justify-center">
            <View className="flex-row justify-between items-center">
              <Text className="text-white font-bold text-base">{conversation.agentName}</Text>
              <Text className="text-neutral-400 text-xs">{formatTime(conversation.lastActive)}</Text>
            </View>

            <View className="mt-1">
              <Text className="text-neutral-300 text-sm font-medium">{conversation.propertyTitle}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-1">
              <Text
                className={`${conversation.unreadCount > 0 ? 'text-white' : 'text-neutral-400'} text-sm`}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ width: '85%' }}
              >
                {lastMessage?.text}
              </Text>

              {conversation.unreadCount > 0 && (
                <View className="bg-purple-600 rounded-full min-w-6 h-6 items-center justify-center px-1">
                  <Text className="text-white text-xs font-bold">{conversation.unreadCount}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Thumbnail */}
        <View className="absolute right-4 top-5">
          <Image
            source={conversation.propertyImage}
            className="w-12 h-12 rounded-lg opacity-70"
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ChatListItem;