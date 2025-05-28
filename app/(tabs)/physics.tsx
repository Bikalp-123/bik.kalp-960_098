import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, AtomIcon, Zap, RefreshCw, X } from 'lucide-react-native';

export default function PhysicsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories = [
    { id: '1', name: 'Mechanics', icon: <RefreshCw size={24} color="#007AFF" /> },
    { id: '2', name: 'Electromagnetism', icon: <Zap size={24} color="#5E5CE6" /> },
    { id: '3', name: 'Thermodynamics', icon: <AtomIcon size={24} color="#FF9500" /> },
    { id: '4', name: 'Optics', icon: <AtomIcon size={24} color="#FF2D55" /> },
    { id: '5', name: 'Quantum', icon: <AtomIcon size={24} color="#30D158" /> },
  ];

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.filter(category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const exampleProblems = [
    { 
      id: '2', 
      category: 'Mechanics', 
      problem: 'Calculate the force required to accelerate a 10kg mass at 5m/s²', 
      preview: 'We can use Newton\'s Second Law to solve this problem.' 
    },
    { 
      id: '4', 
      category: 'Electromagnetism', 
      problem: 'Calculate the electric field at a point 5m from a charge of 2μC', 
      preview: 'We can use Coulomb\'s Law to determine the electric field.' 
    },
    { 
      id: '5', 
      category: 'Thermodynamics', 
      problem: 'How much heat is required to raise the temperature of 500g of water by 20°C?', 
      preview: 'We\'ll need to use the specific heat capacity formula.' 
    },
  ];

  const filteredProblems = useMemo(() => {
    if (!searchQuery) return exampleProblems;
    const query = searchQuery.toLowerCase();
    return exampleProblems.filter(problem => 
      problem.category.toLowerCase().includes(query) ||
      problem.problem.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <ScrollView 
      style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        {showSearchInput ? (
          <View style={[styles.searchInputContainer, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}>
            <Search size={20} color={isDarkMode ? '#8E8E93' : '#8E8E93'} />
            <TextInput
              style={[styles.searchInput, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}
              placeholder="Search physics problems..."
              placeholderTextColor={isDarkMode ? '#8E8E93' : '#8E8E93'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            <TouchableOpacity onPress={() => {
              setSearchQuery('');
              setShowSearchInput(false);
            }}>
              <X size={20} color={isDarkMode ? '#8E8E93' : '#8E8E93'} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.searchBar, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => setShowSearchInput(true)}
          >
            <Search size={20} color={isDarkMode ? '#8E8E93' : '#8E8E93'} />
            <Text style={[styles.searchText, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
              Search physics problems...
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.categories}>
        <Text style={[styles.sectionTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Categories {filteredCategories.length < categories.length && `(${filteredCategories.length} results)`}
        </Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {filteredCategories.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={[styles.categoryItem, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
              onPress={() => router.push(`/physics/${category.name.toLowerCase()}`)}
            >
              {category.icon}
              <Text style={[styles.categoryText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputSection}>
        <Text style={[styles.sectionTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Enter Your Problem
        </Text>
        <TouchableOpacity 
          style={[styles.inputBox, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
          onPress={() => router.push('/input/physics')}
        >
          <Text style={[styles.inputPlaceholder, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
            Type or paste your physics problem here...
          </Text>
        </TouchableOpacity>
        
        <View style={styles.inputActions}>
          <TouchableOpacity 
            style={[styles.inputAction, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => router.push('/scan')}
          >
            <AtomIcon size={20} color="#007AFF" />
            <Text style={[styles.actionButtonText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Formula Editor
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.inputAction, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => router.push('/scan')}
          >
            <Search size={20} color="#5E5CE6" />
            <Text style={[styles.actionButtonText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Scan Problem
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.examplesSection}>
        <Text style={[styles.sectionTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Example Problems {filteredProblems.length < exampleProblems.length && `(${filteredProblems.length} results)`}
        </Text>
        
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <TouchableOpacity 
              key={problem.id}
              style={[styles.problemCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
              onPress={() => router.push(`/solution/${problem.id}`)}
            >
              <View>
                <Text style={[styles.categoryLabel, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
                  {problem.category}
                </Text>
                <Text style={[styles.problemText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                  {problem.problem}
                </Text>
                <Text style={[styles.previewText, {color: isDarkMode ? '#EBEBF5' : '#3A3A3C'}]}>
                  {problem.preview}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={[styles.noResults, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}>
            <Text style={[styles.noResultsText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              No problems found matching "{searchQuery}"
            </Text>
          </View>
        )}
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
  searchInputContainer: {
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  categories: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoriesScrollContent: {
    paddingRight: 16,
    gap: 12,
  },
  categoryItem: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  inputSection: {
    padding: 16,
  },
  inputBox: {
    padding: 16,
    borderRadius: 12,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputPlaceholder: {
    fontSize: 16,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  inputAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  examplesSection: {
    padding: 16,
  },
  problemCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  problemText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
  },
  noResults: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
  },
});