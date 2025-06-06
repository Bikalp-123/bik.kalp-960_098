import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Calculator, BookOpen, PlusSquare, X, Divide, Minus, Plus } from 'lucide-react-native';

export default function MathScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories = [
    { id: '1', name: 'Algebra', icon: <Calculator size={24} color="#007AFF" /> },
    { id: '2', name: 'Arithmetic', icon: <Plus size={24} color="#5E5CE6" /> },
    { id: '3', name: 'Geometry', icon: <PlusSquare size={24} color="#FF9500" /> },
    { id: '4', name: 'Trigonometry', icon: <Calculator size={24} color="#FF2D55" /> },
    { id: '5', name: 'Statistics', icon: <BookOpen size={24} color="#30D158" /> },
  ];

  const exampleProblems = [
    { 
      id: '1', 
      category: 'Algebra', 
      problem: 'Factorize: x² + 7x + 12', 
      preview: 'Find the factors of this quadratic expression' 
    },
    { 
      id: '2', 
      category: 'Geometry', 
      problem: 'Find the area of a triangle with sides 5, 6, and 7 using Heron\'s formula', 
      preview: 'Calculate the area using the semi-perimeter formula' 
    },
    { 
      id: '3', 
      category: 'Arithmetic', 
      problem: 'Solve: (23.45 + 67.89) × (45.67 - 12.34)', 
      preview: 'Use order of operations (PEMDAS) to solve this expression' 
    },
  ];

  const quickCalculations = [
    {
      id: '1',
      name: 'Factorization',
      icon: <Divide size={20} color="#007AFF" />,
      route: '/math/factorization'
    },
    {
      id: '2',
      name: 'Heron\'s Formula',
      icon: <PlusSquare size={20} color="#5E5CE6" />,
      route: '/math/herons-formula'
    },
    {
      id: '3',
      name: 'Basic Operations',
      icon: <Plus size={20} color="#FF9500" />,
      route: '/math/basic-operations'
    },
    {
      id: '4',
      name: 'Equations',
      icon: <Minus size={20} color="#FF2D55" />,
      route: '/math/equations'
    }
  ];

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
              placeholder="Search math problems..."
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
              Search math problems...
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.quickCalcSection}>
        <Text style={[styles.sectionTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Quick Calculations
        </Text>
        <View style={styles.quickCalcGrid}>
          {quickCalculations.map((calc) => (
            <TouchableOpacity
              key={calc.id}
              style={[styles.quickCalcButton, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
              onPress={() => router.push(calc.route)}
            >
              {calc.icon}
              <Text style={[styles.quickCalcText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                {calc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.categories}>
        <Text style={[styles.sectionTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Categories
        </Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={[styles.categoryItem, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
              onPress={() => router.push(`/math/${category.name.toLowerCase()}`)}
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
          onPress={() => router.push('/input/math')}
        >
          <Text style={[styles.inputPlaceholder, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
            Type or paste your math problem here...
          </Text>
        </TouchableOpacity>
        
        <View style={styles.inputActions}>
          <TouchableOpacity 
            style={[styles.inputAction, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => router.push('/scan')}
          >
            <Calculator size={20} color="#007AFF" />
            <Text style={[styles.actionButtonText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Equation Editor
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
          Example Problems
        </Text>
        
        {exampleProblems.map((problem) => (
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
        ))}
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
  quickCalcSection: {
    padding: 16,
  },
  quickCalcGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  quickCalcButton: {
    flex: 1,
    minWidth: '45%',
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
  quickCalcText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
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
});