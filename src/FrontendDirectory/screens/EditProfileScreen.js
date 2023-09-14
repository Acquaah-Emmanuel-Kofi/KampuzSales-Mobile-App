import React, { useEffect, useState } from "react";
import { Platform, Pressable, Image , SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import  AppColors  from "../data/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, firestore } from "../../BackendDirectory/config";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from 'expo-image-picker';
import uploadImageToStorage from "../../BackendDirectory/functionalities/uploadImageToStorage";
import Spinner from "../components/spinner";


  const data = [
    { label: 'Takoradi Technical University', value: 'TTU' },
    { label: 'BU - Takoradi', value: 'BU' },
  ];

function EditProfileScreen({navigation}) {

      const [ userData, setUserData ] = useState([]);
      const [ image, setImage ] = useState(null);
      const [ username, setUsername ] = useState(null);
      const [ phoneNumber, setPhoneNumber ] = useState(null);
      const [ location, SetLocation ] = useState(null);
      const [ digitalAddress, setDigitalAddress ] = useState(null);
      const [ campus, setCampus ] = useState(null);
      const [ uploading, setUploading ] = useState(false);
      const [ sellerId, setSellerId ] = useState(null);


      const pickImage = async () => {
         // no permission is rewuired
         let result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.Images,
             allowsEditing: true,
             aspect: [4,3],
             quality: 1
         });
 
         if (!result.canceled) {
             const source = {uri: result.assets[0].uri};
             setImage(source);
         }
 
      }

      
      const submitPost = async () => {

        const user = auth.currentUser;

        if(phoneNumber !== null || username !== null || image !== null || location !== null || digitalAddress !== null || campus !== null){
            setUploading(true);

            const response = await fetch(image.uri);
            const blob = await response.blob();
            const imageUrl = await uploadImageToStorage("profileDisplays", user.uid, blob);
            
            let newUserData = {
                profileDisplay: imageUrl ? imageUrl.downloadURL : userData.profileDisplay,
                username: username ? username : userData.username,
                phoneNumber: phoneNumber ? phoneNumber : userData.phoneNumber,
                location: location ? location : userData.location,
                digitalAddress: digitalAddress ? digitalAddress : userData.digitalAddress,
                campus: campus ? campus : userData.campus,
            }
    
            if(newUserData.phoneNumber !== null || newUserData.username !== null || newUserData.location !== null || newUserData.digitalAddress !== null || newUserData.campus !== null || newUserData.phoneNumber !== null){
                
                if(userData.firstTimePosting === true){
                    const documentRef = firestore.collection("users").doc(user.uid);
                    await documentRef.update(newUserData)
                    .then(() => {
                        Alert.alert(
                            "Update Successful!",
                            "You've successfully updated your profile."
                        )
        
                        setUploading(false);
                        setImage(null);
                        setUsername(null);
                        setPhoneNumber(null);
        
                        navigation.navigate("Profile");
                    })
                    .catch((error) => {
                        Alert.alert(
                            "Update Not Successful!",
                            error.message
                        )
                    })
                } else {
                    if(sellerId !== null){
                        const documentRef = firestore.collection("sellers").doc(sellerId);
                        await documentRef.update(newUserData)
                        .then(() => {
                            Alert.alert(
                                "Update Successful!",
                                "You've successfully updated your profile."
                            )
            
                            setUploading(false);
                            setImage(null);
                            setUsername(null);
                            setPhoneNumber(null);
            
                            navigation.navigate("Profile");
                        })
                        .catch((error) => {
                            Alert.alert(
                                "Update Not Successful!",
                                error.message
                            )
                        })
                    }
                }
            }
                
        } else {
            setUploading(false);
            alert("Nothing is changed!")
        }
      }
    

      useEffect(() => {
        firestore.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
              setUserData(snapshot.data());
            }
        })
        .catch((error) => {
            setUploading(false);
            alert(error.message);
        })

        firestore.collection('sellers')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const { userId } = doc.data();
                { auth.currentUser.uid === userId ? 
                    setSellerId(doc.id)
                : null}
            })
        })
        .catch((error) => {
            return;
        })
      }, [])

    return (
        <SafeAreaView styles={styles.container}>
        <View style={styles.profileHeaderBox}>
            <Ionicons onPress={() => navigation.navigate("Profile")} style={styles.searchBackIcon} name="chevron-back-sharp" size={30} color={AppColors.black} />
            <View>
                <Text style={styles.title}>Edit Profile</Text>
            </View>
            <TouchableOpacity 
                style={styles.save}
                disabled={uploading ? true : false}  
                onPress={() => submitPost()}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </View>
        <ScrollView 
            contentContainerStyle={styles.innerContainer}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            showsVerticalScrollIndicator={false}
            >
            {uploading ? (
                <Spinner />
            ): null}
                <View style={styles.profileDetails}>
                    { image ? 
                    (
                        <View style={styles.imageContainer}>
                            <Image style={styles.profileDisplay} source={{uri: image.uri}} resizeMode='stretch' />
                            <Pressable style={styles.selectImage} onPress={() => pickImage()}>
                                <MaterialCommunityIcons  name="image-edit" size={20} color={AppColors.white} />
                                <Text style={{color: AppColors.white}}>Edit</Text>
                            </Pressable>
                        </View>
                    ) : 
                    (
                        <View style={styles.imageContainer}>
                            <View style={styles.image}>
                                <Icon name="ios-person" size={100} color={AppColors.primary} />
                            </View>
                            <Pressable style={styles.selectImage} onPress={() => pickImage()}>
                                <MaterialCommunityIcons  name="image-edit" size={20} color={AppColors.white} />
                                <Text style={{color: AppColors.white}}>Edit</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            
                <View style={styles.postDetails}>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Username</Text>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder={`${userData.username}`}
                            value={username ? username : userData?.username}
                            onChangeText={(value) => {
                                setUsername(value)
                            }}
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Phone Number</Text>
                        <TextInput 
                            style={[styles.textInput]}
                            autoCompleteType="tel"
                            keyboardType="phone-pad"
                            textContentType="telephoneNumber"
                            placeholder={`${userData.phoneNumber}`}
                            value={phoneNumber ? phoneNumber : userData?.phoneNumber}
                            onChangeText={(value) => {
                                setPhoneNumber(value)
                            }}
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Location</Text>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Takoradi - Anaji"
                            value={location ? location : userData?.location}
                            onChangeText={(value) => {
                                SetLocation(value)
                            }}
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Digital Address</Text>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="WS-234-3857"
                            value={digitalAddress ? digitalAddress : userData?.digitalAddress}
                            onChangeText={(value) => {
                                setDigitalAddress(value)
                            }}
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Campus</Text>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            dropdownPosition='auto'
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Takoradi Technical University"
                            onChange={(value) => {
                                setCampus(value.value)
                            }}
                        />
                    </View>
                </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
        paddingBottom: 50,
    },
    profileHeaderBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        paddingVertical: 10,
    },
    title: {
        fontSize: 16,
        color: AppColors.black,
        fontWeight: '600',
    },
    saveText: {
        fontSize: 16,
        fontWeight: '600',
        color: AppColors.primary,
    },
    profileDetails: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AppColors.primary,
      paddingHorizontal: 20,
      paddingVertical: 5,
      paddingBottom: 20,
      marginHorizontal: 10,
      borderRadius: 10,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
        },
    })
    },
    imageContainer: {
      borderRadius: 20,
      backgroundColor: AppColors.white,
      width: 150,
      height: 150,
      marginTop: 30,
      position: 'relative',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
        },
    })
    },
    profileDisplay: {
        borderRadius: 20,
        width: 150, 
        height: 150,
    },
    image: {
        position: 'absolute',
        top: 20,
        left: 25
    },
    selectImage: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: AppColors.glassBlack,
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    textInputBox: {
        marginVertical: 6,
    },
    textTitle: {
        marginBottom: 5,
        marginLeft: 3,
    },
    textInput: {
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 14,
    },
    postDetails: {
        marginVertical: 10,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 50,
        backgroundColor: AppColors.white,
        padding: 10,
        borderRadius: 10,
        paddingVertical: 20,
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
        })
    },
    dropdown: {
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: AppColors.black,
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: AppColors.borderGray
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 14,
    },
  });

export default EditProfileScreen;