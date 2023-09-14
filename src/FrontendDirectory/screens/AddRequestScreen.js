import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, Pressable } from "react-native";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import AppColors from "../data/Colors";
import CediSign from "../components/CediSign";
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useState } from "react";
import { auth, firestore, firebase } from "../../BackendDirectory/config";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from "react-native";
import uploadImageToStorage from "../../BackendDirectory/functionalities/uploadImageToStorage";
import { categoriesData, electronicsCategories, fashionCategories, phonesCategories } from "../data/categoriesData";

function AddRequestScreen({navigation}) {

    const [ productTitle, setProductTitle ] = useState(null);
    const [ category, setCategory ] = useState(null);
    const [ subCategory, setSubCategory ] = useState(null);
    const [ subCategoryData, setSubCategoryData ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ budget, setBudget ] = useState(null);
    const [ image, setImage ] = useState(null);
    const [ isFocus, setIsFocus ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    useEffect(()=> {

        const fetchSubCartegoriesData = () => {
            if(category == 'Electronics'){
                return electronicsCategories;
            } else if (category == 'Fashion'){
                return fashionCategories;
            } else if (category == 'Phones'){
                return phonesCategories;
            } else {
                return [];
            }
        }

        let cartData = fetchSubCartegoriesData();

        setSubCategoryData(cartData);

    }, [category]);

    const handlePostRequest = async () => {
        setLoading(true)

        const user = auth.currentUser;

        if(productTitle !== null || description !== null || budget !== null){
            // check for empty fields before posting the data to database

            if(image !== null){
                const response = await fetch(image.uri);
                const blob = await response.blob();
                const imageUrl = await uploadImageToStorage("requests", user.uid, blob);
        
                firestore.collection('requests')
                .add({
                    userId: auth.currentUser.uid,
                    productTitle,
                    budget: budget.includes('.') ? budget : budget + ".00",
                    description,
                    sampleImage: image ? imageUrl?.downloadURL : null,
                    postTime: firebase.firestore.Timestamp.fromDate(new Date()),
                })
                .then(() => {
                    Alert.alert(
                        "Success",
                        "Successfully posted a request"
                    )
                    setProductTitle(null);
                    setBudget(null);
                    setDescription(null);
                    setLoading(false);
                    setImage(null);
                    
                    navigation.navigate("ViewRequest")
                })
                .catch((error) => {
                    setLoading(false)
                    alert(error.message)
                })
            } else {
                firestore.collection('requests')
                .add({
                    userId: auth.currentUser.uid,
                    productTitle,
                    budget: budget.includes('.') ? budget : budget + ".00",
                    description,
                    postTime: firebase.firestore.Timestamp.fromDate(new Date()),
                })
                .then(() => {
                    Alert.alert(
                        "Success",
                        "Successfully posted a request"
                    )
                    setProductTitle(null);
                    setBudget(null);
                    setDescription(null);
                    setLoading(false);
                    setImage(null);
                    
                    navigation.navigate("ViewRequest")
                })
                .catch((error) => {
                    setLoading(false)
                    alert(error.message)
                })
            }
        } else {
            setLoading(false)
            Alert.alert(
                "Required Fields!",
                "Fields cannot be empty!"
            )
        }

    }

    const pickImage = async () => {
        // no permission is rewuired
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });

        if (!result.canceled) {
            const source = {uri: result?.assets[0]?.uri};
            setImage(source);
        }

     }

    return (
        <View style={styles.container}>
            <HeadTitleWithBackIcon 
                previousScreen={() => navigation.goBack()}
                title={"Add Request"}
            />
            <ScrollView 
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            >
            <View style={styles.innerContainer}>
                <View style={styles.textInputBox}>
                    <Text style={styles.textTitle}>What do you want?</Text>
                    <TextInput 
                        style={[styles.textInput]}
                        placeholder="Product Title: Ex. iPhone 12 Pro Max"
                        value={productTitle}
                        onChangeText={(value) => setProductTitle(value)}
                    />
                </View>
                <View style={styles.textInputBox}>
                    <Text style={styles.textTitle}>Add Category</Text>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        dropdownPosition='auto'
                        data={categoriesData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Help sellers to filter easily.'}
                        value={category}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setCategory(item.value);
                            setIsFocus(false);
                        }}
                        />
                </View>
                <View style={styles.textInputBox}>
                {
                    subCategoryData?.length > 1 ? (
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            dropdownPosition='auto'
                            data={subCategoryData === null ? categoriesData : subCategoryData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Sub Category' : 'Select sub category'}
                            value={subCategory}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setSubCategory(item.value);
                                setIsFocus(false);
                            }}
                            />
                    ) : null
                }
                </View>
                <View style={styles.textInputBox}>
                    <Text style={styles.textTitle}>Description</Text>
                    <TextInput 
                        style={[styles.textInput, {height: 100}]}
                        numberOfLines={100}
                        multiline={true}
                        placeholder="Product description: Ex. I want a gold colour with 256 storage..."
                        value={description}
                        onChangeText={(content) => setDescription(content)}
                    />
                </View>
                <View style={styles.textInputBox}>
                    <Text style={styles.textTitle}>Budget</Text>
                    <View style={{
                        flexDirection:'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <CediSign />
                        <TextInput 
                            style={[styles.textInput, {width: '90%'}]}
                            keyboardType="numeric"
                            placeholder="100.00"
                            value={budget}
                            onChangeText={(value) => setBudget(value)}
                        />
                    </View>
                </View>
                <View style={styles.textInputBox}>
                    <Text style={styles.textTitle}>Attach an image (optional)</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        {image ? (
                            <Image style={{
                                width: 50, 
                                height: 50, 
                                borderWidth: 1, 
                                borderRadius: 8,
                                borderColor: AppColors.borderGray,
                                marginRight: 30,
                            }} source={{uri: image?.uri}} resizeMode='stretch' />
                        ) : (
                            <View style={{
                                width: 50, 
                                height: 50, 
                                borderWidth: 1, 
                                borderColor: AppColors.borderGray,
                                borderRadius: 8,
                                marginRight: 30,
                            }}></View>
                        )}
                            <Pressable 
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onPress={() => pickImage()}
                            >
                            <Entypo 
                                name="plus" 
                                size={20} 
                                color={AppColors.black} />
                            <Text> Upload image</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.postButton} onPress={() => handlePostRequest()}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                }}>
                    {loading ? null : <MaterialCommunityIcons name="arrange-send-to-back" size={20} color={AppColors.white} />}
                    <Text style={{color: AppColors.white, fontSize: 16, fontWeight: 500}}>{loading ? "Posting..." : "Post Request"}</Text>
                </View>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 40,
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
        backgroundColor: AppColors.white,
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
    inputSearchStyle: {
      height: 40,
      fontSize: 14,
    },
    postButton: {
        backgroundColor: AppColors.primary,
        marginHorizontal: 20,
        marginBottom: 50,
        paddingVertical: 20,
        borderRadius: 10,
        flexDirection: 'row',
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
})
export default AddRequestScreen;