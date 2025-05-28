import { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calculator, Atom as AtomIcon, AlignJustify, BookOpen, ChevronRight, FlaskRound as Flask } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const navigateToSubject = useCallback((subject: string) => {
    if (subject === 'math') {
      router.push('/math');
    } else if (subject === 'physics') {
      router.push('/physics');
    }
  }, [router]);

  const recentProblems = [
    { id: '1', title: 'Quadratic Equation', type: 'Algebra', preview: 'x² + 5x + 6 = 0' },
    { id: '2', title: 'Force Calculation', type: 'Mechanics', preview: 'F = m×a, m = 10kg, a = 5m/s²' },
    { id: '3', title: 'Integration', type: 'Calculus', preview: '∫ 2x + 3 dx' },
  ];

  return (
    <ScrollView 
      style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Get step-by-step solutions
        </Text>
        <Text style={[styles.subText, {color: isDarkMode ? '#EBEBF5' : '#3A3A3C'}]}>
          Solve any math, physics, or chemistry problem instantly
        </Text>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionButton, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => router.push('/math')}
          >
            <View style={styles.iconContainer}>
              <Calculator size={24} color="#007AFF" />
            </View>
            <Text style={[styles.actionText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Math Problems
            </Text>
            <ChevronRight size={16} color={isDarkMode ? '#8E8E93' : '#C7C7CC'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => router.push('/physics')}
          >
            <View style={styles.iconContainer}>
              <AtomIcon size={24} color="#5E5CE6" />
            </View>
            <Text style={[styles.actionText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Physics Problems
            </Text>
            <ChevronRight size={16} color={isDarkMode ? '#8E8E93' : '#C7C7CC'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => router.push('/chemistry')}
          >
            <View style={styles.iconContainer}>
              <Flask size={24} color="#FF9500" />
            </View>
            <Text style={[styles.actionText, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Chemistry Problems
            </Text>
            <ChevronRight size={16} color={isDarkMode ? '#8E8E93' : '#C7C7CC'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Recent Solutions
        </Text>
        
        {recentProblems.map((problem) => (
          <TouchableOpacity 
            key={problem.id}
            style={[styles.problemCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => router.push(`/solution/${problem.id}`)}
          >
            <View style={styles.problemInfo}>
              <Text style={[styles.problemTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
                {problem.title}
              </Text>
              <Text style={[styles.problemType, {color: isDarkMode ? '#8E8E93' : '#8E8E93'}]}>
                {problem.type}
              </Text>
              <Text style={[styles.problemPreview, {color: isDarkMode ? '#EBEBF5' : '#3A3A3C'}]}>
                {problem.preview}
              </Text>
            </View>
            <ChevronRight size={20} color={isDarkMode ? '#8E8E93' : '#C7C7CC'} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Popular Categories
        </Text>
        
        <View style={styles.categoryContainer}>
          <TouchableOpacity 
            style={[styles.categoryCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => navigateToSubject('math')}
          >
            <BookOpen size={24} color="#007AFF" />
            <Text style={[styles.categoryTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Algebra
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => navigateToSubject('math')}
          >
            <AlignJustify size={24} color="#FF9500" />
            <Text style={[styles.categoryTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Calculus
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => navigateToSubject('physics')}
          >
            <AtomIcon size={24} color="#5E5CE6" />
            <Text style={[styles.categoryTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Mechanics
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, {backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF'}]}
            onPress={() => router.push('/chemistry')}
          >
            <Flask size={24} color="#FF2D55" />
            <Text style={[styles.categoryTitle, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
              Chemistry
            </Text>
          </TouchableOpacity>
        </View>
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
  welcomeSection: {
    padding: 16,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    marginBottom: 24,
  },
  quickActions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  sectionContainer: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  problemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  problemInfo: {
    flex: 1,
  },
  problemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  problemType: {
    fontSize: 14,
    marginBottom: 6,
  },
  problemPreview: {
    fontSize: 14,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  categoryImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});