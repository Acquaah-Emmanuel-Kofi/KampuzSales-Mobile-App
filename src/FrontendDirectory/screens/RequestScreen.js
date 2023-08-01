import React from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  AppColors  from "../data/Colors";
import { useNavigation } from "@react-navigation/native";

function RequestScreen() {

  const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <HeadTitle title={"Requests"}/>
            <View style={styles.imageBox}>
              <Text>About requests</Text>
              
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddRequest", {screen: 'Profile', initial: true})}>
                  <Text style={{color: AppColors.white, fontSize: 16, fontWeight: 500}}>Add Requests</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ViewRequest")}>
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
    },
    buttons: {
      flex: 2,
      justifyContent: 'center',
    },
    button: {
      backgroundColor: AppColors.primary,
      paddingHorizontal: 100,
      paddingVertical: 25,
      borderRadius: 8,
      marginBottom: 10,
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