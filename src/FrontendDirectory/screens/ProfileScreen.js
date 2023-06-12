import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import  AppColors  from "../data/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import HeadTitle from "../components/HeadTitle";
import { auth, firestore } from "../../BackendDirectory/config";
import moment from "moment/moment";

function ProfileScreen({navigation}) {

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
        <View style={styles.container}>
            <SafeAreaView>
              <HeadTitle title={"Profile"} />
            <View style={styles.profileDetails}>
              <View style={styles.imageContainer}>
                <Icon name="ios-person" size={80} style={styles.image} color={AppColors.primary} />
              </View>
              <View style={styles.details}>
                <Text style={styles.userName}>{userData.username}</Text>
                <Text style={styles.phoneNumber}>{userData.phoneNumber}</Text>
                { userData.joinedDate && <Text style={styles.dateJoined}>Member Since: {moment(userData.joinedDate.toDate()).format('LL')}</Text>}
                <TouchableOpacity style={styles.editProfile} onPress={() => navigation.navigate("EditProfile")}>
                    <Text style={styles.editProfileText}>Edit Profile  </Text>
                    <View style={styles.pencil}>
                      <FontAwesome5 name="pencil-alt" size={14} color={AppColors.black} />
                    </View>
                </TouchableOpacity>
              </View>
            </View>
            <Pressable onPress={() => alert('Friend Invited!')}>
              <View style={styles.inviteFriends}>
                <Ionicons style={styles.icon} name="ios-person-add-outline" size={24} color={AppColors.primary} />
                <Text>Invite Friends</Text>
              </View>
            </Pressable>
            <View style={styles.options}>
              <Pressable>
                <View style={styles.optionsTab}>
                  <Ionicons style={styles.icon} name="ios-settings-outline" size={24} color={AppColors.primary} />
                  <Text>Settings</Text>
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.optionsTab}>
                  <MaterialCommunityIcons style={styles.icon} name="message-bookmark-outline" size={24} color={AppColors.primary} />
                  <Text>About KampuzSales</Text>
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.optionsTab}>
                  <Ionicons style={styles.icon} name="ios-help-circle-outline" size={24} color={AppColors.primary} />
                  <Text>Help & Complaint</Text>
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.optionsTab}>
                  <MaterialCommunityIcons style={styles.icon} name="head-question-outline" size={24} color={AppColors.primary} />
                  <Text>FAQ</Text>
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.optionsTab}>
                  <AntDesign style={styles.icon} name="deleteuser" size={24} color={AppColors.primary} />
                  <Text>Delete Account</Text>
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.optionsTab}>
                  <MaterialCommunityIcons style={styles.icon} name="logout" size={24} color={AppColors.primary} />
                  <TouchableOpacity onPress={() => {auth.signOut()}}>
                    <Text>Logout</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    profileDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: AppColors.borderGray,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 10,
    },
    imageContainer: {
      borderRadius: 100,
      backgroundColor: AppColors.white,
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      marginLeft: 20,
    },
    details: {
      width: '65%'
    },
    userName: {
      color: AppColors.black,
      fontSize: 24.6822,
      fontWeight: '400',
      marginBottom: 2,
    },
    phoneNumber: {
      color: AppColors.black,
      fontSize: 14.8094,
      fontWeight: '400',
      marginBottom: 2,
    },
    dateJoined: {
      color: AppColors.black,
      fontSize: 14.8094,
      fontWeight: '400',
    },
    editProfile: {
      fontSize: 14.8094,
      fontWeight: '400',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '35%'
    },
    editProfileText: {
      fontSize: 15,
      color: AppColors.black
    },

    inviteFriends: {
      flexDirection: 'row',
      backgroundColor: AppColors.borderGray,
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginTop: 20,
    },
    icon: {
      marginRight: 30
    },
    options: {
      flexDirection: 'column',
      backgroundColor: AppColors.borderGray,
      marginTop: 20,
      paddingTop: 20,
      height: '100%',
    },
    optionsTab: {
      flexDirection: 'row',
      backgroundColor: AppColors.borderGray,
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 10,
    }
  });

export default ProfileScreen;