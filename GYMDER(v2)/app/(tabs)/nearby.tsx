import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState, useCallback } from 'react';
import { Sliders, MoreVertical, Target, Search } from 'lucide-react-native';
import { districts, District } from '@/data/districts';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// İstanbul merkez koordinatları
const initialRegion = {
  latitude: 41.0082,
  longitude: 28.9784,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export default function NearbyScreen() {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const router = useRouter();

  const handleDistrictPress = (district: District) => {
    setSelectedDistrict(district);
  };

  const handleProfilePress = (userId: string) => {
    router.push("/(tabs)/profile");
  };

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredDistricts(districts);
    } else {
      const filtered = districts.filter(district =>
        district.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDistricts(filtered);
    }
  }, []);

  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#9e9e9e" }]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#bdbdbd" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{ "color": "#181818" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#616161" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#1b1b1b" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#2c2c2c" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#8a8a8a" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{ "color": "#373737" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{ "color": "#3c3c3c" }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [{ "color": "#4e4e4e" }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#616161" }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#3d3d3d" }]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterButton}>
          <Sliders size={24} color="#8E8E93" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="İlçe ara..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          customMapStyle={mapStyle}
        >
          {filteredDistricts.map((district) => (
            <Polygon
              key={district.id}
              coordinates={district.polygon}
              strokeColor={selectedDistrict?.id === district.id ? "#FFD700" : "#FFFFFF"}
              strokeWidth={2}
              fillColor={selectedDistrict?.id === district.id ? "rgba(255, 215, 0, 0.2)" : "rgba(255, 255, 255, 0.1)"}
              onPress={() => handleDistrictPress(district)}
            />
          ))}
        </MapView>

        <TouchableOpacity style={styles.currentLocationButton}>
          <Target size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {selectedDistrict && (
        <View style={styles.districtInfo}>
          <View style={styles.districtHeader}>
            <Text style={styles.districtName}>{selectedDistrict.name}</Text>
            <Text style={styles.userCount}>{selectedDistrict.users.length} kişi</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.usersScroll}
          >
            {selectedDistrict.users.map((user) => (
              <TouchableOpacity 
                key={user.id}
                style={styles.userCard}
                onPress={() => handleProfilePress(user.id)}
              >
                <Image source={{ uri: user.images[0] }} style={styles.userImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.userGradient}
                >
                  <View style={styles.userInfo}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.userName}>{user.name}, {user.age}</Text>
                      {user.verified && (
                        <View style={styles.verifiedIndicator}>
                          <Text style={styles.verifiedText}>✓</Text>
                        </View>
                      )}
                    </View>
                    {user.online && (
                      <View style={styles.onlineIndicator}>
                        <Text style={styles.onlineText}>Çevrimiçi</Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    padding: 0,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  districtInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '40%',
  },
  districtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  districtName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
  },
  userCount: {
    color: '#8E8E93',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  usersScroll: {
    flexDirection: 'row',
  },
  userCard: {
    width: 160,
    height: 200,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  userGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    padding: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginRight: 4,
  },
  verifiedIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#121212',
    fontSize: 10,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    backgroundColor: '#4CD964',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  onlineText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});