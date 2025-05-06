import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, ChevronDown } from 'lucide-react-native';
import { useRouter } from 'expo-router'; // Yeni import eklenecek
// Current user's profile data
const profile = {
  id: '1',
  name: 'Helen',
  age: 23,
  verified: true,
  online: true,
  images: [
    'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3095439/pexels-photo-3095439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  bio: "Hey there! 👋 I'm Helen — a mix of good vibes, curious mind, and a love for deep convos and spontaneous laughs 😊 I enjoy meaningful connections, fun chats, and people who know how to keep it real.",
  interests: [
    { icon: '🐕', label: 'Have a dog' },
    { icon: '🏋️', label: 'Gym Rat' },
    { icon: '🎬', label: 'Movie Buff' },
    { icon: '🏎️', label: 'Motorsport' },
    { icon: '🧘', label: 'Wellness' },
    { icon: '🗣️', label: 'Talks' },
  ],
  location: {
    city: 'New York',
    distance: '5 miles away'
  },
  education: 'NYU Graduate',
  job: 'UX Designer at Apple'
};

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('photos');
  const router = useRouter(); // router tanımlanacak
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => router.push('/(auth)/signup')}
          >
            <Settings size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: profile.images[0] }} 
              style={styles.profileImage} 
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.imageGradient}
            />
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
                {profile.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                )}
              </View>
              
              {profile.online && (
                <View style={styles.onlineStatus}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>In real time</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.profileContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More Info</Text>
            <View style={styles.interestsContainer}>
              {profile.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestIcon}>{interest.icon}</Text>
                  <Text style={styles.interestLabel}>{interest.label}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <View style={styles.tabsContainer}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'photos' && styles.activeTab]}
                onPress={() => setActiveTab('photos')}
              >
                <Text style={[styles.tabText, activeTab === 'photos' && styles.activeTabText]}>Photos</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
                onPress={() => setActiveTab('videos')}
              >
                <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>Videos</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.galleryGrid}>
              {profile.images.map((image, index) => (
                <TouchableOpacity key={index} style={styles.galleryItem}>
                  <Image source={{ uri: image }} style={styles.galleryImage} />
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity style={styles.addPhotoButton}>
                <Text style={styles.addPhotoText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{profile.location.city}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Education</Text>
              <Text style={styles.infoValue}>{profile.education}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Work</Text>
              <Text style={styles.infoValue}>{profile.job}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  profileImageContainer: {
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#121212',
    fontSize: 14,
    fontWeight: 'bold',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CD964',
    marginRight: 6,
  },
  onlineText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  profileContent: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  bioText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  interestLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    marginBottom: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#333333',
  },
  tabText: {
    color: '#8E8E93',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  addPhotoButton: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addPhotoText: {
    fontSize: 24,
    color: '#8E8E93',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingVertical: 12,
  },
  infoLabel: {
    color: '#8E8E93',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  editProfileButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  editProfileText: {
    color: '#FFD700',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});