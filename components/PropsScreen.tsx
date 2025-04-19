import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PropertyReel {
  id: string;
  videoUri: any; // Using require() for local videos
  owner: {
    name: string;
    avatar: any;
    isVerified: boolean;
  };
  property: {
    title: string;
    description: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
  };
  likes: number;
  isLiked: boolean;
}

// Mock data for property reels
const REELS_DATA: PropertyReel[] = [
  {
    id: '1',
    videoUri: require('../assets/properties/property1.jpg'), // Replace with actual video
    owner: {
      name: 'Dubai Luxury',
      avatar: require('../assets/properties/property1.jpg'),
      isVerified: true,
    },
    property: {
      title: 'Luxury Penthouse',
      description: 'Stunning 3BR penthouse with panoramic views of Dubai Marina',
      price: 'AED 5,200,000',
      location: 'Dubai Marina',
      bedrooms: 3,
      bathrooms: 2,
      area: '2,400 sqft',
    },
    likes: 1243,
    isLiked: false,
  },
  {
    id: '2',
    videoUri: require('../assets/properties/property1.jpg'), // Replace with actual video
    owner: {
      name: 'Palm Estates',
      avatar: require('../assets/properties/property1.jpg'),
      isVerified: true,
    },
    property: {
      title: 'Beach Villa',
      description: 'Exclusive 5BR villa with private beach access on Palm Jumeirah',
      price: 'AED 15,500,000',
      location: 'Palm Jumeirah',
      bedrooms: 5,
      bathrooms: 6,
      area: '7,500 sqft',
    },
    likes: 3567,
    isLiked: true,
  },
  {
    id: '3',
    videoUri: require('../assets/properties/property1.jpg'), // Replace with actual video
    owner: {
      name: 'Downtown Realty',
      avatar: require('../assets/properties/property1.jpg'),
      isVerified: false,
    },
    property: {
      title: 'Modern Apartment',
      description: 'Sleek 2BR apartment in the heart of Downtown Dubai',
      price: 'AED 2,100,000',
      location: 'Downtown Dubai',
      bedrooms: 2,
      bathrooms: 2.5,
      area: '1,350 sqft',
    },
    likes: 789,
    isLiked: false,
  },
];

// ==============================================
// COMPONENT: ReelItem - Individual Reel Display
// ==============================================
const ReelItem: React.FC<{
  item: PropertyReel;
  isActive: boolean;
  onLike: (id: string) => void;
  onNavigateToDetail: (id: string) => void;
  onOpenChat: (id: string) => void;
}> = ({ item, isActive, onLike, onNavigateToDetail, onOpenChat }) => {
  const videoRef = useRef(null);
  const [videoStatus, setVideoStatus] = useState({});
  const likeAnimation = useRef(new Animated.Value(1)).current;

  // Handle like animation
  const handleLike = () => {
    onLike(item.id);
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 76 - StatusBar.currentHeight }}>
      {/* Background Video/Image */}
      <View style={{ flex: 1 }}>
        {/* Using Image for now, replace with Video component for actual implementation */}
        <Image
          source={item.videoUri}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        {/* Overlay gradient for better text visibility */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: SCREEN_HEIGHT / 2,
          }}
        />
      </View>

      {/* Property Information */}
      <View
        style={{
          position: 'absolute',
          bottom: 90,
          left: 16,
          right: 16,
        }}
      >
        {/* Agent Info */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Image
            source={item.owner.avatar}
            style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'white' }}
          />
          <View style={{ marginLeft: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{item.owner.name}</Text>
              {item.owner.isVerified && (
                <View
                  style={{
                    backgroundColor: '#9300b8',
                    borderRadius: 10,
                    padding: 4,
                    marginLeft: 8,
                  }}
                >
                  <Ionicons name="checkmark" size={12} color="white" />
                </View>
              )}
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Real Estate Agent</Text>
          </View>

        </View>

        {/* Property Details */}
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
          {item.property.title}
        </Text>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 6 }}>
          {item.property.price}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="location-outline" size={16} color="#9300b8" />
          <Text style={{ color: 'rgba(255,255,255,0.9)', marginLeft: 4 }}>{item.property.location}</Text>
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
          {item.property.description}
        </Text>

        {/* Property Specs */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'rgba(147, 0, 184, 0.3)', padding: 6, borderRadius: 12 }}>
              <Ionicons name="bed-outline" size={18} color="#9300b8" />
            </View>
            <Text style={{ color: 'white', marginLeft: 4 }}>{item.property.bedrooms}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'rgba(147, 0, 184, 0.3)', padding: 6, borderRadius: 12 }}>
              <Ionicons name="water-outline" size={18} color="#9300b8" />
            </View>
            <Text style={{ color: 'white', marginLeft: 4 }}>{item.property.bathrooms}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'rgba(147, 0, 184, 0.3)', padding: 6, borderRadius: 12 }}>
              <MaterialIcons name="square-foot" size={18} color="#9300b8" />
            </View>
            <Text style={{ color: 'white', marginLeft: 4 }}>{item.property.area}</Text>
          </View>
        </View>

        {/* View Full Details Button */}
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            paddingVertical: 12,
            borderRadius: 24,
            alignItems: 'center',
          }}
          onPress={() => onNavigateToDetail(item.id)}
        >
          <Text style={{ color: '#5202ad', fontWeight: 'bold' }}>View Full Details</Text>
        </TouchableOpacity>
      </View>

      {/* Side Actions */}
      <View
        style={{
          position: 'absolute',
          right: 16,
          bottom: SCREEN_HEIGHT / 3,
          alignItems: 'center',
        }}
      >
        {/* Like Button */}
        <TouchableOpacity
          style={{ alignItems: 'center', marginBottom: 16 }}
          onPress={handleLike}
        >
          <Animated.View style={{ transform: [{ scale: likeAnimation }] }}>
            <FontAwesome
              name={item.isLiked ? 'heart' : 'heart-o'}
              size={28}
              color={item.isLiked ? '#9300b8' : 'white'}
            />
          </Animated.View>
          <Text style={{ color: 'white', marginTop: 4 }}>{item.likes}</Text>
        </TouchableOpacity>

        {/* AI Assistant Button */}
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Ionicons name="sparkles" size={24} color="white" />
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="share-social-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ========================================================
// COMPONENT: PropsScreen - Main Reels Screen
// ========================================================
export const PropsScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reelsData, setReelsData] = useState(REELS_DATA);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const flatListRef = useRef(null);
  const insets = useSafeAreaInsets();

  // Handle liking a property
  const handleLike = (id: string) => {
    const updatedReels = reelsData.map((reel) => {
      if (reel.id === id) {
        const isLiked = !reel.isLiked;
        return {
          ...reel,
          isLiked,
          likes: isLiked ? reel.likes + 1 : reel.likes - 1,
        };
      }
      return reel;
    });
    setReelsData(updatedReels);
  };

  // Navigate to detail screen
  const handleNavigateToDetail = (id: string) => {
    console.log(`Navigate to property details for id: ${id}`);
    // Implement navigation to property details
  };

  // Open chat with agent
  const handleOpenChat = (id: string) => {
    console.log(`Open chat for property id: ${id}`);
    // Implement chat opening
  };

  // Get filtered reels based on liked status
  const getFilteredReels = () => {
    if (showLikedOnly) {
      return reelsData.filter(reel => reel.isLiked);
    }
    return reelsData;
  };

  // Toggle between all and liked reels
  const toggleLikedFilter = () => {
    setShowLikedOnly(!showLikedOnly);
    setActiveIndex(0);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  };

  // Handle viewable items change
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Filtered data
  const filteredReels = getFilteredReels();

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Header */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 10,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 16,
          zIndex: 10,
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 30,
            paddingHorizontal: 16,
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 4,
              backgroundColor: !showLikedOnly ? '#9300b8' : 'transparent',
              borderRadius: 20,
            }}
            onPress={() => setShowLikedOnly(false)}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: !showLikedOnly ? 'bold' : 'normal',
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 4,
              backgroundColor: showLikedOnly ? '#9300b8' : 'transparent',
              borderRadius: 20,
              marginLeft: 8,
            }}
            onPress={() => setShowLikedOnly(true)}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: showLikedOnly ? 'bold' : 'normal',
              }}
            >
              Liked
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content - Full-screen FlatList of Reels */}
      {filteredReels.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={filteredReels}
          renderItem={({ item, index }) => (
            <ReelItem
              item={item}
              isActive={index === activeIndex}
              onLike={handleLike}
              onNavigateToDetail={handleNavigateToDetail}
              onOpenChat={handleOpenChat}
            />
          )}
          keyExtractor={(item) => item.id}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          snapToInterval={SCREEN_HEIGHT - 76 - StatusBar.currentHeight}
          snapToAlignment="start"
          decelerationRate="fast"
        />
      ) : (
        // Empty state
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="heart" size={80} color="#9300b8" style={{ opacity: 0.6 }} />
          <Text style={{ color: 'white', fontSize: 18, marginTop: 16 }}>No liked properties yet</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#9300b8',
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 24,
              marginTop: 20,
            }}
            onPress={() => setShowLikedOnly(false)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Explore Properties</Text>
          </TouchableOpacity>
        </View>
      )}


    </View>
  );
};

export default PropsScreen;