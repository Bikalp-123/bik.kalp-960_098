import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Bookmark, Calculator, Atom as AtomIcon, Trash2, Search, BookOpen } from 'lucide-react-native';

export default function HistoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [selectedTab, setSelectedTab] = useState('all');
  
  const historyData = [
    { 
      id: '1', 
      type: 'math', 
      subject: 'Algebra', 
      problem: 'Solve for x: 2x + 5 = 13', 
      timestamp: '2 hours ago',
      bookmarked: true,
    },
    { 
      id: '2', 
      type: 'physics', 
      subject: 'Mechanics', 
      problem: 'Calculate the acceleration of a 10kg mass with 50N force', 
      timestamp: 'Yesterday',
      bookmarked: false,
    },
    { 
      id: '3', 
      type: 'math', 
      subject: 'Calculus', 
      problem: 'Find the derivative of f(x) = x³ + 4x² - 2x + 7', 
      timestamp: '3 days ago',
      bookmarked: true,
    },
    { 
      id: '4', 
      type: 'physics', 
      subject: 'Electromagnetics', 
      problem: 'Calculate the electric field at a point 5m from a charge of 2μC', 
      timestamp: '1 week ago',
      bookmarked: false,
    },
  ];
  
  const filteredData = selectedTab === 'all' 
    ? historyData 
    : selectedTab === 'bookmarked' 
      ? historyData.filter(item => item.bookmarked)
      : historyData.filter(item => item.type === selectedTab);

  const renderHistoryItem = ({ item }: { item: typeof historyData[0] }) => (
    <TouchableOpacity 
      style={[styles.historyItem, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
      onPress={() => router.push(`/solution/${item.id}`)}
    >
      <View style={styles.itemHeader}>
        <View style={styles.subjectContainer}>
          {item.type === 'math' ? (
            <Calculator size={20} color="#007AFF" />
          ) : (
            <AtomIcon size={20} color="#5E5CE6" />
          )}
          <Text style={[styles.subjectText, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
            {item.subject}
          </Text>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Bookmark 
            size={20} 
            color={item.bookmarked ? '#FF9500' : (isDarkMode ? '#8E8E93' : '#C7C7CC')}
            fill={item.bookmarked ? '#FF9500' : 'none'}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.problemText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
        {item.problem}
      </Text>
      
      <View style={styles.itemFooter}>
        <Text style={[styles.timestampText, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
          {item.timestamp}
        </Text>
        
        <TouchableOpacity style={styles.deleteButton}>
          <Trash2 size={18} color={isDarkMode ? '#FF453A' : '#FF3B30'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}>
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={[styles.searchBar, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
          onPress={() => router.push('/history/search')}
        >
          <Search size={20} color={isDarkMode ? '#8E8E93' : '#8E8E93'} />
          <Text style={[styles.searchText, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
            Search history...
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <ScrollableTab 
          tabs={[
            { id: 'all', label: 'All', icon: <BookOpen size={16} /> },
            { id: 'math', label: 'Math', icon: <Calculator size={16} /> },
            { id: 'physics', label: 'Physics', icon: <AtomIcon size={16} /> },
            { id: 'bookmarked', label: 'Bookmarked', icon: <Bookmark size={16} /> },
          ]}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          isDarkMode={isDarkMode}
        />
      </View>
      
      <FlatList
        data={filteredData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              No history items found
            </Text>
          </View>
        }
      />
    </View>
  );
}

interface ScrollableTabProps {
  tabs: Array<{id: string, label: string, icon: React.ReactNode}>;
  selectedTab: string;
  onSelectTab: (tabId: string) => void;
  isDarkMode: boolean;
}

function ScrollableTab({ tabs, selectedTab, onSelectTab, isDarkMode }: ScrollableTabProps) {
  return (
    <View style={[styles.tabBar, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}>
      {tabs.map((tab) => (
        <TouchableOpacity 
          key={tab.id}
          style={[
            styles.tab,
            selectedTab === tab.id && [
              styles.selectedTab,
              {backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E5EA'}
            ]
          ]}
          onPress={() => onSelectTab(tab.id)}
        >
          <View style={styles.tabIconContainer}>
            {React.cloneElement(tab.icon as React.ReactElement, { 
              color: selectedTab === tab.id ? '#007AFF' : (isDarkMode ? '#8E8E93' : '#8E8E93')
            })}
          </View>
          <Text style={[
            styles.tabText,
            {color: selectedTab === tab.id ? '#007AFF' : (isDarkMode ? '#8E8E93' : '#8E8E93')}
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  selectedTab: {
    borderRadius: 8,
  },
  tabIconContainer: {
    marginRight: 4,
  },
  tabText: {
    fontWeight: '500',
    fontSize: 13,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  historyItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectText: {
    marginLeft: 6,
    fontSize: 14,
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  problemText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestampText: {
    fontSize: 14,
  },
  deleteButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
  },
});