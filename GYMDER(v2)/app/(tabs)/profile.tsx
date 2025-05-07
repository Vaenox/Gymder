import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const SPORTS = [
  'Fitness', 'Yoga', 'CrossFit', 'Running', 'Cycling', 'Swimming',
  'Basketball', 'Football', 'Tennis', 'Boxing', 'Martial Arts'
];

const FITNESS_LEVELS = [
  'Beginner', 'Intermediate', 'Advanced', 'Professional'
];

const WORKOUT_TIMES = [
  'Morning (6-9 AM)', 'Afternoon (12-3 PM)', 'Evening (5-8 PM)', 'Night (8-11 PM)'
];

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    avatar_url: '',
    sports: [] as string[],
    fitness_level: '',
    preferred_workout_time: '',
    preferred_workout_location: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const file = {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        };

        const formData = new FormData();
        formData.append('file', file as any);

        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(`${user.id}/${file.name}`, formData);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(`${user.id}/${file.name}`);

        setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleSport = (sport: string) => {
    setProfile(prev => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter(s => s !== sport)
        : [...prev.sports, sport],
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImagePick}>
            <View style={styles.avatarContainer}>
              {profile.avatar_url ? (
                <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={40} color="#8E8E93" />
                </View>
              )}
              <View style={styles.editIconContainer}>
                <Ionicons name="camera" size={20} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={profile.username}
              onChangeText={(text) => setProfile(prev => ({ ...prev, username: text }))}
              placeholder="Enter your username"
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={profile.bio}
              onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
              placeholder="Tell us about yourself"
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sports</Text>
            <View style={styles.sportsContainer}>
              {SPORTS.map((sport) => (
                <TouchableOpacity
                  key={sport}
                  style={[
                    styles.sportTag,
                    profile.sports.includes(sport) && styles.sportTagActive
                  ]}
                  onPress={() => toggleSport(sport)}
                >
                  <Text style={[
                    styles.sportText,
                    profile.sports.includes(sport) && styles.sportTextActive
                  ]}>
                    {sport}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fitness Level</Text>
            <View style={styles.optionsContainer}>
              {FITNESS_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.optionButton,
                    profile.fitness_level === level && styles.optionButtonActive
                  ]}
                  onPress={() => setProfile(prev => ({ ...prev, fitness_level: level }))}
                >
                  <Text style={[
                    styles.optionText,
                    profile.fitness_level === level && styles.optionTextActive
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Workout Time</Text>
            <View style={styles.optionsContainer}>
              {WORKOUT_TIMES.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.optionButton,
                    profile.preferred_workout_time === time && styles.optionButtonActive
                  ]}
                  onPress={() => setProfile(prev => ({ ...prev, preferred_workout_time: time }))}
                >
                  <Text style={[
                    styles.optionText,
                    profile.preferred_workout_time === time && styles.optionTextActive
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Workout Location</Text>
            <TextInput
              style={styles.input}
              value={profile.preferred_workout_location}
              onChangeText={(text) => setProfile(prev => ({ ...prev, preferred_workout_location: text }))}
              placeholder="Enter your preferred location"
              placeholderTextColor="#8E8E93"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text style={styles.saveButtonText}>Save Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFD700',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sportTag: {
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sportTagActive: {
    backgroundColor: '#FFD700',
  },
  sportText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  sportTextActive: {
    color: '#000000',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  optionButtonActive: {
    backgroundColor: '#FFD700',
  },
  optionText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  optionTextActive: {
    color: '#000000',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});