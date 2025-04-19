import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatMessage as ChatMessageType } from './types';

interface Props {
  message: ChatMessageType;
  isLastMessage: boolean;
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

const ChatMessage: React.FC<Props> = ({ message, isLastMessage }) => {
  const isUser = message.sender === 'user';
  const isAI = message.sender === 'ai';

  return (
    <View className={`mb-3 max-w-[80%] ${isUser ? 'self-end' : 'self-start'}`}>
      <View
        className={`p-3 rounded-2xl ${isUser
          ? 'bg-purple-600 rounded-tr-none'
          : isAI
            ? 'bg-neutral-700 rounded-tl-none'
            : 'bg-neutral-800 rounded-tl-none'
          }`}
      >
        <Text className="text-white text-base">{message.text}</Text>
      </View>

      <View className={`flex-row items-center mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
        <Text className="text-neutral-400 text-xs">
          {formatTime(message.timestamp)}
        </Text>

        {isUser && isLastMessage && (
          <View className="ml-2">
            {message.read ? (
              <Ionicons name="checkmark-done" size={14} color="#9300b8" />
            ) : (
              <Ionicons name="checkmark" size={14} color="gray" />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatMessage;