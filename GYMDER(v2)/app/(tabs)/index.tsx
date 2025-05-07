import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';

type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  bio: string;
  sports: string[];
  fitness_level: string;
  preferred_workout_time: string;
  preferred_workout_location: string;
  distance: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (profileId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('matches')
        .insert([
          {
            user_id: user.id,
            liked_user_id: profileId,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error liking profile:', error);
    }
  };

  const handleDislike = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const renderProfile = ({ item }: { item: Profile }) => (
    <View style={styles.profileCard}>
      <Image source={{ uri: item.avatar_url }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.bio}>{item.bio}</Text>
        
        <View style={styles.sportsContainer}>
          {item.sports.map((sport, index) => (
            <View key={index} style={styles.sportTag}>
              <Text style={styles.sportText}>{sport}</Text>
            </View>
          ))}
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="fitness" size={20} color="#FFD700" />
            <Text style={styles.detailText}>{item.fitness_level}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={20} color="#FFD700" />
            <Text style={styles.detailText}>{item.preferred_workout_time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={20} color="#FFD700" />
            <Text style={styles.detailText}>{item.preferred_workout_location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.dislikeButton]} 
          onPress={handleDislike}
        >
          <Ionicons name="close" size={30} color="#FF3B30" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]} 
          onPress={() => handleLike(item.id)}
        >
          <Ionicons name="heart" size={30} color="#4CD964" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Workout Partners</Text>
      </View>

      {profiles.length > 0 ? (
        <FlatList
          data={profiles.slice(currentIndex, currentIndex + 1)}
          renderItem={renderProfile}
          keyExtractor={(item) => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No more profiles to show</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={() => {
              setCurrentIndex(0);
              fetchProfiles();
            }}
          >
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  profileCard: {
    flex: 1,
    margin: 16,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  profileInfo: {
    padding: 16,
  },
  username: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 16,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  sportTag: {
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sportText: {
    color: '#FFD700',
    fontFamily: 'Inter-Medium',
  },
  detailsContainer: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: '#2C2C2E',
  },
  likeButton: {
    backgroundColor: '#2C2C2E',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});