import { Text, View, ScrollView, StyleSheet, Platform, TouchableOpacity } from "react-native";
import AppColors from "../data/Colors";
import { handleDeleteAccount } from "../../BackendDirectory/authentications/authentications";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountSettingsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
        <HeadTitleWithBackIcon 
            previousScreen={() => navigation.goBack()}
            title={"Account Settings"}
        />
        <ScrollView 
        automaticallyAdjustKeyboardInsets={true}
        alwaysBounceVertical={true}
        automaticallyAdjustsScrollIndicatorInsets={true}
        >
            <View style={{marginTop: 20}}>
                <Text style={styles.cardTitle}>Credentials</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.textInputBox} onPress={() => navigation.navigate("UpdateEmail")}>
                        <View style={styles.flex}>
                            <Text style={styles.textTitle}>Change Email</Text>
                            <MaterialCommunityIcons style={styles.icon} name="square-edit-outline" size={20} color={AppColors.primary} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textInputBox} onPress={() => navigation.navigate("UpdatePassword")}>
                        <View style={styles.flex}>
                            <Text style={styles.textTitle}>Change Password</Text>
                            <MaterialCommunityIcons style={styles.icon} name="square-edit-outline" size={20} color={AppColors.primary} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textInputBox}>
                        <View style={styles.flex}>
                            <Text style={styles.textTitle}>Change Card Number</Text>
                            <MaterialCommunityIcons style={styles.icon} name="square-edit-outline" size={20} color={AppColors.primary} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Text style={styles.cardTitle}>Security Settings</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.textInputBox}>
                        <View style={styles.flex}>
                            <Text style={styles.textTitle}>Change Card Number</Text>
                            <Ionicons style={styles.icon} name="ios-person-add-outline" size={20} color={AppColors.primary} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textInputBox}>
                        <View style={styles.flex}>
                            <Text style={styles.textTitle}>Change Card Number</Text>
                            <Ionicons style={styles.icon} name="ios-person-add-outline" size={20} color={AppColors.primary} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textInputBox} onPress={() => handleDeleteAccount()}>
                        <View style={styles.flex}>
                            <Text style={[styles.textTitle, {color: AppColors.danger}]}>Delete Account</Text>
                            <MaterialIcons style={styles.icon} name="delete-forever" size={24} color={AppColors.danger} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 40,
        backgroundColor: AppColors.white,
        padding: 10,
        borderRadius: 10,
        paddingVertical: 20,
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
        })
    },
    cardTitle: {
        marginHorizontal: 10,
        paddingLeft: 5,
        fontWeight: 700,
    },
    textInputBox: {
        marginVertical: 10,
    },
    textTitle: {
        marginBottom: 5,
        marginLeft: 3,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
})

export default AccountSettingsScreen;