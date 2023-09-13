import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  AppColors  from "../data/Colors";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { auth, firestore } from "../../BackendDirectory/config";

function RequestScreen() {

  const navigation = useNavigation();

  const [ firstRequestPost, setFirstRequestPost ] = useState(null);
  const [ firstRequestView, setFirstRequestView ] = useState(null);

  const getUserDetails = async () => {
    await firestore.collection('users')
    .get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        const data = doc.data();
        setFirstRequestPost(data.firstRequestPosting);
        setFirstRequestView(data.firstRequestViewing);
    })
    })
    .catch((error) => {
      alert(error.message);
    })
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  const addRequest = async () => {
    
    navigation.navigate("AddRequest", {screen: 'Profile', initial: true})

    if(firstRequestPost === true){

      const userRef = firestore.collection('users').doc(auth.currentUser.uid);
      await userRef.update({ firstRequestPosting: false });
      setFirstRequestPost(false);

      Alert.alert(
        'Post Requests',
        "Can't find what you're looking for? With 'Post Requests,' you have the power to ask for specific items that are not currently on the platform. Simply describe what you're seeking, and our community can help you find what you need!"
      )

    }
  }

  const viewRequest = async () => {
    
    navigation.navigate("ViewRequest")

    if(firstRequestView === true){

      const userRef = firestore.collection('users').doc(auth.currentUser.uid);
      await userRef.update({ firstRequestViewing: false });
      setFirstRequestView(false);

      Alert.alert(
        'View Requests',
        "Discover and fulfill the wishes of fellow shoppers with our 'View Requests' feature. Browse through a curated list of items requested by other users and have the opportunity to offer them for sale, turning someone else's wish into a reality."
      )
    }
  }

    return (
        <SafeAreaView style={styles.container}>
            <HeadTitle title={"Requests"}/>
            <View style={styles.imageBox}>

              <Image style={{width: 250, height: 250}} source={require("../../../assets/request.png")} />

              <View style={{
                    marginTop: 20,
                    fontSize: 18,
                    alignItems: 'center',
                    marginHorizontal: 15,
                }}>
                <Text style={{
                    fontSize: 18,
                }}>Introducing Requests</Text>
                <Text style={{
                  textAlign: 'center',
                  marginTop: 10,
                }}>Your Shopping, Your Way! Explore {<Text style={{fontStyle: 'italic', fontWeight: 500}}>'View Requests'</Text>} to fulfill fellow shoppers' wishes. 
                  Use {<Text style={{fontStyle: 'italic', fontWeight: 500}}>'Post Requests'</Text>} to find products not yet on the platform, with the community's help. 
                  Shape your shopping journey today!</Text>
              </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => addRequest()}>
                  <MaterialCommunityIcons name="chat-plus-outline" size={24} color={AppColors.white} />
                  <Text style={{color: AppColors.white, fontSize: 16, fontWeight: 500}}>Add Requests</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => viewRequest()}>
                  <Entypo name="unread" size={24} color={AppColors.white} />
                  <Text style={{color: AppColors.white, fontSize: 16, fontWeight: 500}}>View Requests</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
      alignItems: 'center',
    },
    imageBox: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginHorizontal: 20,
      marginBottom: 5,
      columnGap: 20,
    },
    button: {
      backgroundColor: AppColors.primary,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center'
    },
    newContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      width: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });

export default RequestScreen;