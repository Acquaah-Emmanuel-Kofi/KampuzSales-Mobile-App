import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import HeadTitle from "../components/HeadTitle";
import { auth, firestore } from "../../BackendDirectory/config";
import BuyerProfile from "../components/Profiles/Buyer";
import SellerProfile from "../components/Profiles/Seller";

function ProfileScreen() {

      const [ userData, setUserData ] = useState([]);
      const [ sellerData, setSellerData ] = useState([]);
      const [ status, setStatus ] = useState(true);

      const getUserDetails = async () => {
        await firestore.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
              setUserData(snapshot.data());
            }

            let state = snapshot.data();
            setStatus(state.firstPost);
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
                setSellerData(doc.data());
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
      }, [status])


    return (
        <ScrollView 
          contentContainerStyle={styles.container}
          >
            <HeadTitle title={"Profile"} />

            {userData.firstPost === true ? 
            (
              <BuyerProfile userData={userData} />
            ) : (
              <SellerProfile sellerData={sellerData} />
            )}
          </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingBottom: 100,
    },
  });

export default ProfileScreen;