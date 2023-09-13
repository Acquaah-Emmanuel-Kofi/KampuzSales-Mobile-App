import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, Pressable, Image } from "react-native";
import HeadTitle from "../components/HeadTitle";
import { useNavigation } from "@react-navigation/native";
import AppColors from "../data/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import { auth, firestore } from "../../BackendDirectory/config";

function Notifications() {

  const navigation = useNavigation();

  const [ notifications, setNotifications ] = useState([]);
  const [ userData, setUserData ] = useState([]);
  const [ sellerData, setSellerData ] = useState([]);

  const getNotifications = () => {
    if(userData?.firstTimePosting == true) {
      setNotifications(userData?.notifications);
    }

    if(userData?.firstTimePosting == false) {
      setNotifications(sellerData?.notifications);
    }
  }


  const getUserDetails = async () => {
    await firestore.collection('users')
    .doc(auth.currentUser.uid)
    .get()
    .then((snapshot) => {
      let data = snapshot.data();

      setUserData(data)
    })
    .catch((error) => {
      alert(error.message);
    })
  }

  const getSellersDetails = async () => {
    await firestore.collection('sellers')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(doc => {

          let data = doc.data();

          if(auth.currentUser.uid === data.userId){
            setSellerData(data);
          }

        })
    })
    .catch((error) => {
        return;
    })

}


  useEffect(() => {
    getUserDetails();
    getSellersDetails();
    getNotifications();
  }, [sellerData])


    return (
        <View style={styles.container}>
          <HeadTitle title={'Alerts'} />
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            >
              {notifications && notifications?.map((data, index) => (
                <Pressable key={index} style={styles.alertMessageCard} onPress={() => navigation.navigate("Alert", notifications)}>
                    <Image style={[styles.icon, {width: 24, height: 24}]} source={require('../../../assets/favicon.png')} />
                    <View style={styles.message}>
                      <Text style={{
                        fontWeight:'bold',
                        marginBottom: 1,
                      }}>{data.title}</Text>
                      <Text style={{
                        flexWrap: 'wrap',
                      }}>{data.message}</Text>
                    </View>
                    <Pressable>
                        <Fontisto name="close" size={24} color={AppColors.black} />
                    </Pressable>
                </Pressable>
              ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      marginVertical: 20,
      marginTop: 30,
    },
    alertMessageCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderColor: AppColors.borderGray,
    }, 
    message: {
      width: '80%'
    }
  });

export default Notifications;