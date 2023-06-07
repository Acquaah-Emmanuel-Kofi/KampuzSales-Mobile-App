import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import HeadTitle from "../components/HeadTitle";
import AppColors from "../data/Colors";
import { RadioButton } from 'react-native-paper';
import { useState } from "react";
import RadioGroup from 'react-native-radio-buttons-group';

const data = [
    { label: 'Takoradi Technical University', value: 'TTU' },
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

    // const radioButtonsData = [{
    //     id: '1', // acts as primary key, should be unique and non-empty string
    //     label: 'Bank',
    //     value: 'bank'
    // }, {
        // id: '2',
        // label: 'Mobile Money',
        // value: 'momo',
    // }]

function PaymentDetails () {
    const [checked, setChecked] = useState('first');
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    let buttons = (
        <View>
            <RadioButton
            value="first"
            status={ checked === 'first' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('first')}
            />
            <RadioButton
            value="second"
            status={ checked === 'second' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('second')}
            />
        </View>
    )

    return (
        <View style={styles.container}>
            <ScrollView 
            contentContainerStyle={styles.innerContainer}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            >

                <SafeAreaView>
                    <HeadTitle title={"PAYMENT DETAILS"} />
                    <HeadTitle title={"SELECT PAYMENT METHOD"} />
                </SafeAreaView>
                    <View style={styles.paymentMethod}>
                        <RadioGroup 
                            layout='row'
                            radioButtons={radioButtons} 
                            onPress={() => onPressRadioButton()} 
                        />
                        {/* {buttons} */}
                        <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Ghana Card Number</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="GHA-76573265-3" 
                                />
                            </View>
                            <View style={styles.textInputBox}>
                                <Text style={styles.textTitle}>Ghana Card Number</Text>
                                <TextInput 
                                    style={[styles.textInput]}
                                    placeholder="GHA-76573265-3" 
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
    paymentMethod: {
        width: '100%',
        // alignItems: 'flex-start',
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
  });

export default PaymentDetails;