import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity  } from "react-native";
import AppColors from "../data/Colors";
import { openWebLink } from "../../BackendDirectory/functionalities/functions";

function AboutKampuzSales() {

    const webLink = 'https://www.example.com';
    const termsAndConditions = 'https://www.example.com';
    const safetyTips = 'https://www.example.com';

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={{width: 130, height: 130, marginBottom: 10}} source={require("../../../assets/KampuzSales-Logo.png")} />
                    <Text style={{fontSize: 20}}>Version 1.0.0</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={{textAlign: 'center'}}>📱Our innovative e-commerce mobile app revolutionizes shopping by connecting buyers and sellers seamlessly.</Text>
                        <Text style={{marginVertical: 10, textAlign: 'center'}}>🤳Users can browse and purchase a wide range of products, while also having the power to post their own requests for specific items not yet available on the platform.</Text>
                        <Text style={{textAlign: 'center'}}>💡This unique 'Requests' feature fosters community collaboration, making shopping a personalized and inclusive experience.</Text>
                    </View>
                    <TouchableOpacity onPress={() => openWebLink(webLink)}>
                        <Text style={styles.linkText}>Read More</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.content}>
                        By using KampuzSales app you agree with Terms and Conditions of use
                    </Text>
                    <TouchableOpacity onPress={() => openWebLink(termsAndConditions)}>
                        <Text style={styles.linkText}>Terms and Conditions</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.content}>
                        Stay safe with KampuzSales
                    </Text>
                    <TouchableOpacity onPress={() => openWebLink(safetyTips)}>
                        <Text style={styles.linkText}>Read our safety tips</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        color: AppColors.primary,
        fontSize: 16,
        fontWeight: 600,
    },
    content: {
        textAlign: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
    }
})

export default AboutKampuzSales;