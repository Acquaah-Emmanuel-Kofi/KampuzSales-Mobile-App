import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import  Colors  from "../data/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import HeadTitle from "../components/HeadTitle";
import { auth, firestore } from "../../BackendDirectory/config";
import moment from "moment/moment";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import { Dropdown } from "react-native-element-dropdown";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

  const data = [
    { label: 'Takoradi Technical University', value: 'TTU' },
    { label: 'Others Loading...', value: '' },
  ];

function EditProfileScreen({navigation}) {

      const [userData, setuserData] = useState([]);


      useEffect(() => {
        firestore.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
              setuserData(snapshot.data());
            }
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        })
      }, [])

    return (
        <View styles={styles.container}>
        <ScrollView 
            contentContainerStyle={styles.innerContainer}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            >
            <SafeAreaView>
                <View style={styles.profileDetails}>
                    <View style={styles.profileHeaderBox}>
                        <Ionicons onPress={() => navigation.navigate("Profile")} style={styles.searchBackIcon} name="chevron-back-sharp" size={30} color={Colors.black} />
                        <View>
                            <Text style={styles.title}>Edit Profile</Text>
                        </View>
                        <TouchableOpacity style={styles.save}>
                            <Text style={styles.titleText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Icon name="ios-person" size={150} style={styles.image} color={Colors.main} />
                        <TouchableOpacity style={styles.selectImage} onPress={() => alert("Upload Image")}>
                            <MaterialCommunityIcons  name="image-edit" size={40} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.postDetails}>
                    <View style={styles.textInputBox}>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Username" 
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="email" 
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Date of Birth" 
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Location" 
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Postal Code" 
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Address Line 1" 
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Address Line 2" 
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        dropdownPosition='auto'
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder='Category'
                        searchPlaceholder="Search..."
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
        paddingBottom: 100,
    },
    profileHeaderBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    title: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '600',
    },
    titleText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white,
        // backgroundColor: Colors.white,
        // paddingHorizontal: 8,
        // paddingVertical: 5,
        // borderRadius: 8
    },
    profileDetails: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.main,
      paddingHorizontal: 20,
      paddingVertical: 5,
      paddingBottom: 30
    },
    imageContainer: {
      borderRadius: 100,
      backgroundColor: Colors.white,
      width: 200,
      height: 200,
      marginTop: 30,
      position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 20,
        left: 25
    },
    selectImage: {
        position: 'absolute',
        bottom: -5,
        right: 10,
    },
    textInputBox: {
        marginVertical: 6,
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 14,
    },
    postDetails: {
        marginVertical: 10,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 100
    },
    dropdown: {
        borderWidth: 1,
        borderColor: Colors.borderGray,
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: Colors.black,
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: Colors.borderGray
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