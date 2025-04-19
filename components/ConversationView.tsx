import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatMessage from './ChatMessage';
import { ChatConversation } from './types';

interface Props {
  conversation: ChatConversation;
  onBack: () => void;
}

const ConversationView: React.FC<Props> = ({ conversation, onBack }) => {
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (message.trim() === '') return;
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-neutral-900"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View className="bg-neutral-800 p-4 flex-row items-center border-b border-neutral-700">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image source={conversation.agentAvatar} className="w-10 h-10 rounded-full" />

        <View className="ml-3 flex-1">
          <Text className="text-white font-bold">{conversation.agentName}</Text>
          <Text className="text-neutral-400 text-xs">{conversation.propertyTitle}</Text>
        </View>

        <TouchableOpacity className="p-2">
          <Ionicons name="call-outline" size={22} color="white" />
        </TouchableOpacity>

        <TouchableOpacity className="p-2">
          <Ionicons name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 20 }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {conversation.messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isLastMessage={index === conversation.messages.length - 1}
          />
        ))}
      </ScrollView>

      {/* Property Card */}
      <TouchableOpacity className="mx-4 mb-4 bg-neutral-800 rounded-xl overflow-hidden">
        <View className="flex-row">
          <Image
            source={conversation.propertyImage}
            className="w-20 h-20"
            resizeMode="cover"
          />
          <View className="p-3 flex-1">
            <Text className="text-white font-bold">{conversation.propertyTitle}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={14} color="#9300b8" />
              <Text className="text-neutral-400 text-xs ml-1">Dubai Marina</Text>
            </View>
            <View className="mt-2">
              <Text className="text-purple-500 font-bold">View Details</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Input */}
      <View className="flex-row items-center p-2 bg-neutral-800">
        <TouchableOpacity className="p-2 mr-1">
          <Ionicons name="add-circle-outline" size={24} color="#9300b8" />
        </TouchableOpacity>

        <View className="flex-1 bg-neutral-700 rounded-full px-4 py-2 flex-row items-center">
          <TextInput
            className="flex-1 text-white"
            placeholder="Type a message..."
            placeholderTextColor="gray"
            value={message}
            onChangeText={setMessage}
          />
          {message.trim() === '' && (
            <TouchableOpacity className="p-1">
              <Ionicons name="camera-outline" size={24} color="#9300b8" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          className={`p-2 ml-1 ${message.trim() === '' ? 'opacity-50' : ''}`}
          onPress={handleSend}
          disabled={message.trim() === ''}
        >
          <Ionicons
            name={message.trim() === '' ? 'mic-outline' : 'send'}
            size={24}
            color="#9300b8"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConversationView;