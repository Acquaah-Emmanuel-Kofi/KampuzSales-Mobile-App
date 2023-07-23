import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, Platform, ScrollView, Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import HeadTitle from "../components/HeadTitle";
import AppColors from "../data/Colors";
import { auth, firestore } from "../../BackendDirectory/config";
import CediSign from "../components/CediSign";
import RadioGroup from 'react-native-radio-buttons-group';

const data = [
    { label: 'Mobile Money', value: 'momo' },
    { label: 'Bank', value: 'bank' },
];

const momoData = [
    { label: 'MTN', value: 'mtn' },
    { label: 'Vodafone', value: 'vodafone' },
    { label: 'Airtel Tigo', value: 'airtelTigo' },
];

const bankData = [
    { label: 'Zenith Bank', value: 'momo' },
    { label: 'GT Bank', value: 'bank' },
    { label: 'Fidelity Bank', value: 'bank' },
    { label: 'Access Bank', value: 'bank' },
    { label: 'Cal Bank', value: 'bank' },
    { label: 'Ecobank', value: 'bank' },
    { label: 'UBA', value: 'bank' },
];

function OrderSummaryScreen ({navigation, route}) {

    const cartData = route.params;

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Payment on delivery',
            value: 'option1',
            borderColor: AppColors.primary,
            color: AppColors.primary,
            size: 20,
            layout: 'row'
            // description: "Hello world hjgi y uyiut8yt uydstuy tyt utdfyt uhy yyu8t uhtfdyt whre dt hgh hgyty "
        },
        {
            id: '2',
            label: 'Payment on pick up',
            value: 'option2',
            borderColor: AppColors.primary,
            color: AppColors.primary,
            size: 20,
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();

    const [ totalAmount, setTotalAmount ] = useState(null);
    const [ payment, setPayment ] = useState(null);

    const fecthCartPrices = () => {
        let productsPrices = [];

        cartData && cartData.map((product) => {
            {auth.currentUser.uid === product.userId ? 
                productsPrices.push(product.price)
            : null }
        })
        
        let prices = productsPrices.reduce((accumulator, currentValue) => {
            const numericValue = parseFloat(currentValue);
            return accumulator + numericValue;
        }, 0);

        setTotalAmount(prices);
    }

    const handleConfirmOrder = () => {
        navigation.navigate("OrderSuccess");
    }

    useEffect(() => {
        fecthCartPrices();
    }, []);


    return (
        <View style={styles.container}>
        <SafeAreaView>
            <HeadTitle title={"Order Summary"} />
        </SafeAreaView>
        <ScrollView 
        automaticallyAdjustKeyboardInsets={true}
        alwaysBounceVertical={true}
        automaticallyAdjustsScrollIndicatorInsets={true}
        >
            <View>
                <Text style={styles.cardTitle}>Item Details</Text>
                <View style={styles.orderInfo}>
                    { cartData?.map((data) => (
                        <View style={styles.flex} key={data.id}>
                            <Text>{data.productTitle}</Text>
                            <Text>{data.price}</Text>
                        </View>
                    ))}
                    <View style={styles.flex}>
                        <Text>VAT</Text>
                        <Text>Price</Text>
                    </View>
                    <View style={[styles.flex, {marginVertical: 20}]}>
                        <Text>Delivery Fee</Text>
                        <Text>Price</Text>
                    </View>
                    <View style={styles.flex}>
                        <Text style={{fontWeight: 600}}>Total (<CediSign />)</Text>
                        <Text>{totalAmount ? totalAmount : "0.00"}</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.cardTitle}>Payment Details</Text>
                <View style={styles.orderInfo}>
                    <Text style={styles.textTitle}>Payment Method</Text>
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
                        placeholder="Mobile Money"
                        onChange={(value) => {
                            setPayment(value.value)
                        }}
                    />
                { payment === "bank" ? (
                    <>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Name of Bank</Text>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            dropdownPosition='auto'
                            data={bankData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Ecobank"
                            onChange={(value) => {
                                setCampus(value.value)
                            }}
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Account Number</Text>
                        <TextInput 
                            style={[styles.textInput]}
                            keyboardType="phone-pad"
                            placeholder="xxxx xxxx xxxx xx"
                            onChangeText={(value) => {
                                setAdditionalPhoneNumber(value)
                            }}
                        />
                    </View>
                    <View style={{width: '45%',}}>
                        <RadioGroup 
                            radioButtons={radioButtons} 
                            onPress={setSelectedId}
                            selectedId={selectedId}
                        />
                    </View>
                    </>
                ) : (
                    <>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Momo Network</Text>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            dropdownPosition='auto'
                            data={momoData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="MTN"
                            onChange={(value) => {
                                setCampus(value.value)
                            }}
                        />
                    </View>
                    <View style={styles.textInputBox}>
                        <Text style={styles.textTitle}>Momo Number</Text>
                        <TextInput 
                            style={[styles.textInput]}
                            autoCompleteType="tel"
                            keyboardType="phone-pad"
                            textContentType="telephoneNumber"
                            placeholder="+233 559-045-947"
                            onChangeText={(value) => {
                                setAdditionalPhoneNumber(value)
                            }}
                        />
                    </View>
                    <View style={{width: '45%',}}>
                        <RadioGroup 
                            radioButtons={radioButtons} 
                            onPress={setSelectedId}
                            selectedId={selectedId}
                        />
                    </View>
                    </>
                )}
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
                    onPress={() => handleConfirmOrder()}>
                    <Text style={styles.nextText}>Order</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
    orderInfo: {
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
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
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
})

export default OrderSummaryScreen;