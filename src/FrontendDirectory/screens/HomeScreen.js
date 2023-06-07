import React, { useState } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import HomeNavbar from "../components/HomeScreenComponents/MainNavbar";
import HomeProducts from "../components/HomeScreenComponents/HomeProducts";
import  AppColors  from "../data/Colors";

function HomeScreen() {

  const [ refresh, setRefresh ] = useState(false);

  const pullToRefresh = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 2000)
  }

    return (
        <View style={styles.container}>            
        <HomeNavbar />
            <ScrollView 
              contentInsetAdjustmentBehavior="automatic"
              refreshControl={
                <RefreshControl 
                  refreshing={refresh}
                  onRefresh={() => pullToRefresh()}
                />
              }
              >
              <HomeProducts />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
  });

export default HomeScreen;