import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Calculator } from 'lucide-react-native';

export default function MathCategoryInput() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const [problem, setProblem] = useState('');
  const [showError, setShowError] = useState(false);

  const categoryTips = {
    algebra: "Include all variables and equations clearly",
    calculus: "Specify if it's differentiation, integration, or limits",
    geometry: "Include all measurements and angles if applicable",
    trigonometry: "Specify angle units (degrees or radians)",
    statistics: "Include sample size and data points if relevant"
  };

  const handleSubmit = () => {
    if (!problem.trim()) {
      setShowError(true);
      return;
    }
    router.push('/solution/new');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Math'} Problem
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.formCard, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
          <View style={styles.categoryHeader}>
            <Calculator size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
            <Text style={[styles.categoryTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Math'} Problem Solver
            </Text>
          </View>

          <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Problem Description</Text>
          <TextInput
            style={[
              styles.problemInput,
              { color: isDarkMode ? '#FFFFFF' : '#000000', borderColor: isDarkMode ? '#38383A' : '#D1D1D6' }
            ]}
            placeholder={`Type your ${category} problem here...`}
            placeholderTextColor={isDarkMode ? '#8E8E93' : '#8E8E93'}
            multiline
            textAlignVertical="top"
            value={problem}
            onChangeText={(text) => {
              setProblem(text);
              setShowError(false);
            }}
          />

          {showError && (
            <Text style={styles.errorText}>
              Please enter your problem before submitting
            </Text>
          )}

          <TouchableOpacity
            style={[styles.submitButton, { opacity: !problem.trim() ? 0.7 : 1 }]}
            onPress={handleSubmit}
          >
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Solve Problem</Text>
          </TouchableOpacity>

          <Text style={[styles.tip, { color: isDarkMode ? '#8E8E93' : '#8E8E93' }]}>
            Tip: {categoryTips[category as keyof typeof categoryTips] || "Be as specific as possible with your problem description."}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  problemInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    height: 200,
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tip: {
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
});