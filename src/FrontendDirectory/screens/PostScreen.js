import React from "react";
import { StyleSheet, Text, View } from "react-native";
import  Colors  from "../data/colors";

function PostScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Text>Image Thumnail</Text>
                <Text>+</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default PostScreen;