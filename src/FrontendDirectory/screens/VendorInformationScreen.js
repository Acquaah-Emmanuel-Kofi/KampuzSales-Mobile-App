import { useEffect, useState } from "react";
import { SafeAreaView, Platform, ScrollView, Alert, StyleSheet, TouchableHighlight, Text, TextInput, View, ActivityIndicator } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import HeadTitle from "../components/HeadTitle";
import AppColors from "../data/Colors";
import { auth, firestore } from "../../BackendDirectory/config";
import { isValidDigitalAddress } from "../../BackendDirectory/functionalities/functions";
import Spinner from "../components/spinner";

const data = [
    { label: 'Takoradi Technical University', value: 'TTU' },
    { label: 'BU - TAKORADI', value: 'BU' },
  ];

  const paymentMethodData = [
    { label: 'Bank', value: 'bank' },
    { label: 'PayStack', value: 'momo' },
  ];


function VendorInformationScreen ({navigation}) {


    const [ userData, setUserData ] = useState([]);
    const [ campus, setCampus ] = useState(null);
    const [ additionalPhoneNumber, setAdditionalPhoneNumber ] = useState(null);
    const [ digitalAddress, setDigitalAddress ] = useState(null);
    const [ ghCardNumber, setGhCardNumber ] = useState(null);
    const [ paymentMethod, setPaymentMethod ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ spinning, setSpinning ] = useState(true);


    const getUserDetails = () => {
        firestore.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
              setUserData(snapshot.data());
            }
        })
        .catch((error) => {
          alert(error.message);
        })
      }

      useEffect(() => {
        getUserDetails();
      }, [])


    const submit = () => {
        setLoading(true)

        if(campus !== null || digitalAddress !== null || phoneNumber !== null || ghCardNumber !== null || paymentMethod !== null){
            if (isValidDigitalAddress(digitalAddress)) {
                // Alert.alert('Valid Digital Address', 'The digital address is valid.');
                firestore.collection('sellers')
                .add({
                    userId: auth.currentUser.uid,
                    ghCardNumber,
                    additionalPhoneNumber,
                    digitalAddress,
                    paymentMethod, 
                    campus,
                    numOfProductsPosted: 0,
                    notifications: userData.notifications,
                    email: userData.email,
                    joinedDate: userData.joinedDate,
                    phoneNumber: userData.phoneNumber,
                    username: userData.username,
                    profileDisplay: userData.profileDisplay ? userData.profileDisplay : null,
                })
                .then(async () => {
        
                    setLoading(false);
                    setGhCardNumber(null);
                    setCampus(null);
                    setAdditionalPhoneNumber(null);
                    setDigitalAddress(null);
                    setGhCardNumber(null);
                    setPaymentMethod(null);
        
                    const currentUser = auth.currentUser;
        
                    if (currentUser) {
                    const userRef = firestore.collection('users').doc(currentUser.uid);
                    const userDoc = await userRef.get();
                    
                    if (userDoc.exists) {
                        const userData = userDoc.data();
                        if (userData.firstTimePosting === true) {
                            
                            await userRef.update({ firstTimePosting: false });
                            Alert.alert(
                                'Successfully...',
                                'You can now sell your products on this platform for free.'
                            )
        
                            navigation.navigate("Post");
                        }
                    }
                    }
        
                })
                .catch((error) => {
                    alert(error.message)
                    setLoading(false);
                })
              } else {
                setLoading(false);
                Alert.alert('Invalid Digital Address', 'Please enter a valid digital address.');
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setSpinning(false);
        }, 1000);
    }, []);
    

    return (
        <View style={styles.container}>
                <HeadTitle title={"BECOME A SELLER"} />
            <ScrollView 
            contentContainerStyle={styles.innerContainer}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            >

                { spinning ? <Spinner /> : null}

                    <View style={styles.vendorInfo}>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>User ID</Text>
                                <TextInput 
                                    editable={false}
                                    style={[styles.textInput]}
                                    placeholder={`${auth.currentUser.uid}`}
                                    placeholderTextColor={AppColors.black} 
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Additional Phone Number</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    autoCompleteType="tel"
                                    keyboardType="phone-pad"
                                    textContentType="telephoneNumber"
                                    placeholder="055 904 5947"
                                    value={additionalPhoneNumber}
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
                                label="Tertiary"
                                onChange={(value) => {
                                    setCampus(value.value)
                                }}
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Digital Address</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="WS-324-4354"
                                    value={digitalAddress}
                                    onChangeText={(value) => {
                                        setDigitalAddress(value)
                                    }}
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Ghana Card Number</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="GH-7239384-3"
                                    value={ghCardNumber}
                                    onChangeText={(value) => {
                                        setGhCardNumber(value)
                                    }}
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Payment Details</Text>
                                <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                dropdownPosition='auto'
                                data={paymentMethodData}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                onChange={(value) => {
                                    setPaymentMethod(value.value)
                                }}
                                />
                            </View>
                        <TouchableHighlight 
                            style={styles.submitButton}
                            disabled={loading ? true : false} 
                            onPress={() => submit()}>
                            <Text style={{color: AppColors.white}}>Submit</Text>
                        </TouchableHighlight>
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
    vendorInfo: {
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 100,
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

export default VendorInformationScreen;