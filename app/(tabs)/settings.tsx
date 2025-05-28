import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import { Moon, Sun, Bell, Heart, Info, Shield, Globe, Brush, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemColorScheme === 'dark');
  const [notifications, setNotifications] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  
  // Simulate the actual theme by respecting the user preference
  const isDarkMode = darkMode;

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          id: 'darkMode',
          icon: darkMode ? <Moon size={22} color="#5E5CE6" /> : <Sun size={22} color="#FF9500" />,
          label: 'Dark Mode',
          type: 'switch',
          value: darkMode,
          onValueChange: setDarkMode,
        },
        {
          id: 'theme',
          icon: <Brush size={22} color="#FF375F" />,
          label: 'Theme',
          type: 'link',
          detail: 'Default',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'notifications',
          icon: <Bell size={22} color="#30D158" />,
          label: 'Push Notifications',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          id: 'saveHistory',
          icon: <Shield size={22} color="#007AFF" />,
          label: 'Save History',
          type: 'switch',
          value: saveHistory,
          onValueChange: setSaveHistory,
        },
        {
          id: 'clearHistory',
          icon: <Brush size={22} color="#FF375F" />,
          label: 'Clear History',
          type: 'link',
          detail: '',
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          id: 'rate',
          icon: <Heart size={22} color="#FF2D55" />,
          label: 'Rate the App',
          type: 'link',
          detail: '',
        },
        {
          id: 'language',
          icon: <Globe size={22} color="#5856D6" />,
          label: 'Language',
          type: 'link',
          detail: 'English',
        },
        {
          id: 'about',
          icon: <Info size={22} color="#007AFF" />,
          label: 'About',
          type: 'link',
          detail: 'v1.0.0',
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    return (
      <View 
        key={item.id}
        style={[
          styles.settingItem, 
          {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}
        ]}
      >
        <View style={styles.settingItemLeft}>
          {item.icon}
          <Text style={[styles.settingLabel, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
            {item.label}
          </Text>
        </View>
        
        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#D1D1D6"
          />
        ) : (
          <TouchableOpacity style={styles.settingItemRight}>
            {item.detail ? (
              <Text style={[styles.settingDetail, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
                {item.detail}
              </Text>
            ) : null}
            <ChevronRight size={20} color={isDarkMode ? '#8E8E93' : '#C7C7CC'} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView 
      style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Settings
        </Text>
      </View>
      
      {settingsSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
            {section.title}
          </Text>
          <View style={[
            styles.sectionContent, 
            {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}
          ]}>
            {section.items.map(renderSettingItem)}
          </View>
        </View>
      ))}
      
      <View style={styles.footer}>
        <Text style={[styles.footerText, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
          Made with ♥ for students
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 16,
    textTransform: 'uppercase',
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#38383A',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  settingDetail: {
    fontSize: 16,
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
  },
});