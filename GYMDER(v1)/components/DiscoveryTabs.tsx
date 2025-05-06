import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type DiscoveryTabsProps = {
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export default function DiscoveryTabs({ activeTab, onTabPress }: DiscoveryTabsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'for-you' ? styles.activeTab : null
        ]}
        onPress={() => onTabPress('for-you')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'for-you' ? styles.activeTabText : null
        ]}>
          For You
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'nearby' ? styles.activeTab : null
        ]}
        onPress={() => onTabPress('nearby')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'nearby' ? styles.activeTabText : null
        ]}>
          Nearby
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#333333',
  },
  tabText: {
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});