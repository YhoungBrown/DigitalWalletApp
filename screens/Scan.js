import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Scan = () => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // Track whether the component is focused

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Called when the component gains focus
      setIsFocused(true);

      return () => {
        // Cleanup logic when the component loses focus or is unmounted
        setIsFocused(false);
        // For example, stop the camera preview
        // This might be specific to the Expo Camera API; check the documentation
      };
    }, [])
  );

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  function toggleCameraType() {
    setType((prevType) =>
      prevType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
      {isFocused && ( // Render camera only if the component is focused
        <Camera
          style={{ flex: 1 }}
          captureAudio={false}
          flashMode={Camera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'Camera is required for barcode scanning',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          type={type}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 50,
              right: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.white,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={toggleCameraType}
            >
                {/**Flip Camera icon below */}
              <MaterialCommunityIcons name="camera-flip" size={24} color= {COLORS.primary} />
              <Text style={{ color: COLORS.black, paddingLeft: 2, }}>Flip</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default Scan;
