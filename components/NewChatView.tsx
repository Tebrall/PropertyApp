import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onBack: () => void;
}

const NewChatView: React.FC<Props> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const insets = useSafeAreaInsets();

  const suggestedQueries = [
    "Find me a 2 bedroom apartment in Downtown Dubai",
    "What are the best areas for families in Dubai?",
    "Show me villas with a private pool",
    "What documents do I need to rent in Dubai?",
    "Compare Marina vs Downtown for investment",
  ];

  return (
    <View className="flex-1 bg-neutral-900" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="bg-neutral-800 p-4 flex-row items-center border-b border-neutral-700">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-row items-center flex-1">
          <View className="bg-purple-600 w-10 h-10 rounded-full items-center justify-center mr-3">
            <Ionicons name="sparkles" size={20} color="white" />
          </View>
          <Text className="text-white font-bold text-lg">PropertyHelper AI</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4">
        {/* Welcome Card */}
        <View className="bg-neutral-800 rounded-2xl p-5 mb-6">
          <View className="flex-row items-center mb-3">
            <View className="bg-purple-600 w-10 h-10 rounded-full items-center justify-center mr-3">
              <Ionicons name="sparkles" size={20} color="white" />
            </View>
            <Text className="text-white font-bold text-lg">AI Property Assistant</Text>
          </View>

          <Text className="text-white text-base mb-3">
            Hello! I'm your PropertyHelper AI assistant. I can help you search for properties,
            answer questions about Dubai real estate, and guide you through the buying or
            renting process. What would you like to know?
          </Text>

          <View className="bg-neutral-700 rounded-lg p-3">
            <Text className="text-purple-300 text-sm mb-2 font-medium">I can help with:</Text>
            <View className="ml-2">
              <Text className="text-white text-sm mb-1">• Finding properties that match your criteria</Text>
              <Text className="text-white text-sm mb-1">• Explaining Dubai neighborhoods and areas</Text>
              <Text className="text-white text-sm mb-1">• Providing market insights and price trends</Text>
              <Text className="text-white text-sm mb-1">• Explaining legal procedures and requirements</Text>
              <Text className="text-white text-sm">• Calculating mortgage payments and costs</Text>
            </View>
          </View>
        </View>

        {/* Suggestions */}
        <Text className="text-white font-bold text-lg mb-3">Try asking</Text>

        {suggestedQueries.map((q, index) => (
          <TouchableOpacity
            key={index}
            className="bg-neutral-800 rounded-xl p-4 mb-3 flex-row items-center"
            onPress={() => setQuery(q)}
          >
            <View className="bg-purple-600/30 w-8 h-8 rounded-full items-center justify-center mr-3">
              <Ionicons name="chatbubble-outline" size={16} color="#9300b8" />
            </View>
            <Text className="text-white flex-1">{q}</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View className="p-4 bg-neutral-800">
        <View className="flex-row items-center bg-neutral-700 rounded-full px-4 py-3">
          <TextInput
            className="flex-1 text-white"
            placeholder="Ask me about property in Dubai..."
            placeholderTextColor="gray"
            value={query}
            onChangeText={setQuery}
          />

          <TouchableOpacity
            className={`${query.trim() === '' ? 'opacity-50' : ''}`}
            disabled={query.trim() === ''}
          >
            <Ionicons name="send" size={24} color="#9300b8" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewChatView;