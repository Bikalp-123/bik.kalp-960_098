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

  // This would normally come from an API or database
  const getSolution = (problemId: string): Solution => {
    const solutions: Record<string, Solution> = {
      'math-1': {
        id: 'math-1',
        type: 'Algebra',
        title: 'Quadratic Equation',
        text: 'Solve the quadratic equation: x² + 5x + 6 = 0',
        steps: [
          {
            id: '1',
            text: 'Factor the equation',
            explanation: 'To solve this quadratic equation, we\'ll factor it into two binomials.',
            formula: 'x² + 5x + 6 = (x + 2)(x + 3)',
          },
          {
            id: '2',
            text: 'Set each factor to zero',
            explanation: 'When the product of factors equals zero, at least one factor must be zero.',
            formula: 'x + 2 = 0  or  x + 3 = 0',
          },
          {
            id: '3',
            text: 'Solve for x',
            explanation: 'Subtract the constant from both sides in each equation.',
            formula: 'x = -2  or  x = -3',
            result: 'The solutions are x = -2 and x = -3',
          },
        ],
      },
      'physics-1': {
        id: 'physics-1',
        type: 'Mechanics',
        title: 'Force Calculation',
        text: 'Calculate the force needed to accelerate a 10kg mass at 5 m/s²',
        steps: [
          {
            id: '1',
            text: "Apply Newton's Second Law",
            explanation: "We'll use F = ma where m is mass and a is acceleration",
            formula: 'F = ma',
          },
          {
            id: '2',
            text: 'Substitute the values',
            explanation: 'Mass (m) = 10 kg, Acceleration (a) = 5 m/s²',
            formula: 'F = (10 kg)(5 m/s²)',
          },
          {
            id: '3',
            text: 'Calculate the force',
            explanation: 'Multiply the numbers and include the units',
            formula: 'F = 50 N',
            result: 'The required force is 50 Newtons',
          },
        ],
      },
      'chemistry-1': {
        id: 'chemistry-1',
        type: 'Stoichiometry',
        title: 'Balancing Chemical Equation',
        text: 'Balance the equation: Fe + O₂ → Fe₂O₃',
        steps: [
          {
            id: '1',
            text: 'Count atoms on each side',
            explanation: 'Left side: 1 Fe, 2 O\nRight side: 2 Fe, 3 O',
            formula: 'Fe + O₂ → Fe₂O₃',
          },
          {
            id: '2',
            text: 'Balance iron atoms',
            explanation: 'Add coefficient 2 to Fe on the left',
            formula: '2Fe + O₂ → Fe₂O₃',
          },
          {
            id: '3',
            text: 'Balance oxygen atoms',
            explanation: 'Add coefficient 3/2 to O₂ on the left',
            formula: '2Fe + 3/2O₂ → Fe₂O₃',
          },
          {
            id: '4',
            text: 'Multiply all coefficients by 2',
            explanation: 'To eliminate fractions, multiply everything by 2',
            formula: '4Fe + 3O₂ → 2Fe₂O₃',
            result: 'The balanced equation is: 4Fe + 3O₂ → 2Fe₂O₃',
          },
        ],
      },
    };

    return solutions[problemId] || solutions['math-1'];
  };

  const solution = getSolution(id as string);

  const handleCopyToClipboard = () => {
    // In a real app, implement actual copying here
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
  stepNumberText: {
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