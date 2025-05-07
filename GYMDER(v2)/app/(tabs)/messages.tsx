import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Sliders, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { supabase, Conversation, Message } from '@/lib/supabase';

type User = {
  id: string;
  name: string;
  images: string[];
  online: boolean;
};

type MessagePreview = {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
};

type ConversationWithDetails = {
  id: string;
  user1: User;
  user2: User;
  messages: Message[];
};

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'online'>('all');
  const [messages, setMessages] = useState<MessagePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
    subscribeToConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select(`
          id,
          user1:user1_id(id, name, images, online),
          user2:user2_id(id, name, images, online),
          messages:messages(id, content, created_at, sender_id)
        `)
        .order('updated_at', { ascending: false });

      if (convError) throw convError;

      const messagePreviews: MessagePreview[] = conversations.map((conv: any) => {
        const otherUser = conv.user1.id === 'current_user_id' ? conv.user2 : conv.user1;
        const lastMessage = conv.messages[conv.messages.length - 1];
        
        return {
          id: conv.id,
          user: {
            id: otherUser.id,
            name: otherUser.name,
            images: otherUser.images,
            online: otherUser.online
          },
          lastMessage: lastMessage?.content || '',
          timestamp: lastMessage ? new Date(lastMessage.created_at).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : '',
          unread: false // TODO: Implement unread status
        };
      });

      setMessages(messagePreviews);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToConversations = () => {
    const subscription = supabase
      .channel('conversations')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'conversations' 
        }, 
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleChatPress = (userId: string) => {
    router.push({
      pathname: '/chat/[id]',
      params: { id: userId }
    });
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchQuery.trim() === '' || 
      message.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'unread' && message.unread) ||
      (activeFilter === 'online' && message.user.online);

    return matchesSearch && matchesFilter;
  });

  const renderItem = ({ item }: { item: MessagePreview }) => (
    <TouchableOpacity 
      style={styles.messageItem}
      onPress={() => handleChatPress(item.user.id)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.user.images[0] }} style={styles.avatar} />
        {item.user.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.messageTime}>{item.timestamp}</Text>
        </View>
        
        <View style={styles.messagePreview}>
          <Text 
            style={[styles.messageText, item.unread && styles.unreadText]} 
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          
          {item.unread && <View style={styles.unreadBadge} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading messages...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter !== 'all' && styles.filterButtonActive]}
          onPress={() => setShowFilterModal(true)}
        >
          <Sliders size={24} color={activeFilter !== 'all' ? "#FFD700" : "#8E8E93"} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>
      
      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages found</Text>
          </View>
        }
      />

      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Messages</Text>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                setActiveFilter('all');
                setShowFilterModal(false);
              }}
            >
              <Text style={styles.filterOptionText}>All Messages</Text>
              {activeFilter === 'all' && <Check size={20} color="#FFD700" />}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                setActiveFilter('unread');
                setShowFilterModal(false);
              }}
            >
              <Text style={styles.filterOptionText}>Unread Messages</Text>
              {activeFilter === 'unread' && <Check size={20} color="#FFD700" />}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                setActiveFilter('online');
                setShowFilterModal(false);
              }}
            >
              <Text style={styles.filterOptionText}>Online Users</Text>
              {activeFilter === 'online' && <Check size={20} color="#FFD700" />}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#2A2A2A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  messageItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CD964',
    borderWidth: 2,
    borderColor: '#121212',
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginRight: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  filterOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
});