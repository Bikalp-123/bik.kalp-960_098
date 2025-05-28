import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';

export default function PhysicsProblemInput() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const [problem, setProblem] = useState('');
  const [category, setCategory] = useState('');
  const [units, setUnits] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!problem.trim() || !category.trim()) {
      setShowError(true);
      return;
    }
    // Here you would typically send the problem to your backend
    router.push('/solution/new');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          Enter Physics Problem
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.formCard, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Category</Text>
          <TextInput
            style={[
              styles.input,
              { color: isDarkMode ? '#FFFFFF' : '#000000', borderColor: isDarkMode ? '#38383A' : '#D1D1D6' }
            ]}
            placeholder="e.g., Mechanics, Thermodynamics, Electromagnetism"
            placeholderTextColor={isDarkMode ? '#8E8E93' : '#8E8E93'}
            value={category}
            onChangeText={(text) => {
              setCategory(text);
              setShowError(false);
            }}
          />

          <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Units Used</Text>
          <TextInput
            style={[
              styles.input,
              { color: isDarkMode ? '#FFFFFF' : '#000000', borderColor: isDarkMode ? '#38383A' : '#D1D1D6' }
            ]}
            placeholder="e.g., SI (meters, kilograms, seconds)"
            placeholderTextColor={isDarkMode ? '#8E8E93' : '#8E8E93'}
            value={units}
            onChangeText={setUnits}
          />

          <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Problem Description</Text>
          <TextInput
            style={[
              styles.problemInput,
              { color: isDarkMode ? '#FFFFFF' : '#000000', borderColor: isDarkMode ? '#38383A' : '#D1D1D6' }
            ]}
            placeholder="Type your physics problem here..."
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
              Please fill in all required fields before submitting
            </Text>
          )}

          <TouchableOpacity
            style={[styles.submitButton, { opacity: (!problem.trim() || !category.trim()) ? 0.7 : 1 }]}
            onPress={handleSubmit}
          >
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Submit Problem</Text>
          </TouchableOpacity>

          <Text style={[styles.tip, { color: isDarkMode ? '#8E8E93' : '#8E8E93' }]}>
            Tip: Include all relevant values and units in your problem description.
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
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