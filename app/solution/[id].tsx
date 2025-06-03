import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, Animated } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, Share2, ThumbsUp, ThumbsDown, Copy, CircleCheck as CheckCircle } from 'lucide-react-native';

interface Step {
  id: string;
  text: string;
  explanation: string;
  formula?: string;
  result?: string;
}

interface Solution {
  id: string;
  type: string;
  title: string;
  text: string;
  steps: Step[];
}

export default function SolutionScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'like' | 'dislike' | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showCopied, setShowCopied] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const getSolution = (problemId: string): Solution => {
    const solutions: Record<string, Solution> = {
      'math-1': {
        id: 'math-1',
        type: 'Algebra',
        title: 'Quadratic Factorization',
        text: 'Factorize: x² + 7x + 12',
        steps: [
          {
            id: '1',
            text: 'Identify the coefficients',
            explanation: 'In the expression x² + 7x + 12:\na = 1 (coefficient of x²)\nb = 7 (coefficient of x)\nc = 12 (constant term)',
            formula: 'ax² + bx + c',
          },
          {
            id: '2',
            text: 'Find factors of the constant term',
            explanation: 'Find factors of 12 that add up to 7:\n3 and 4 are factors of 12 that add to 7',
            formula: '3 + 4 = 7 and 3 × 4 = 12',
          },
          {
            id: '3',
            text: 'Write the factored expression',
            explanation: 'Use the factors to write the expression as a product of two binomials',
            formula: 'x² + 7x + 12 = (x + 3)(x + 4)',
            result: 'The factored expression is (x + 3)(x + 4)',
          },
        ],
      },
      'math-2': {
        id: 'math-2',
        type: 'Geometry',
        title: "Heron's Formula",
        text: 'Find the area of a triangle with sides 5, 6, and 7',
        steps: [
          {
            id: '1',
            text: 'Calculate semi-perimeter',
            explanation: 'First, find the semi-perimeter (s) by adding all sides and dividing by 2',
            formula: 's = (a + b + c)/2 = (5 + 6 + 7)/2 = 9',
          },
          {
            id: '2',
            text: "Apply Heron's Formula",
            explanation: 'Use the formula: Area = √(s(s-a)(s-b)(s-c))',
            formula: '√(9(9-5)(9-6)(9-7))',
          },
          {
            id: '3',
            text: 'Solve the equation',
            explanation: 'Simplify the expression under the square root',
            formula: '√(9 × 4 × 3 × 2) = √216',
            result: 'The area of the triangle is 14.70 square units',
          },
        ],
      },
      'math-3': {
        id: 'math-3',
        type: 'Arithmetic',
        title: 'Complex Calculation',
        text: 'Solve: (23.45 + 67.89) × (45.67 - 12.34)',
        steps: [
          {
            id: '1',
            text: 'Solve parentheses first',
            explanation: 'Calculate the sums and differences inside parentheses',
            formula: '23.45 + 67.89 = 91.34\n45.67 - 12.34 = 33.33',
          },
          {
            id: '2',
            text: 'Multiply the results',
            explanation: 'Multiply the results from step 1',
            formula: '91.34 × 33.33',
          },
          {
            id: '3',
            text: 'Calculate final result',
            explanation: 'Perform the multiplication',
            formula: '91.34 × 33.33 = 3,043.36',
            result: 'The answer is 3,043.36',
          },
        ],
      },
    };

    return solutions[problemId] || solutions['math-1'];
  };

  const solution = getSolution(id as string);

  const handleCopyToClipboard = () => {
    setShowCopied(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setShowCopied(false));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStepIndex < solution.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStepIndex, solution.steps.length]);

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={[styles.header, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={[styles.titleType, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
            {solution.type}
          </Text>
          <Text 
            style={[styles.title, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}
            numberOfLines={1}
          >
            {solution.title}
          </Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark 
              size={24} 
              color={isBookmarked ? '#FF9500' : (isDarkMode ? '#FFFFFF' : '#000000')}
              fill={isBookmarked ? '#FF9500' : 'none'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {/* Share functionality */}}
          >
            <Share2 size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.problemCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}>
          <Text style={[styles.problemLabel, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
            Problem
          </Text>
          <Text style={[styles.problemText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
            {solution.text}
          </Text>
          <View style={styles.copyContainer}>
            <TouchableOpacity 
              style={[styles.copyButton, {backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E5EA'}]}
              onPress={handleCopyToClipboard}
            >
              <Copy size={16} color={isDarkMode ? '#FFFFFF' : '#000000'} />
              <Text style={[styles.copyText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                Copy
              </Text>
            </TouchableOpacity>
            
            {showCopied && (
              <Animated.View 
                style={[
                  styles.copiedNotification,
                  {backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E5EA'},
                  {opacity: fadeAnim}
                ]}
              >
                <CheckCircle size={16} color="#30D158" />
                <Text style={[styles.copiedText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                  Copied!
                </Text>
              </Animated.View>
            )}
          </View>
        </View>
        
        <View style={styles.solutionContainer}>
          {solution.steps.map((step, index) => (
            <View 
              key={step.id}
              style={[
                styles.stepCard, 
                {
                  backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
                  opacity: index > currentStepIndex ? 0.5 : 1,
                }
              ]}
            >
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumber, {backgroundColor: '#007AFF'}]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={[styles.stepTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                  {step.text}
                </Text>
              </View>
              
              <Text style={[styles.stepExplanation, {color: isDarkMode ? '#EBEBF5' : '#3A3A3C'}]}>
                {step.explanation}
              </Text>
              
              {step.formula && (
                <Text style={[styles.formula, {color: isDarkMode ? '#007AFF' : '#007AFF'}]}>
                  {step.formula}
                </Text>
              )}
              
              {step.result && (
                <Text style={[styles.result, {color: isDarkMode ? '#30D158' : '#34C759'}]}>
                  {step.result}
                </Text>
              )}
            </View>
          ))}
        </View>
        
        <View style={[styles.feedbackCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}>
          <Text style={[styles.feedbackTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
            Was this solution helpful?
          </Text>
          
          <View style={styles.feedbackButtons}>
            <TouchableOpacity 
              style={[
                styles.feedbackButton,
                feedbackGiven === 'like' && styles.feedbackButtonActive,
                {borderColor: isDarkMode ? '#38383A' : '#D1D1D6'}
              ]}
              onPress={() => setFeedbackGiven('like')}
            >
              <ThumbsUp 
                size={20} 
                color={feedbackGiven === 'like' ? '#30D158' : (isDarkMode ? '#FFFFFF' : '#000000')} 
              />
              <Text 
                style={[
                  styles.feedbackButtonText,
                  {color: feedbackGiven === 'like' ? '#30D158' : (isDarkMode ? '#FFFFFF' : '#000000')}
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.feedbackButton,
                feedbackGiven === 'dislike' && styles.feedbackButtonActive,
                {borderColor: isDarkMode ? '#38383A' : '#D1D1D6'}
              ]}
              onPress={() => setFeedbackGiven('dislike')}
            >
              <ThumbsDown 
                size={20} 
                color={feedbackGiven === 'dislike' ? '#FF453A' : (isDarkMode ? '#FFFFFF' : '#000000')} 
              />
              <Text 
                style={[
                  styles.feedbackButtonText,
                  {color: feedbackGiven === 'dislike' ? '#FF453A' : (isDarkMode ? '#FFFFFF' : '#000000')}
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
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
  titleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  titleType: {
    fontSize: 14,
  },
  title: {
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
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
  problemLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  problemText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  copyText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  copiedNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginLeft: 8,
  },
  copiedText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  solutionContainer: {
    marginTop: 24,
    gap: 12,
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
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  step

NumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  stepExplanation: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  formula: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 12,
  },
  result: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
  feedbackCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  feedbackButtonActive: {
    borderWidth: 1.5,
  },
  feedbackButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});