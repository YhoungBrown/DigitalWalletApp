import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES, FONTS, icons, Images, images } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';

const Scan = ({navigation}) => {
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


  function renderHeader() {
    return(
      <View style={{
        flexDirection: 'row',
        marginTop: SIZES.padding * 4,
        paddingHorizontal: SIZES.padding * 3,
      }}>
          <TouchableOpacity
          style={{
            width: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate("Home")}>
              <Image source={icons.close}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.white
                }}
              />
          </TouchableOpacity>

          <View 
            style={{
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center',}}>
            <Text style={{color: COLORS.white}}>
            Scan For Payment</Text>
          </View>

          <TouchableOpacity style={{
            height: 45,
            width: 45,
            backgroundColor: COLORS.green,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log("Info")}>
              <Image 
                source={icons.info}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.white
                }}
              />
          </TouchableOpacity>
      </View>
    )
  }


  function renderScanFocus() {
    return(
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
          <Image
          source={images.focus}
          resizeMode= "stretch"
          style={{
            width: 200,
            height: 300,
            marginTop: -250,
          }}
          />
      </View>
    )
  }


  function renderPaymentMethods() {
    return(
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0, 
        right: 0,
        height: 220,
        padding: SIZES.padding * 3,
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
        backgroundColor: COLORS.white,
      }}>
          <Text style={{...FONTS.h4}}>
            Another Payment Method
          </Text>
          <View
            style={{
              flex: 1, 
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: SIZES.padding * 2
            }}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => console.log("phone number")}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.lightpurple,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                    <Image 
                      source={icons.phone}
                      resizeMode = "cover"
                      style={{
                        height: 25,
                        width: 25,
                        tintColor: COLORS.purple
                      }}
                    />
                </View>
                <Text style={{
                  marginLeft: SIZES.padding, ...FONTS.body4
                }}>Phone Number</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: SIZES.padding * 2,
            }}
            onPress={() => console.log("Barcode")}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.lightGreen,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10
                }}>
                    <Image 
                      source={icons.barcode}
                      resizeMode = "cover"
                      style={{
                        height: 25,
                        width: 25,
                        tintColor: COLORS.primary
                      }}
                    />
                </View>
                <Text style={{
                  marginLeft: SIZES.padding, ...FONTS.body4
                }}>Barcode</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }


  function onBarCodeRead(result) {
    console.log(result.data)
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
          onBarCodeScanned={onBarCodeRead}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 250,
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

          {renderHeader()}
          {renderScanFocus()}
          {renderPaymentMethods()}
        </Camera>
      )}
    </View>
  );
};

export default Scan;
