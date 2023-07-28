import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  AppColors  from "../data/Colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { auth, firebase, firestore } from "../../BackendDirectory/config";
import { useNavigation } from "@react-navigation/native";
import CediSign from "../components/CediSign";
import uploadImageToStorage from "../../BackendDirectory/functionalities/uploadImageToStorage";
import { categoriesData, electronicsCategories, fashionCategories, phonesCategories } from "../data/categoriesData";
import { increasePostCount } from "../../BackendDirectory/functionalities/functions";


function PostScreen() {

    const navigation = useNavigation();

     const [ image, setImage ] = useState([]);
     const [ uploading, setUploading ] = useState(false);
     const [ category, setCategory ] = useState(null);
     const [ subCategory, setSubCategory ] = useState(null);
     const [ subCategoryData, setSubCategoryData ] = useState(null);
     const [ productTitle, setProducTitle ] = useState(null);
     const [ price, setPrice ] = useState(null);
     const [ quantity, setQuantity ] = useState(null);
     const [ condition, setCondition ] = useState(null);
     const [ description, setDescription ] = useState(null);
     const [ isFocus, setIsFocus ] = useState(false);
     const [ selectedImages, setSelectedImages ] = useState(null); 


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


    const handleImageUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
          alert('Permission to access camera roll is required!');
          return;
        }
        
        const selectedImage = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          selectionLimit: 3,
          aspect: [4,3],
          quality: 1,
        });

        setSelectedImages(selectedImage);

        if (!selectedImage.canceled) {
            const source = {uri: selectedImage.assets[0].uri};
            setImage(source);
        }

      };

      const submitPost = async () => {

        if(image !== null || category !== null || subCategory !== null || productTitle !== null || price !== null || quantity !== null || condition !== null || description !== null){
        
            const currentUser = auth.currentUser;

            if (currentUser) {
            const userRef = firestore.collection('users').doc(currentUser.uid);
            const userDoc = await userRef.get();
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.firstTimePosting === true) {
                    Alert.alert(
                        "First Time Posting?",
                        "Please, provide your information to become a seller."
                    )
        
                    navigation.navigate("VendorInfo");
                } else {
                    let userId = auth.currentUser.uid;
                    setUploading(true);

                    if (selectedImages && !selectedImages.canceled) {
                        const imageAssets = Array.isArray(selectedImages.assets) ? selectedImages.assets : [selectedImages.assets];
                        const imageFiles = [];
                    
                        try {
                            for (const asset of imageAssets) {
                                const response = await fetch(asset.uri);
                                const blob = await response.blob();
                                imageFiles.push(blob);
                            }
                        

                            let imagesInAnArray = [];

                            for (const imageFile of imageFiles) {
                                let response = await uploadImageToStorage("products", userId, imageFile);
                                imagesInAnArray.push(response.downloadURL);
                            }
                                // Upload product details to firestore
                                postProductDetails(imagesInAnArray);

                                increasePostCount();
                                Alert.alert(
                                    'Product Posted!',
                                    'Your product is posted successfully!',
                                );
                
                                setProducTitle(null);
                                setPrice(null);
                                setCategory(null);
                                setSubCategory(null);
                                setDescription(null);
                                setUploading(false);
                                setCondition(null);
                                setImage(null);
                                setQuantity(null);
                    } catch (error) {

                        setUploading(false);
                        console.log(error.message);
                        Alert.alert(
                            'Product Not Posted!',
                            error.message,
                        );

                    }
                }
                }
            }
            }
      } else {
        Alert.alert(
            "No Product Details!",
            "Please, enter the details of what you want to post."
        )
      }
    }

     const cancelPost = () => {
        setProducTitle(null);
        setPrice(null);
        setCategory(null);
        setSubCategory(null);
        setDescription(null);
        setUploading(false);
        setCondition(null);
        setImage(null);
        setQuantity(null);
     }

     const postProductDetails = (imageUrls) => {
            firestore.collection('products')
            .add({
                userId: auth.currentUser.uid,
                productTitle,
                price: price.includes('.') ? price : price + ".00",
                quantity,
                category,
                subCategory,
                condition,
                productImages: imageUrls,
                description,
                isChecked: false,
                postTime: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {

                setProducTitle(null);
                setPrice(null);
                setCategory(null);
                setSubCategory(null);
                setDescription(null);
                setUploading(false);
                setCondition(null);
                setImage(null);
                setQuantity(null);

            })
            .catch((error) => {
                alert(error.message)
            })
        }
     
     
    return (
        <SafeAreaView style={styles.container}>
            <HeadTitle title={"Post Product"} />
            <ScrollView 
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
                alwaysBounceVertical={true}
                automaticallyAdjustsScrollIndicatorInsets={true}
            >
                <View style={styles.innerContainer}>
                    <View style={styles.postAndThumbnail}>
                        {image ? (
                        <View style={styles.thumbnail}>
                            { image && <Image source={{uri: image.uri}} resizeMode='stretch' style={styles.image} /> }
                        </View> ) : (
                        <View style={styles.thumbnail}>
                            <Entypo name="images" size={70} color={AppColors.primary} />
                        </View>)}
                        { uploading ?
                            (
                                <View style={styles.activityIndicatorIcon}>
                                    <ActivityIndicator size="large" color={AppColors.primary} />
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.postIconView} onPress={() => handleImageUpload()}>
                                    <FontAwesome5 style={styles.postIcon} name="plus" size={30} color={AppColors.primary} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <View style={styles.postDetails}>
                        <View style={styles.textInputBox}>
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
                            placeholder={'Category'}
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
                            <TextInput 
                                style={[styles.textInput]}
                                placeholder="Product Title" 
                                value={productTitle}
                                onChangeText={(content) => setProducTitle(content)}
                            />
                        </View>
                        <View style={styles.priceInputBox}>
                            <View style={{flexDirection: 'row', width: '60%', justifyContent: 'space-between', alignItems: 'center'}}>
                                <CediSign />
                                <View style={styles.price}>
                                    <TextInput 
                                        style={[styles.priceInput]}
                                        placeholder="Price" 
                                        keyboardType="numeric"
                                        value={price}
                                        onChangeText={(value) => setPrice(value)}
                                    />
                                    <Text style={{color: AppColors.borderGray}}>.00</Text>
                                </View>
                            </View>
                            <TextInput 
                                style={styles.quantity}
                                placeholder="Quantity" 
                                keyboardType="numeric"
                                value={quantity}
                                onChangeText={(value) => setQuantity(value)}
                            />
                        </View>
                        { category === 'Phones' || category === 'Laptops' ?
                            (
                                <View style={styles.textInputBox}>
                                    <TextInput 
                                        style={[styles.textInput]}
                                        placeholder="Brand" 
                                        value={condition}
                                        onChangeText={(content) => setCondition(content)}
                                    />
                                </View>
                            ) : 
                            (
                                null
                            )
                        }
                        { category === 'Phones' || category === 'Laptops' ?
                            (
                                <View style={styles.textInputBox}>
                                    <TextInput 
                                        style={[styles.textInput]}
                                        placeholder="Storage" 
                                        value={condition}
                                        onChangeText={(content) => setCondition(content)}
                                    />
                                </View>
                            ) : 
                            (
                                null
                            )
                        }
                        { category === 'Phones' || category === 'Laptops' ?
                            (
                                <View style={styles.textInputBox}>
                                    <TextInput 
                                        style={[styles.textInput]}
                                        placeholder="RAM" 
                                        value={condition}
                                        onChangeText={(content) => setCondition(content)}
                                    />
                                </View>
                            ) : 
                            (
                                null
                            )
                        }
                        { category === 'Food' ?
                            (
                                <View style={styles.textInputBox}>
                                    <TextInput 
                                        style={[styles.textInput]}
                                        placeholder="Food Type" 
                                        value={condition}
                                        onChangeText={(content) => setCondition(content)}
                                    />
                                </View>
                            ) : 
                            (
                                <View style={styles.textInputBox}>
                                    <TextInput 
                                        style={[styles.textInput]}
                                        placeholder="Condition" 
                                        value={condition}
                                        onChangeText={(content) => setCondition(content)}
                                    />
                                </View>
                            )
                        }
                        { category === 'Clothing' ?
                            (
                                <View style={styles.textInputBox}>
                                    <TextInput 
                                        style={[styles.textInput]}
                                        placeholder="Colour" 
                                        value={condition}
                                        onChangeText={(content) => setCondition(content)}
                                    />
                                </View>
                            ) : 
                            (
                                null
                            )
                        }
                        { category === 'Clothing' ?
                            (
                                <View style={styles.textInputBox}>
                                    <TextInput 
                                        style={[styles.textInput]}
                                        placeholder="Brand" 
                                        value={condition}
                                        onChangeText={(content) => setCondition(content)}
                                    />
                                </View>
                            ) : 
                            (
                                null
                            )
                        }
                        <View style={styles.textInputBox}>
                                <TextInput 
                                    style={[styles.descriptionTextInput]}
                                    placeholder="Description" 
                                    numberOfLines={10}
                                    multiline={true}
                                    value={description}
                                    onChangeText={(content) => setDescription(content)}
                                />
                        </View>
                    </View>
                </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.clearButtom} onPress={cancelPost}>
                            <Text style={styles.clearText}>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.postButtom} 
                            disabled={uploading ? true : false} 
                            onPress={() => submitPost()}>
                            <Text style={styles.postText}>{uploading ? 'Posting...' : 'Post'}</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
    innerContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 40,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: AppColors.white,
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
              marginBottom: 100,
            },
        }),
    },
    postAndThumbnail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    thumbnail: {
        width: 150,
        height: 150,
        backgroundColor: AppColors.borderGray,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    image: {
        width: 140,
        height: 140,
    },
    activityIndicatorIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    },
    postIconView: {
        backgroundColor: AppColors.white,
        borderRadius: 50,
        marginRight: 80,
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
    postIcon: {
        opacity: .9,
        padding: 10,
    },
    postDetails: {
        marginVertical: 10,
        marginTop: 20,
    },
    textInputBox: {
        marginVertical: 6,
    },
    priceInputBox: {
        marginVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    priceInput: {
        width: '70%',
    },
    quantity: {
        width: '35%',
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 14,
    },
    textInput: {
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 14,
    },
    descriptionTextInput: {
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 50,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginBottom: 100,
    },
    clearButtom: {
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
    clearText: {
        color: AppColors.primary,
    },
    postButtom: {
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
    postText: {
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
  });

export default PostScreen;