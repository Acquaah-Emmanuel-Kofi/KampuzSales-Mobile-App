import { useEffect, useState } from "react";
import { SafeAreaView, Platform, ScrollView, Alert, StyleSheet, TouchableHighlight, Text, TextInput, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import HeadTitle from "../components/HeadTitle";
import AppColors from "../data/Colors";
import { auth, firestore } from "../../BackendDirectory/config";
import { isValidDigitalAddress } from "../../BackendDirectory/functionalities/functions";
import Spinner from "../components/spinner";

const data = [
    { label: 'Takoradi Technical University', value: 'TTU' },
    { label: 'BU - TAKORADI', value: 'BU' },
    { label: 'Others Loading...', value: '' },
  ];

  const paymentMethodData = [
    { label: 'Bank', value: 'bank' },
    { label: 'PayStack', value: 'momo' },
    { label: 'Others Loading...', value: '' },
  ];


function BuyerInformationScreen ({navigation}) {


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
            <SafeAreaView>
                <HeadTitle title={"Buyuer Information"} />
            </SafeAreaView>
            <ScrollView 
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            >

                { spinning ? <Spinner /> : null}

                    <View style={styles.sellerInfo}>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Name</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="Andrew Eshun"
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>GPS Location</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="W-376434-GH"
                                    value={digitalAddress}
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
                                    value={additionalPhoneNumber}
                                    onChangeText={(value) => {
                                        setAdditionalPhoneNumber(value)
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
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                label="Tertiary"
                                searchPlaceholder="Search..."
                                onChange={(value) => {
                                    setCampus(value.value)
                                }}
                                />
                            </View>
                        </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.backButtom}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.nextButtom}>
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
        width: 150,
        height: 40,
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
        width: 150,
        height: 40,
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