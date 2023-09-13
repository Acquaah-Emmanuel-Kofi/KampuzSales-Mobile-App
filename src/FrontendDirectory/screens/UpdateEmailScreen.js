import React from "react";
import { StyleSheet ,Text, TextInput, View , ScrollView} from "react-native";
import { CustomButton } from "../components/buttons";
import  AppColors  from "../data/Colors";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";

function UpdateEmailScreen({navigation}) {
    return (
        <View style={styles.container}>
            <HeadTitleWithBackIcon previousScreen={() => navigation.navigate("Login")} title={"Update Email"} />
            <ScrollView 
                contentContainerStyle={styles.content}
                automaticallyAdjustKeyboardInsets={true}
                alwaysBounceVertical={true}
                automaticallyAdjustsScrollIndicatorInsets={true}
                showsVerticalScrollIndicator={false}>
                    <Text style={styles.heading}>Change Email</Text>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Old Email</Text>
                        <TextInput 
                            style={styles.textInputBox} 
                            secureTextEntry={true}
                            placeholderTextColor={AppColors.secondary}
                            placeholder="*************" 
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>New Email</Text>
                        <TextInput 
                            style={styles.textInputBox} 
                            secureTextEntry={true}
                            placeholderTextColor={AppColors.secondary}
                            placeholder="*************" 
                        />
                    </View>
                    <View style={styles.customButton}>
                        <CustomButton onPress={() => {
                            alert("Password Saved!")
                            navigation.navigate("Profile")
                        }} buttonText={"Save new email"} />
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
    },
    inputBox: {
        width: '85%',
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: AppColors.labelGray,
        fontWeight: '500',
        marginBottom: 6,
    },
    textInputBox: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: AppColors.borderGray,
        paddingHorizontal: 10,
        paddingVertical: 14,
        color: AppColors.secondary,
        gap: 8,
    },
    customButton: {
        width: '100%',
        paddingHorizontal: 30,
    },
    switchLoginScreenText: {
        fontSize: 14,
        fontWeight: '400',
        color: AppColors.secondary,
        marginVertical: 12,
    },
    switchLoginScreenLinkText: {
        color: AppColors.primary,
    },
  });

export default UpdateEmailScreen;