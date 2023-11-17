import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, TextInput, Modal, KeyboardAvoidingView, ScrollView, Platform} from 'react-native'
import React, { useEffect, useState } from 'react';
import {COLORS, SIZES, FONTS, icons, images} from '../constants/index';
//import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';

//import { loadFonts } from '../constants/fonts';



{/**useEffect(() => {
    // Load fonts when the component mounts
    loadFonts();
  }, []); */}

const SignUp = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3,idd")
      .then((res) => res.json())
      .then(data => {
        let areaData = data.map(item => {
            return {
                code: item.cca3,
                name: item.name?.common,
                flag: item.flags.png,
                callingCode: item.idd?.root + item.idd?.suffixes[0],
            }
        })
        //console.log(areaData)
        setAreas(areaData)
        
        if (areaData.length > 0) {
            let defaultData = areaData.filter(a => a.code == "GBR")

            if (defaultData.length > 0) {
                setSelectedArea(defaultData[0])
            }
        }
    })
  }, []);
  
  //console.log(selectedArea)
 // console.log(areas)

  function renderHeader() {
    return(
      <TouchableOpacity
      style={{flexDirection: "row", alignItems: "center", marginTop: SIZES.padding * 6, paddingHorizontal: SIZES.padding * 2}}
      onPress={() => console.log("Sign Up")}
      >
        <Image 
          source={icons.back}
          resizeMode='contain'
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white
          }}
        />
        <Text style={{
          marginLeft: SIZES.padding * 1.5,
          color: COLORS.white,
          ...FONTS.h4
        }}>Sign Up</Text>
      </TouchableOpacity>
    )
  }

  function renderLogo () {
    return(
      <View
      style={{
        marginTop: SIZES.padding * 5,
        height: 100,
        alignItems: "center",
        justifyContent: "center"
      }}>
          <Image 
            source={images.wallieLogo}
            resizeMode='contain'
            style={{
              width:'60%',
            }}
          />
      </View>
    )
  }

  function renderForm() {
    return(
      <View
      style={{
        marginTop: SIZES.padding * 3,
        marginHorizontal: SIZES.padding * 3,
      }}
      >
        {/**Full Name */}
        <View style={{marginTop: SIZES.padding * 3}}>
        <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>Full Name</Text>
          <TextInput 
            style={{
              marginVertical: SIZES.padding, 
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3
              }}
              placeholder='John Doe'
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
          />
        </View>

        {/**Phone Number */}
        <View
        style={{marginTop: SIZES.padding * 2}}>
            <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>Phone Number</Text>

            <View style={{flexDirection: "row"}}>
                {/**COuntry code */}
                  <TouchableOpacity style={{
                    width:100,
                    height: 50,
                    marginHorizontal: 5,
                    borderBottomColor: COLORS.white,
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    ...FONTS.body2
                  }}
                  onPress={() => setModalVisible(true)}>
                      <View style={{justifyContent: 'center'}}>
                          <Image source={icons.down}
                            style={{
                              width: 10,
                              height: 10,
                              tintColor: COLORS.white
                            }}
                          />
                      </View>
                      <View style={{justifyContent: 'center', marginLeft: 5,}}>
                            <Image source={{uri: selectedArea?.flag}}
                              resizeMode='contain'
                              style={{width: 30, height: 30}}
                            />
                      </View>
                      <View style={{justifyContent: "center", marginLeft: 5}}>
                          <Text style={{color: COLORS.white, ...FONTS.body3}}>{selectedArea?.callingCode}</Text>
                      </View>
                  </TouchableOpacity>

                  {/**Phone Number */}
                  <TextInput 
                    style={{
                      flex: 1,
                      marginVertical: SIZES.padding,
                      borderBottomColor: COLORS.white,
                      borderBottomWidth: 1,
                      height: 40,
                      color: COLORS.white,
                      ...FONTS.body3
                    }}
                    placeholder='000-0000-000'
                    placeholderTextColor={COLORS.white}
                    selectionColor={COLORS.white}
                    keyboardType='numeric'
                  />
            </View>
        </View>

        {/**Password */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color : COLORS.lightGreen, ...FONTS.body3}}>Password</Text>
          <TextInput
          style={{
            marginVertical: SIZES.padding,
            borderBottomColor: COLORS.white,
            borderBottomWidth: 1,
            height: 40,
            color: COLORS.white,
            ...FONTS.body3
            }}
            placeholder='*******************'
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}/>

          <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            bottom: 10,
            height: 30,
            width: 30
          }}
          onPress={() => setShowPassword(!showPassword)}>
              <Image source={showPassword ? icons.disable_eye : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.white
                }}
              />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function renderButton() {
  return(
  <View style={{margin: SIZES.padding * 3}}>
      <TouchableOpacity
      style={{
        height: 60,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.radius / 1.5,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={() => navigation.navigate("BottomTab")}>
        <Text style={{color: COLORS.white, ...FONTS.h3}}>Continue</Text>
      </TouchableOpacity>
  </View>
  )
  }

  function renderAreaCodesModal() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}
        >
          <Image
            source={{uri: item.flag}}
            style={{width: 30, height: 15, marginRight: 10}}
          />
          <Text style={{fontSize: 14}}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.lightGreen,
                borderRadius: SIZES.radius,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
      <LinearGradient colors={[COLORS.lime, COLORS.emerald]} style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCodesModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;