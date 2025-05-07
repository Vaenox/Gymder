import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { supabase } from '@/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleSignIn(authentication?.accessToken);
    }
  }, [response]);

  const handleGoogleSignIn = async (token: string | undefined) => {
    if (!token) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token,
      });

      if (error) throw error;

      if (data.session) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: 'gymder://auth/callback'
        }
      });

      if (error) throw error;

      if (data.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          'gymder://auth/callback'
        );

        if (result.type === 'success') {
          const { access_token } = result.url.split('#')[1].split('&').reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            acc[key] = value;
            return acc;
          }, {} as Record<string, string>);

          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token: '',
          });

          if (sessionError) throw sessionError;

          if (sessionData.session) {
            router.replace('/(tabs)');
          }
        }
      }
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/images/gymderLogo.jpg')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>GYMDER</Text>
        <Text style={styles.subtitle}>Connect with fitness enthusiasts</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={() => promptAsync()}
            disabled={loading}
          >
            <Image 
              source={require('../assets/images/google.png')} 
              style={styles.buttonIcon}
            />
            <Text style={[styles.buttonText, styles.googleButtonText]}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.facebookButton]}
            onPress={handleFacebookSignIn}
            disabled={loading}
          >
            <Image 
              source={require('../assets/images/facebook.png')} 
              style={styles.buttonIcon}
            />
            <Text style={[styles.buttonText, styles.facebookButtonText]}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFD700" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  googleButtonText: {
    color: '#000000',
  },
  facebookButtonText: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 