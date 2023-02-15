import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeadTitle from "../components/HeadTitle";

function Notifications() {
    return (
        <View style={styles.container}>
            <HeadTitle title={'Notifications'} />
            <Text>Testing</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default Notifications;