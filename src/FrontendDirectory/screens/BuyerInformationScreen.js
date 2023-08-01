import { useEffect, useState } from "react";
import { SafeAreaView, Platform, ScrollView, Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import HeadTitle from "../components/HeadTitle";
import AppColors from "../data/Colors";
import { auth, firestore } from "../../BackendDirectory/config";
import Spinner from "../components/spinner";

const data = [
    { label: 'Takoradi Technical University', value: 'TTU' },
    { label: 'BU - TAKORADI', value: 'BU' },
];


function BuyerInformationScreen ({navigation, route}) {

    const cartData = route.params;

    const [ userData, setUserData ] = useState(null);
    const [ campus, setCampus ] = useState(null);
    const [ userName, setUserName ] = useState(null);
    const [ phoneNumber, setPhoneNumber ] = useState(null);
    const [ digitalAddress, setDigitalAddress ] = useState(null);
    const [ additionalPhoneNumber, setAdditionalPhoneNumber ] = useState(null);
    const [ spinning, setSpinning ] = useState(true);
    const [ sellerId, setSellerId ] = useState(null);

    const getUserDetails = () => {
        firestore.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){

                let data = snapshot.data();

                setUserData(data);
            }
        })
        .catch((error) => {
          alert(error.message);
        })

      }

      const handleCheckOut = async () => {
        
        const user = auth.currentUser;

        if(userData.phoneNumber !== null || userData.userName !== null || userData.campus !== null || userData.digitalAddress !== null){

            let buyerInfoData = {
                username: userName ? userName : userData.username,
                digitalAddress: digitalAddress ? digitalAddress : userData.digitalAddress,
                phoneNumber: phoneNumber ? phoneNumber : userData.phoneNumber,
                additionalPhoneNumber: additionalPhoneNumber ? additionalPhoneNumber : userData.additionalPhoneNumber,
                campus: campus ? campus : userData.campus,
            }
    
            if(buyerInfoData.phoneNumber !== null || buyerInfoData.username !== null || buyerInfoData.campus !== null || buyerInfoData.digitalAddress !== null){
                
                if(userData.firstPost === true){
                    const documentRef = firestore.collection("users").doc(user.uid);
                    await documentRef.update(buyerInfoData)
                    .then(() => {

                        setDigitalAddress(null);
                        setUserName(null);
                        setPhoneNumber(null);
                        setAdditionalPhoneNumber(null);
                        setCampus(null);
        
                        navigation.navigate("OrderSummary", cartData);
                    })
                    .catch((error) => {
                        Alert.alert(
                            "Update Not Successful!",
                            error.message
                        )
                    })
                } else {
                    if(sellerId !== null){
                        const documentRef = firestore.collection("sellers").doc(sellerId);
                        await documentRef.update(buyerInfoData)
                        .then(() => {

                            setDigitalAddress(null);
                            setUserName(null);
                            setPhoneNumber(null);
                            setAdditionalPhoneNumber(null);
                            setCampus(null);
            
                            navigation.navigate("OrderSummary", cartData);
                        })
                        .catch((error) => {
                            Alert.alert(
                                "Update Not Successful!",
                                error.message
                            )
                        })
                    }
                }
            }
                
        } else {
            alert("Requied fields cannot be empty!")
        }
        
    }

      useEffect(() => {
        getUserDetails();

        firestore.collection('sellers')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const data = doc.data();
                { auth.currentUser.uid === data.userId ? 
                    setSellerId(doc.id)
                : null}

                if(userData.firstPost === false){
                    setUserData(data);
                }
            })
        })
        .catch((error) => {
            return;
        })
      }, [])

    useEffect(() => {
        setTimeout(() => {
            setSpinning(false);
        }, 1000);
    }, []);
    

    return (
        <View style={styles.container}>
            <HeadTitle title={"Buyer Information"} />
            <ScrollView 
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            >

                { spinning ? <Spinner /> : null}

                    <View style={styles.sellerInfo}>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>User Name</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="Andrew Eshun"
                                    editable={false}
                                    value={userName ? userName : userData?.username}
                                    onChangeText={(value) => {
                                        setUserName(value)
                                    }}
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>GPS Location</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="W-376434-GH"
                                    value={digitalAddress ? digitalAddress : userData?.digitalAddress}
                                    onChangeText={(value) => {
                                        setDigitalAddress(value)
                                    }}
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Contact</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    autoCompleteType="tel"
                                    keyboardType="phone-pad"
                                    textContentType="telephoneNumber"
                                    placeholder="+233 559-045-947"
                                    value={phoneNumber ? phoneNumber : userData?.phoneNumber}
                                    onChangeText={(value) => {
                                        setPhoneNumber(value)
                                    }}
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Secondary Conatct (optional)</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    autoCompleteType="tel"
                                    keyboardType="phone-pad"
                                    textContentType="telephoneNumber"
                                    placeholder="+233 559-045-947"
                                    value={additionalPhoneNumber ? additionalPhoneNumber : userData?.additionalPhoneNumber}
                                    onChangeText={(value) => {
                                        setAdditionalPhoneNumber(value)
                                    }}
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Campus</Text>
                                <Dropdown
                                    style={[styles.dropdown]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    dropdownPosition='auto'
                                    data={data}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Takoradi Technical University"
                                    value={campus ? campus : userData?.campus}
                                    onChange={(value) => {
                                        setCampus(value.value)
                                    }}
                                />
                            </View>
                        </View>
                <View style={styles.buttons}>
                    <TouchableOpacity 
                        style={styles.backButtom}
                        onPress={() => navigation.goBack()} >
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.nextButtom}
                        onPress={() => handleCheckOut()}>
                        <Text style={styles.nextText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
    textInputBox: {
        marginVertical: 6,
    },
    textTitle: {
        marginBottom: 5,
        marginLeft: 3,
    },
    textInput: {
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 14,
    },
    sellerInfo: {
        marginHorizontal: 10,
        marginTop: 20,
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginBottom: 100,
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
        backgroundColor: AppColors.primary,
        borderWidth: 1,
        borderColor: AppColors.primary,
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
    nextText: {
        color: AppColors.white,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: AppColors.black,
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: AppColors.borderGray
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 14,
    },
    radioGroup: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: AppColors.primary,
        borderWidth: 1,
        borderColor: AppColors.primary,
        borderRadius: 8,
        marginTop: 20,
        height: 50,
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
  });

export default BuyerInformationScreen;