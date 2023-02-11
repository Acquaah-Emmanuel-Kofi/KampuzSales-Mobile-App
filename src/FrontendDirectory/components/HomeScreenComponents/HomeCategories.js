import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import  Colors  from "../../data/colors";
import categoriesData from "../../data/categoriesData";

function HomeCategories() {

  const renderCategoryItem = ({ item }) => {
    return (
      <View>
        <Pressable style={styles.navCategoryItems}>
          <View style={styles.navCategoryIcon}>
            <Image source={item.image} />
          </View>
          <Text style={styles.navCategoryName}>{item.name}</Text>
        </Pressable>
      </View>
    )
  }
    return (
        <View style={styles.container}>
            <View>
              <FlatList 
                data={categoriesData}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item._id}
                horizontal={true}
              />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navCategoryItems: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    navCategoryIcon: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.favIconBg,
        backgroundColor: Colors.favIconBg,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navCategoryName: {
      paddingTop: 10,
    }
  });

export default HomeCategories;