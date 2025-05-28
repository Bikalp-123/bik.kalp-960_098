import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react-native';

export default function NewSolutionScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to get solution
    setTimeout(() => {
      setSolution({
        problem: "Solve for x: 2x + 5 = 13",
        steps: [
          {
            step: 1,
            content: "2x + 5 = 13",
            explanation: "Starting equation"
          },
          {
            step: 2,
            content: "2x = 13 - 5",
            explanation: "Subtract 5 from both sides"
          },
          {
            step: 3,
            content: "2x = 8",
            explanation: "Simplify the right side"
          },
          {
            step: 4,
            content: "x = 8 ÷ 2",
            explanation: "Divide both sides by 2"
          },
          {
            step: 5,
            content: "x = 4",
            explanation: "Final answer"
          }
        ]
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}>
      <View style={[styles.header, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Solution
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Bookmark size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.loadingText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Solving your problem...
            </Text>
          </View>
        ) : (
          <View style={styles.solutionContainer}>
            <View style={[styles.problemCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}>
              <Text style={[styles.problemText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                {solution.problem}
              </Text>
            </View>
            
            {solution.steps.map((step: any, index: number) => (
              <View 
                key={step.step}
                style={[styles.stepCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
              >
                <Text style={[styles.stepContent, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                  {step.content}
                </Text>
                <Text style={[styles.stepExplanation, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
                  {step.explanation}
                </Text>
              </View>
            ))}
          </View>
        )}
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
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
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
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  solutionContainer: {
    gap: 16,
  },
  problemCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  problemText: {
    fontSize: 18,
    fontWeight: '600',
  },
  stepCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepContent: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepExplanation: {
    fontSize: 14,
    textAlign: 'center',
  },
});