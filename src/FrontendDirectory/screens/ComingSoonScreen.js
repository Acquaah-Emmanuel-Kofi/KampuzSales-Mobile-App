import React from "react";
import { StyleSheet ,Text, View , ScrollView, Image } from "react-native";
import  AppColors  from "../data/Colors";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";

function ComingSoonScreen({navigation}) {
    return (
        <View style={styles.container}>
            <HeadTitleWithBackIcon previousScreen={() => navigation.goBack()} title={"Construction"} />
            <ScrollView 
                contentContainerStyle={styles.content}
                automaticallyAdjustKeyboardInsets={true}
                alwaysBounceVertical={true}
                automaticallyAdjustsScrollIndicatorInsets={true}
                showsVerticalScrollIndicator={false}>
                    <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image style={{width: 250, height: 250}} source={require("../../../assets/marketing.png")} />
                    <Text style={{
                        marginTop: 20,
                        fontSize: 18,
                    }}>Coming Soon...</Text>
                    <Text style={{textAlign: 'center', marginVertical: 10}}>
                        This screen is still under construction. 
                        
                    </Text>
                    <Text style={{fontSize: 12, color: AppColors.primary}}>Happy shopping! 🎉</Text>
                </View>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
      justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: '600',
        color: AppColors.black,
        marginBottom: 20,
        letterSpacing: 2,
    }
  });

export default ComingSoonScreen;