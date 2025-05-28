import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Camera, X, Image, Aperture, RefreshCw } from 'lucide-react-native';

export default function ScanScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  // Handle web platform where camera might not be available
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}>
        <Text style={[styles.text, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Camera is not available in web browser. Please use a mobile device.
        </Text>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}>
        <Text style={[styles.text, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          Checking camera permissions...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, {backgroundColor: isDarkMode ? '#000000' : '#F2F2F7'}]}>
        <Text style={[styles.text, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
          We need camera permission to scan math and physics problems
        </Text>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#007AFF'}]}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    try {
      setIsTakingPicture(true);
      // Simulate picture taking - in a real app, you would capture the image here
      setTimeout(() => {
        setIsTakingPicture(false);
        router.push('/scan/result');
      }, 1000);
    } catch (error) {
      console.error('Failed to take picture:', error);
      setIsTakingPicture(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => router.back()}
            >
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Text style={styles.headerText}>Scan Problem</Text>
            
            <TouchableOpacity 
              style={styles.galleryButton}
              onPress={() => router.push('/scan/gallery')}
            >
              <Image size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.scanFrame}>
            <View style={styles.frameBorder} />
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <RefreshCw size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.captureButton,
                isTakingPicture && styles.captureButtonActive
              ]}
              onPress={takePicture}
              disabled={isTakingPicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.helpButton}
              onPress={() => router.push('/scan/tips')}
            >
              <Aperture size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  galleryButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    flex: 1,
    margin: 40,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameBorder: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderStyle: 'dashed',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 40,
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  captureButtonInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'white',
  },
  helpButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});