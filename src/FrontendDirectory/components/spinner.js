import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AppColors from "../data/Colors";

const Spinner = () => {

    return (
        <View style={{
            position: 'absolute',
            zIndex: 999,
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent:'center',
            alignItems: 'center',
        }}>
            <ActivityIndicator color={AppColors.primary} size="large" />
        </View>
    );
}

export default Spinner;