import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppColors from "../data/Colors";

function OrderSuccessScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.successContainer}>
                <Ionicons name="checkmark-circle" size={120} color={AppColors.primary} />
                <Text style={{fontWeight: 500, fontSize: 18}}>Congratulations! 🎉</Text>
                <Text style={{fontWeight: 500, fontSize: 18}}>Your order has been recieved.</Text>
            </View>
            <View style={styles.flexText}>
                <Text style={{fontSize: 18, fontStyle: 'italic'}}>Thank you for choosing </Text>
                <Text style={{fontWeight: 500, fontSize: 18}}>KampuzSales 🤩</Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity 
                    style={styles.nextButtom}
                    onPress={() => navigation.navigate("Home")}>
                        <Ionicons name="cart" size={20} color={AppColors.white} />
                        <Text style={styles.nextText}>Continue shopping</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
      paddingTop: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    successContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
    },
    flexText: {
        flex: 2,
        flexDirection: 'row',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginBottom: 100,
        width: '80%',
    },
    backButtom: {
        borderWidth: 1,
        borderColor: AppColors.primary,
        backgroundColor: AppColors.white,
        borderRadius: 8,
        paddingHorizontal: 50,
        paddingVertical: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
        })
    },
    backText: {
        color: AppColors.primary,
    },
    nextButtom: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.primary,
        borderWidth: 1,
        borderColor: AppColors.primary,
        borderRadius: 8,
        width: '100%',
        height: 47,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
        })
    },
    nextText: {
        color: AppColors.white,
        marginLeft: 5,
        fontWeight: 500,
    },
})

export default OrderSuccessScreen;