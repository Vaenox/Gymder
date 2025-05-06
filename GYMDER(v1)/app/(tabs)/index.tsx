import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Sliders, Heart, X, Home, MapPin, MoreVertical } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context';
import UserCard from '@/components/UserCard';
import DiscoveryTabs from '@/components/DiscoveryTabs';

// Sample data
import { users } from '@/data/users';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discoveryMode, setDiscoveryMode] = useState('for-you');
  const router = useRouter();
  
  const translateX = useSharedValue(0);
  const rotate = useSharedValue('0deg');

  const handleSwipeComplete = (direction: 'left' | 'right') => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex >= users.length ? 0 : nextIndex);
    translateX.value = 0;
    rotate.value = '0deg';
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      rotate.value = `${translateX.value / 20}deg`;
    },
    onEnd: (event) => {
      if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH * 1.5);
        rotate.value = withSpring('-30deg');
        runOnJS(handleSwipeComplete)('left');
      } else if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH * 1.5);
        rotate.value = withSpring('30deg');
        runOnJS(handleSwipeComplete)('right');
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring('0deg');
      }
    },
  });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: rotate.value },
      ],
    };
  });

  const handleLike = () => {
    translateX.value = withSpring(SCREEN_WIDTH * 1.5);
    rotate.value = withSpring('30deg');
    handleSwipeComplete('right');
  };

  const handleDislike = () => {
    translateX.value = withSpring(-SCREEN_WIDTH * 1.5);
    rotate.value = withSpring('-30deg');
    handleSwipeComplete('left');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterButton}>
          <Sliders size={24} color="#8E8E93" />
        </TouchableOpacity>
        
        <DiscoveryTabs 
          activeTab={discoveryMode}
          onTabPress={setDiscoveryMode}
        />
        
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {users.slice(currentIndex, currentIndex + 2).map((user, index) => {
          if (index === 0) {
            // First card (animated)
            return (
              <PanGestureHandler
                key={index}
                onGestureEvent={gestureHandler}
              >
                <Animated.View style={[styles.cardWrapper, animatedCardStyle]}>
                  <UserCard user={user} swipeable={true} />
                </Animated.View>
              </PanGestureHandler>
            );
          } else {
            // Second card (static behind)
            return (
              <View key={index} style={[styles.cardWrapper, styles.nextCard]}>
                <UserCard user={user} swipeable={false} />
              </View>
            );
          }
        })}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButtonSecondary}>
          <View style={styles.homeButton}>
            <Home size={24} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.dislikeButton]}
          onPress={handleDislike}
        >
          <X size={24} color="#FF6B6B" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLike}
        >
          <Heart size={24} color="#FFD700" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButtonSecondary}>
          <View style={styles.mapButton}>
            <MapPin size={24} color="#FFFFFF" />
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 16,
  },
  nextCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.7,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  likeButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  dislikeButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  homeButton: {
    backgroundColor: '#333333',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButton: {
    backgroundColor: '#333333',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});