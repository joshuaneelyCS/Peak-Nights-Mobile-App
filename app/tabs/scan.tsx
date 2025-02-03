import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult, BarcodeSettings } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { server } from '../../constants/serverConnection'
import { Dimensions } from 'react-native';
import debounce from 'lodash.debounce';

const API_URL_MEMBER_VERIFY = `http://${server.port}:5001/members/verify`

export default function App() {

  const { width, height } = Dimensions.get('window'); 

  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false); // State to handle scan results
  const [scanData, setScanData] = useState<null | String>(null);

  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<null | 'success' | 'failure'>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = debounce(async (scanningResult: BarcodeScanningResult) => {
    if (scanned) return;
  
    const { data, bounds } = scanningResult;

    if (!bounds) return; // ✅ Some devices might not support bounds

    const { origin, size } = bounds; 
    const centerX = origin.x + size.width / 2;
    const centerY = origin.y + size.height / 2;

    // ✅ Check if the scan is in the center 40% of the screen
    if (centerX < width * 0.4 || centerX > width * 0.6 || centerY < height * 0.4 || centerY > height * 0.6) {
      return; // ❌ Ignore if QR code is not centered
    }

    setScanned(true);
    setLoading(true);
    console.log("✅ Scanned:", data);
  
    try {
      const response = await axios.post(API_URL_MEMBER_VERIFY, { user_id: data });
  
      if (response.data.success) {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('failure');
      }
    } catch (error) {

      setVerificationStatus('failure');
    } finally {
      setLoading(false);
      setTimeout(() => setScanned(false), 4000);
    }
  }, 100); // ✅ Prevents rapid scanning within 1 second

  const resetScanner = () => {
    setScanned(false);
    setScanData(null);
    setVerificationStatus(null);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned = {(scanningResult: BarcodeScanningResult) => {
          if (scanned == false) {
            handleBarCodeScanned(scanningResult);
          }
        }} // Only enable scanning when not scanned
      >
        <View style={styles.overlay}>
          <Image source={require('/Users/joshuaneely/Desktop/Peak-Nights-0.3/assets/images/white-square.png')} // Path to your white square image
            style={styles.qrOutline}/>
        </View>
      </CameraView>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Verifying...</Text>
        </View>
      )}

      {verificationStatus === 'success' && (
        <View style={[styles.feedbackContainer, { backgroundColor: 'green' }]}>
          <Text style={styles.feedbackText}>Verified ✅</Text>
          <Button title="Scan Next" onPress={resetScanner} />
        </View>
      )}

      {verificationStatus === 'failure' && (
        <View style={[styles.feedbackContainer, { backgroundColor: 'red' }]}>
          <Text style={styles.feedbackText}>Invalid QR Code ❌</Text>
          <Button title="Scan Again" onPress={resetScanner} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' },
  qrOutline: {
    width: 400, // Adjust size based on your preference
    height: 400,
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
  },
  feedbackContainer: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center' },
  feedbackText: { 
    fontSize: 24, 
    color: 'white', 
    fontWeight: 'bold' },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
