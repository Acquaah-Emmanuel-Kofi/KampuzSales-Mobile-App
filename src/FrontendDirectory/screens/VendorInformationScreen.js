import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import HeadTitle from "../components/HeadTitle";
import AppColors from "../data/Colors";
import RadioGroup from 'react-native-radio-buttons-group';
import { useState } from "react";

const data = [
    { label: 'Takoradi Technical University', value: 'TTU' },
    { label: 'Others Loading...', value: '' },
  ];

  const paymentMethod = [
    { label: 'Bank', value: 'bank' },
    { label: 'PayStack', value: 'momo' },
    { label: 'Others Loading...', value: '' },
  ];


  const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Bank',
    value: 'bankservice',
    color: '#1DA1F2',
    selected: "true",
}, {
    id: '2',
    label: 'Mobile Money',
    value: 'momo',
    color: '#1DA1F2',
    selected: "true",
}]

function VendorInformation () {

    const [radioButtons, setRadioButtons] = useState(radioButtonsData);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }
    return (
        <View style={styles.container}>
            <ScrollView 
            contentContainerStyle={styles.innerContainer}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            >

                <SafeAreaView>
                    <HeadTitle title={"VENDOR INFORMATION"} />
                </SafeAreaView>
                    <View style={styles.vendorInfo}>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>User ID</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="user id" 
                                />
                            </View>
                            <View style={styles.textInputBox}>
                            <Text style={styles.textTitle}>Email</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="robert.sam@gmail.com" 
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Additional Phone Number</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="+233 559 045 947" 
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
                                placeholder='Takoradi Technical University'
                                searchPlaceholder="Search..."
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Digital Address</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="WS-32-1567" 
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Ghana Card Number</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="GHA-76573265-3" 
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
                                data={paymentMethod}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='BANK'
                                searchPlaceholder="Search..."
                                />
                            </View>
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
        // marginVertical: 10,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 100
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
    paymentMethod: {},
    radioGroup: {
        justifyContent: 'center',
        alignItems: 'center',
    },
  });

export default VendorInformation;