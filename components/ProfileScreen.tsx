import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  Dimensions,
  Animated,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HEADER_HEIGHT = 280; // Taller header for more impact

interface PropertyCardProps {
  image: any;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  featured?: boolean;
  onPress: () => void;
}
// ================================================
// COMPONENT: PropertyCard
// Description: Displays a single property listing
// ================================================
const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  featured = false,
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-neutral-800 rounded-3xl overflow-hidden my-2 mx-1 shadow-lg ${featured ? 'w-72' : 'w-64'
        }`}
      style={{
        shadowColor: '#9300b8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="relative">
        <Image source={image} className="w-full h-40" resizeMode="cover" />
        {featured && (
          <View className="absolute top-2 right-2 bg-purple-600 rounded-full px-2 py-1">
            <Text className="text-white text-xs font-bold">Featured</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          className="absolute bottom-0 left-0 right-0 h-16"
        />
        <Text className="absolute bottom-2 left-3 text-white font-bold text-lg">{price}</Text>
      </View>
      <View className="p-3">
        <Text className="text-white font-bold text-base">{title}</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={14} color="#9300b8" />
          <Text className="text-neutral-400 text-xs ml-1">{location}</Text>
        </View>
        <View className="flex-row justify-between mt-3 pt-2 border-t border-neutral-700">
          <View className="flex-row items-center">
            <Ionicons name="bed-outline" size={14} color="#9300b8" />
            <Text className="text-white text-xs ml-1">{bedrooms}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="water-outline" size={14} color="#9300b8" />
            <Text className="text-white text-xs ml-1">{bathrooms}</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialIcons name="square-foot" size={14} color="#9300b8" />
            <Text className="text-white text-xs ml-1">{area}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ========================================================
// COMPONENT: CategoryList
// Description: Horizontal scrollable category filter tabs
// ========================================================
const CategoryList = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      className="border-b border-neutral-800"
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setActiveCategory(category.id)}
          className={`mr-4 py-2 px-4 rounded-full ${activeCategory === category.id
            ? 'bg-purple-600'
            : 'bg-neutral-800'
            }`}
        >
          <Text
            className={`${activeCategory === category.id ? 'text-white' : 'text-neutral-400'
              } font-medium`}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


// ===============================================
// COMPONENT: StatBox
// Description: Animated statistic box for KPI info
// ===============================================
const StatBox = ({ label, value, icon }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        className="items-center justify-center bg-neutral-800 rounded-2xl py-4 px-4"
        style={{
          transform: [{ scale }],
          shadowColor: '#9300b8',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
          minWidth: 90,
        }}
      >
        <View className="bg-neutral-700 p-2 rounded-full mb-2">{icon}</View>
        <Text className="text-white font-bold text-lg">{value}</Text>
        <Text className="text-neutral-400 text-xs text-center mt-1">{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};


// ====================================================
// SCREEN: ProfileScreen
// Description: Main profile screen for the real estate
// app, includes user header, tabs, categories, listings
// ====================================================
export const ProfileScreen = () => {
  // ------------------------------
  // SECTION: State and Scroll Data
  // ------------------------------
  const [activeTab, setActiveTab] = useState<'listings' | 'saved' | 'sold'>('listings');
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollY = useRef(new Animated.Value(0)).current;

  // Categories
  const categories = [
    { id: 'all', name: 'All Properties' },
    { id: 'apartments', name: 'Apartments' },
    { id: 'villas', name: 'Villas' },
    { id: 'penthouses', name: 'Penthouses' },
    { id: 'townhouses', name: 'Townhouses' },
  ];

  // Mock properties data
  const myListings = [
    {
      id: 1,
      image: require('../assets/properties/property1.jpg'),
      title: 'Modern Apartment',
      location: 'Downtown Dubai',
      price: 'AED 1,200,000',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sqft',
      featured: true,
      category: 'apartments'
    },
    {
      id: 2,
      image: require('../assets/properties/property1.jpg'),
      title: 'Luxury Villa',
      location: 'Palm Jumeirah',
      price: 'AED 5,500,000',
      bedrooms: 4,
      bathrooms: 5,
      area: '3,500 sqft',
      featured: true,
      category: 'villas'
    },
    {
      id: 3,
      image: require('../assets/properties/property1.jpg'),
      title: 'Penthouse Suite',
      location: 'Dubai Marina',
      price: 'AED 3,800,000',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,100 sqft',
      featured: false,
      category: 'penthouses'
    },
    {
      id: 4,
      image: require('../assets/properties/property1.jpg'),
      title: 'Studio Apartment',
      location: 'Business Bay',
      price: 'AED 750,000',
      bedrooms: 0,
      bathrooms: 1,
      area: '550 sqft',
      featured: false,
      category: 'apartments'
    },
  ];

  const savedProperties = [
    {
      id: 5,
      image: require('../assets/properties/property1.jpg'),
      title: 'Garden Apartment',
      location: 'Jumeirah Village Circle',
      price: 'AED 1,100,000',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,100 sqft',
      category: 'apartments'
    },
    {
      id: 6,
      image: require('../assets/properties/property1.jpg'),
      title: 'Beachfront Condo',
      location: 'Bluewaters Island',
      price: 'AED 2,900,000',
      bedrooms: 2,
      bathrooms: 2.5,
      area: '1,450 sqft',
      category: 'apartments'
    },
  ];

  const soldProperties = [
    {
      id: 7,
      image: require('../assets/properties/property1.jpg'),
      title: 'Corner Townhouse',
      location: 'Arabian Ranches',
      price: 'AED 2,100,000',
      bedrooms: 3,
      bathrooms: 3.5,
      area: '2,200 sqft',
      category: 'townhouses'
    },
    {
      id: 8,
      image: require('../assets/properties/property1.jpg'),
      title: 'Sky View Apartment',
      location: 'Downtown Dubai',
      price: 'AED 1,800,000',
      bedrooms: 1,
      bathrooms: 1.5,
      area: '950 sqft',
      category: 'apartments'
    },
  ];

  const getPropertiesByTab = () => {
    let properties;
    switch (activeTab) {
      case 'listings':
        properties = myListings;
        break;
      case 'saved':
        properties = savedProperties;
        break;
      case 'sold':
        properties = soldProperties;
        break;
      default:
        properties = myListings;
    }

    if (activeCategory !== 'all') {
      return properties.filter(property => property.category === activeCategory);
    }
    return properties;
  };

  // Animated header values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 80],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Featured properties rendering
  const renderFeaturedProperties = () => {
    const featured = myListings.filter(property => property.featured);
    if (featured.length === 0) return null;

    return (
      <View className="mb-6">
        <View className="flex-row justify-between items-center px-4 mb-2">
          <Text className="text-white font-bold text-lg">Featured Properties</Text>
          <TouchableOpacity>
            <Text className="text-purple-500">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        >
          {featured.map(property => (
            <PropertyCard
              key={property.id}
              image={property.image}
              title={property.title}
              location={property.location}
              price={property.price}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              featured={true}
              onPress={() => console.log('Property pressed', property.id)}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  // Render property grid with improved layout
  const renderPropertyList = () => {
    const properties = getPropertiesByTab();

    if (properties.length === 0) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <MaterialCommunityIcons name="home-off-outline" size={60} color="#9300b8" />
          <Text className="text-white text-lg font-medium mt-4">No properties found</Text>
          <Text className="text-neutral-400 text-center px-8 mt-2">
            There are no properties matching your current selection.
          </Text>
        </View>
      );
    }

    return (
      <View className="px-4">
        {properties.map(property => (
          <View key={property.id} className="mb-4">
            <TouchableOpacity
              className="bg-neutral-800 rounded-3xl overflow-hidden shadow-lg"
              style={{
                shadowColor: '#9300b8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 5,
              }}
              onPress={() => console.log('Property pressed', property.id)}
            >
              <View className="relative">
                <Image
                  source={property.image}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  className="absolute bottom-0 left-0 right-0 h-24"
                />
                <View className="absolute top-3 right-3 bg-purple-600/80 rounded-lg px-2 py-1 backdrop-blur-sm">
                  <Text className="text-white font-bold">{property.price}</Text>
                </View>
              </View>

              <View className="p-4">
                <Text className="text-white font-bold text-lg">{property.title}</Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="location-outline" size={16} color="#9300b8" />
                  <Text className="text-neutral-400 text-sm ml-1">{property.location}</Text>
                </View>

                <View className="flex-row justify-between mt-4 pt-3 border-t border-neutral-700">
                  <View className="flex-row items-center">
                    <View className="bg-neutral-700 p-1.5 rounded-full mr-2">
                      <Ionicons name="bed-outline" size={16} color="#9300b8" />
                    </View>
                    <Text className="text-white">{property.bedrooms}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-neutral-700 p-1.5 rounded-full mr-2">
                      <Ionicons name="water-outline" size={16} color="#9300b8" />
                    </View>
                    <Text className="text-white">{property.bathrooms}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-neutral-700 p-1.5 rounded-full mr-2">
                      <MaterialIcons name="square-foot" size={16} color="#9300b8" />
                    </View>
                    <Text className="text-white">{property.area}</Text>
                  </View>

                  <TouchableOpacity
                    className="bg-purple-600 rounded-full h-8 w-8 items-center justify-center"
                    onPress={() => console.log('Contact about property', property.id)}
                  >
                    <Ionicons name="chatbubble-outline" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Animated Header */}
      <Animated.View
        style={{
          height: headerHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: '#1a1a1a',
        }}
      >
        <LinearGradient
          colors={['#5202ad88', '#9300b888', '#5202ad88']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 0.89 }}
        >
          {/* Compact Header - shown when scrolled */}
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 70,
              paddingTop: 40,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              opacity: headerTitleOpacity,
              zIndex: 2,
            }}
          >
            <Image
              source={require('../assets/properties/property1.jpg')}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
            <Text className="text-white font-bold text-lg ml-3">Bairamaliev</Text>
            <View className="flex-row ml-auto">
              <TouchableOpacity className="mr-4">
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Full Header Content - hidden when scrolled */}
          <Animated.View
            style={{
              opacity: headerOpacity,
              paddingTop: 60,
              paddingBottom: 20,
              paddingHorizontal: 20,
              transform: [{ scale: imageScale }],
            }}
          >
            <View className="flex-row items-center justify-between mb-4">


              <TouchableOpacity className="mr-5">
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>

            </View>

            <View className="flex-row items-center">
              <View className="relative">
                <View className="border-2 border-white rounded-full overflow-hidden">
                  <Image
                    source={require('../assets/properties/property1.jpg')}
                    className="w-24 h-24"
                    resizeMode="cover"
                  />
                </View>
                <View className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white items-center justify-center">
                  <Ionicons name="checkmark" size={14} color="white" />
                </View>
              </View>

              <View className="ml-5 flex-1">
                <View className="flex-row items-center">
                  <Text className="text-white text-2xl font-bold">Bairamaliev</Text>
                  <TouchableOpacity className="ml-2">
                    <View className="bg-purple-700/80 rounded-md px-3 py-1 backdrop-blur-sm">
                      <Text className="text-white text-xs font-bold">get verified</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Text className="text-white text-sm opacity-80 mt-1">best real estate agent in dubai</Text>

                <View className="flex-row mt-3">
                  <TouchableOpacity
                    className="bg-white rounded-full py-2 px-5 mr-3 flex-row items-center mt-2"
                    onPress={() => console.log('Follow pressed')}
                  >
                    <Ionicons name="person-add-outline" size={29} color="#5202ad" />
                    <Text className="text-purple-900 font-bold text-xs ml-1">Follow</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-white/20 rounded-full py-2 px-5 flex-row items-center backdrop-blur-sm mt-2"
                    onPress={() => console.log('Message pressed')}
                  >
                    <Ionicons name="chatbubble-outline" size={16} color="white" />
                    <Text className="text-white text-xs font-medium ml-1">Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      {/* Main Scroll Content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Stats Section */}
        <View className="flex-row justify-between px-4 py-6">
          <StatBox
            label="Properties Sold"
            value="362"
            icon={<FontAwesome5 name="building" size={22} color="#9300b8" />}
          />
          <StatBox
            label="Available"
            value="425"
            icon={<MaterialIcons name="apartment" size={24} color="#9300b8" />}
          />
          <StatBox
            label="Rating"
            value="4.9"
            icon={<Ionicons name="star" size={24} color="#9300b8" />}
          />
        </View>

        {/* Tab Navigation */}
        <View className="flex-row border-b border-neutral-800 mb-4">
          <Pressable
            className={`flex-1 items-center py-4 relative`}
            onPress={() => setActiveTab('listings')}
          >
            <Text className={`${activeTab === 'listings' ? 'text-white font-bold' : 'text-neutral-500'}`}>
              My Listings
            </Text>
            {activeTab === 'listings' && (
              <View className="absolute bottom-0 left-10 right-10 h-0.5 bg-purple-600" />
            )}
          </Pressable>

          <Pressable
            className={`flex-1 items-center py-4 relative`}
            onPress={() => setActiveTab('saved')}
          >
            <Text className={`${activeTab === 'saved' ? 'text-white font-bold' : 'text-neutral-500'}`}>
              Saved
            </Text>
            {activeTab === 'saved' && (
              <View className="absolute bottom-0 left-10 right-10 h-0.5 bg-purple-600" />
            )}
          </Pressable>

          <Pressable
            className={`flex-1 items-center py-4 relative`}
            onPress={() => setActiveTab('sold')}
          >
            <Text className={`${activeTab === 'sold' ? 'text-white font-bold' : 'text-neutral-500'}`}>
              Sold
            </Text>
            {activeTab === 'sold' && (
              <View className="absolute bottom-0 left-10 right-10 h-0.5 bg-purple-600" />
            )}
          </Pressable>
        </View>

        {/* Category Filter */}
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Featured Section */}
        {activeTab === 'listings' && renderFeaturedProperties()}

        {/* Property List */}
        <View className="mb-24">
          {renderPropertyList()}
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute top-[712px] right-8 bg-purple-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{
          shadowColor: '#9300b8',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        onPress={() => console.log('Add new property')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;