import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Chrome as Home, BookOpen, History, Settings, Camera, FlaskRound as Flask } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const activeColor = isDarkMode ? '#007AFF' : '#007AFF';
  const inactiveColor = isDarkMode ? '#8E8E93' : '#8E8E93';
  const backgroundColor = isDarkMode ? '#1C1C1E' : '#FFFFFF';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopColor: isDarkMode ? '#38383A' : '#E5E5EA',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: backgroundColor,
          borderBottomColor: isDarkMode ? '#38383A' : '#E5E5EA',
          borderBottomWidth: 0.5,
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
          headerTitle: 'MathPhysics Solver',
        }}
      />
      <Tabs.Screen
        name="math"
        options={{
          title: 'Math',
          tabBarIcon: ({ size, color }) => <BookOpen size={size} color={color} />,
          headerTitle: 'Mathematics',
        }}
      />
      <Tabs.Screen
        name="chemistry"
        options={{
          title: 'Chemistry',
          tabBarIcon: ({ size, color }) => <Flask size={size} color={color} />,
          headerTitle: 'Chemistry',
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ size, color }) => <Camera size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ size, color }) => <History size={size} color={color} />,
          headerTitle: 'Solution History',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}