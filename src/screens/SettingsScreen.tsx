import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore, Colors } from '../store/useThemeStore';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  // Reusable Option Row Component for a consistent look
  const Option = ({ icon, title, value, hasSwitch = false, onValueChange, color }: any) => (
    <TouchableOpacity 
      style={[styles.optionRow, { borderBottomColor: theme.border }]}
      disabled={hasSwitch}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#252525' : '#f0f0f0' }]}>
            <Ionicons name={icon} size={20} color={color || theme.text} />
        </View>
        <Text style={[styles.optionText, { color: theme.text }]}>{title}</Text>
      </View>
      
      {hasSwitch ? (
        <Switch 
          value={value} 
          onValueChange={onValueChange} 
          trackColor={{ false: '#767577', true: Colors.light.primary }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={theme.subText} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImagePlaceholder}>
            <Ionicons name="person" size={40} color={theme.subText} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>Guest User</Text>
            <Text style={[styles.userEmail, { color: theme.subText }]}>Free Version</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={{ color: Colors.light.primary, fontWeight: 'bold' }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionHeader}>Appearance</Text>
          <Option 
            icon="moon" 
            title="Dark Mode" 
            hasSwitch 
            value={isDarkMode} 
            onValueChange={toggleTheme}
            color="#A29BFE"
          />

          <Text style={styles.sectionHeader}>Audio Settings</Text>
          <Option icon="headset" title="Audio Quality" color="#FF7675" />
          <Option icon="options" title="Equalizer" color="#55E6C1" />
          <Option icon="download" title="Download Path" color="#74b9ff" />

          <Text style={styles.sectionHeader}>Account & Storage</Text>
          <Option icon="cloud-upload" title="Sync Playlists" color="#fab1a0" />
          <Option icon="trash" title="Clear Cache" color="#ff7675" />

          <Text style={styles.sectionHeader}>Support</Text>
          <Option icon="star" title="Rate the App" color="#fdcb6e" />
          <Option icon="help-circle" title="Help Center" color="#81ecec" />
          <Option icon="information-circle" title="About Version 1.0.0" color={theme.subText} />

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: { flex: 1, marginLeft: 15 },
  userName: { fontSize: 20, fontWeight: 'bold' },
  userEmail: { fontSize: 14, marginTop: 2 },
  editButton: { padding: 8 },

  content: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionHeader: { 
    fontSize: 13, 
    color: '#FF6B00', 
    fontWeight: 'bold', 
    marginTop: 25, 
    marginBottom: 10, 
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  optionRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 15,
    borderBottomWidth: 0.5,
  },
  iconContainer: { 
    width: 38, 
    height: 38, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  optionText: { fontSize: 16, fontWeight: '500' },
  
  logoutButton: {
    marginTop: 40,
    backgroundColor: 'rgba(255, 118, 117, 0.1)',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: { color: '#ff7675', fontWeight: 'bold', fontSize: 16 },
});