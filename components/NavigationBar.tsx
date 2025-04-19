import React from 'react';
import { View, TouchableOpacity, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type NavigationBarProps = {
  activeTab?: 'props' | 'profile' | 'chat';
  onPropsPress?: () => void;
  onProfilePress?: () => void;
  onChatPress?: () => void;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeTab = 'props',
  onPropsPress,
  onProfilePress,
  onChatPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-neutral-90088 z-10">
      <LinearGradient
        colors={['#5202adbb', '#9300b8bb', '#5202adbb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: 76,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
          borderTopLeftRadius: 47,
          borderTopRightRadius: 47,
          overflow: 'hidden',
        }}
      >
        <TabButton
          isActive={activeTab === 'props'}
          onPress={onPropsPress}
          iconName="play"
          IconComponent={Ionicons}
        />

        <TabButton
          isActive={activeTab === 'chat'}
          onPress={onChatPress}
          iconName={activeTab === 'chat' ? "chatbubble" : "chatbubble-outline"}
        />

        <TabButton
          isActive={activeTab === 'profile'}
          onPress={onProfilePress}
          iconName={activeTab === 'profile' ? "person" : "person-outline"}
        />
      </LinearGradient>
    </View>
  );
};

type TabButtonProps = {
  isActive: boolean;
  onPress?: () => void;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  IconComponent?: React.ComponentType<React.ComponentProps<typeof Ionicons>>;
};

const TabButton: React.FC<TabButtonProps> = ({ isActive, onPress, iconName, IconComponent = Ionicons }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isActive) {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive, scaleValue]);

  return (
    <TouchableOpacity
      className={`w-14 h-14 rounded-full items-center justify-center ${isActive ? 'bg-white/40' : 'bg-transparent'}`}
      onPress={onPress}
      activeOpacity={0.7}
      style={{ transform: [{ translateY: 9 }] }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <IconComponent name={iconName} size={26} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default NavigationBar;