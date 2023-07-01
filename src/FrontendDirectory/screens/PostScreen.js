import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  AppColors  from "../data/Colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { auth, firebase, firestore, storage } from "../../BackendDirectory/config";
import { useNavigation } from "@react-navigation/native";
import CediSign from "../components/CediSign";
import uploadImageToStorage from "../../BackendDirectory/functionalities/uploadImageToStorage";

  const data = [
    { label: 'Phones & Tablet', value: 'Phones' },
    { label: 'Laptops', value: 'Laptops' },
    { label: 'Books', value: 'Books' },
    { label: 'Food', value: 'Food' },
    { label: 'Gaming', value: 'Gaming' },
    { label: 'Clothing', value: 'Clothing' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Electronics', value: 'Electronics' },
  ];
;

function PostScreen() {

    const navigation = useNavigation();

     const [ image, setImage ] = useState([]);
     const [ uploading, setUploading ] = useState(false);
     const [ processed, setProcessed ] = useState(0);
     const [ category, setCategory ] = useState(null);
     const [ productTitle, setProducTitle ] = useState(null);
     const [ price, setPrice ] = useState(null);
     const [ quantity, setQuantity ] = useState(null);
     const [ condition, setCondition ] = useState(null);
     const [ description, setDescription ] = useState(null);
     const [ isFocus, setIsFocus ] = useState(false);
     const [ selectedImages, setSelectedImages ] = useState(null); 


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

        if(image !== null || category !== null || productTitle !== null || price !== null || quantity !== null || condition !== null || description !== null){
        
            const currentUser = auth.currentUser;

            if (currentUser) {
            const userRef = firestore.collection('users').doc(currentUser.uid);
            const userDoc = await userRef.get();
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.firstPost === true) {
                    Alert.alert(
                        "First Time Posting?",
                        "Please, provide your information for security purpose."
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
                                Alert.alert(
                                    'Product Posted!',
                                    'Your product is posted successfully!',
                                );
                
                                setProducTitle(null);
                                setPrice(null);
                                setCategory(null);
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
                condition,
                productImages: imageUrls,
                description,
                status: 'popular',
                postTime: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {

                setProducTitle(null);
                setPrice(null);
                setCategory(null);
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
        <View style={styles.container}>
            <HeadTitle title={"Post Product"} />
            <ScrollView 
                contentContainerStyle={styles.innerContainer}
                automaticallyAdjustKeyboardInsets={true}
                alwaysBounceVertical={true}
                automaticallyAdjustsScrollIndicatorInsets={true}
                >
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
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Category' : 'Select category'}
                        searchPlaceholder="Search..."
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
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Title" 
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
                                style={[styles.descriptionTextInput, isFocus && { borderColor: AppColors.primary }]}
                                placeholder="Description" 
                                numberOfLines={10}
                                multiline={true}
                                value={description}
                                onChangeText={(content) => setDescription(content)}
                            />
                    </View>
                </View>
                <View style={styles.buttoms}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
    },
    progressBar: {
        // paddingVertical: 4,
        marginTop: 30,
    },
    clearText: {
        color: AppColors.primary,
    },
    postText: {
        color: AppColors.white,
    },
    innerContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: AppColors.white,
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
              shadowOffset: { width: 0, height: 2 },
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
    buttoms: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    clearButtom: {
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
    postButtom: {
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