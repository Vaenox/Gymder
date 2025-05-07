import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, Moon, Globe, Bell, Shield, LogOut, User, Lock, LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

interface SettingItemProps {
  icon: LucideIcon;
  title: string;
  value?: string;
  onPress?: () => void;
  showArrow?: boolean;
}

interface SwitchItemProps {
  icon: LucideIcon;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('Türkçe');

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/(auth)/login');
  };

  const SettingItem = ({ icon: Icon, title, value, onPress, showArrow = true }: SettingItemProps) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingItemLeft}>
        <Icon size={24} color="#FFD700" style={styles.settingIcon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <View style={styles.settingItemRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {showArrow && <Settings size={20} color="#8E8E93" style={styles.arrowIcon} />}
      </View>
    </TouchableOpacity>
  );

  const SwitchItem = ({ icon: Icon, title, value, onValueChange }: SwitchItemProps) => (
    <View style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <Icon size={24} color="#FFD700" style={styles.settingIcon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#333333', true: '#FFD700' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ayarlar</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap</Text>
          <SettingItem
            icon={User}
            title="Profil Bilgileri"
            onPress={() => console.log('Profil bilgileri')}
            value=""
          />
          <SettingItem
            icon={Lock}
            title="Şifre Değiştir"
            onPress={() => console.log('Şifre değiştir')}
            value=""
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uygulama</Text>
          <SwitchItem
            icon={Moon}
            title="Koyu Tema"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <SettingItem
            icon={Globe}
            title="Dil"
            value={language}
            onPress={() => console.log('Dil seçimi')}
          />
          <SwitchItem
            icon={Bell}
            title="Bildirimler"
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gizlilik ve Güvenlik</Text>
          <SettingItem
            icon={Shield}
            title="Gizlilik Ayarları"
            onPress={() => console.log('Gizlilik ayarları')}
            value=""
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={24} color="#FF3B30" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 20,
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#1E1E1E',
    marginBottom: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  settingValue: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 8,
    fontFamily: 'Inter-Regular',
  },
  arrowIcon: {
    transform: [{ rotate: '90deg' }],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 24,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontFamily: 'Inter-SemiBold',
  },
}); 