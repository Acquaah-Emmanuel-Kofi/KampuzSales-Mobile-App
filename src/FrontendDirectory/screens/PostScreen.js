import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  AppColors  from "../data/Colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { auth, firebase, firestore, storage } from "../../BackendDirectory/config";
import { useNavigation } from "@react-navigation/native";
import { ProgressBar, MD3Colors } from 'react-native-paper';

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
     const [ condition, setCondition ] = useState(null);
     const [ discription, setDiscription ] = useState(null);
     const [ isFocus, setIsFocus ] = useState(false);
     const [ selectedImages, setSelectedImages ] = useState(null);
     const [ firstTimePost, setFirstTimePost ] = useState(null);

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

        if(image !== null || category !== null || productTitle !== null || price !== null || condition !== null || discription !== null){
        
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
                //   let snapshots;

                    for (const imageFile of imageFiles) {
                        let response = await uploadImageToStorage(userId, imageFile);
                        imagesInAnArray.push(response.downloadURL);
                        // snapshots = response.snapshot;
                    }

                    // console.log(snapshots);

                    // snapshots?.on('state_changed', taskSnapshot => {
                    //     const progress = Math.round(
                    //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
                    //     );
                    //     console.log("progress: ", progress);
                    
                    //     // Check if the upload is complete
                    //     if (progress === 100) {
                    //       // Upload completed
                    //       // Do something here, such as displaying a success message or redirecting the user
                    //       console.log('Upload completed!');
                    //     }
                    //   });

                    if(firstTimePost){
                        Alert.alert(
                            "First Time Posting?",
                            "Please, provide your information to security purpose."
                        )
                        navigation.navigate("VendorInfo");
                } else {

                    // Upload product details to firestore
                    postProductDetails(imagesInAnArray);
                    Alert.alert(
                        'Product Posted!',
                        'Your product is posted successfully!',
                    );
    
                    setProducTitle(null);
                    setPrice(null);
                    setCategory(null);
                    setDiscription(null);
                    setUploading(false);
                    setCondition(null);
                    setImage(null);

                }



            } catch (error) {

                setUploading(false);
                console.log(error.message);
                Alert.alert(
                    'Product Not Posted!',
                    error.message,
                );

            }
          }
      } else {
        Alert.alert(
            "No Product Details!",
            "Please, enter the details of what you want to post."
        )
      }
    }
    
      const uploadImageToStorage = async (userId, imageFile) => {
        try {
          const storageRef = storage.ref();
          const productRef = storageRef.child(`newProductImages/${userId}`);
          
          // Generate a unique filename for the image
          const filename = `${Date.now()}_${userId}`;
    
          // Upload the image to the cart folder
          const imageRef = productRef.child(filename);
          const snapshot = await imageRef.put(imageFile);
    
          // Get the download URL of the uploaded image
          const downloadURL = await snapshot.ref.getDownloadURL();
          
        return {
            downloadURL: downloadURL,
            // snapshot: snapshot,
        };

        } catch (error) {
            setUploading(false);
            console.error('Error uploading image:', error);
            alert(error.message);
        }

      };

     const cancelPost = () => {
        setProducTitle(null);
        setPrice(null);
        setCategory(null);
        setDiscription(null);
        setUploading(false);
        setCondition(null);
        setImage(null);
     }

     const postProductDetails = (imageUrls) => {
            firestore.collection('products')
            .add({
                userId: auth.currentUser.uid,
                productTitle: productTitle,
                price: price + ".00",
                category: category,
                condition: condition,
                productImages: imageUrls,
                description: discription,
                status: 'popular',
                postTime: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {

                setProducTitle(null);
                setPrice(null);
                setCategory(null);
                setDiscription(null);
                setUploading(false);
                setCondition(null);
                setImage(null);

            })
            .catch((error) => {
                alert(error.message)
            })
        }

    //  const countUserPosts = async (userId) => {
    //     try {
    //       const postsSnapshot = await firebase.firestore()
    //         .collection('products')
    //         .where('userId', '==', userId)
    //         .get();
      
    //       const postCount = postsSnapshot.size;
      
    //       console.log('User post count:', postCount);
    //     } catch (error) {
    //       console.log('Error counting user posts:', error);
    //     }
    //   };

    //   countUserPosts(userId);

    // Function to check if the user is posting for the first time
const checkFirstPost = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = firestore.collection('users').doc(currentUser.uid);
      const userDoc = await userRef.get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData.firstPost === true) {
          // User is posting for the first time
          // Perform necessary actions or show a first-time post welcome message
          setFirstTimePost(true);
          
          // Update the firstPost field to indicate that the user has made their first post
        //   await userRef.update({ firstPost: false });
        } else {
          // User has posted before
          setFirstTimePost(false);
        }
      }
    }
  };
  
  
    useEffect(() => {
        // Call the checkFirstPost function when the user attempts to make a post
        checkFirstPost();
    }, [image])
     
     
    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.innerContainer}
                automaticallyAdjustKeyboardInsets={true}
                alwaysBounceVertical={true}
                automaticallyAdjustsScrollIndicatorInsets={true}
                >
                <HeadTitle title={"Post Product"} />
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
                { uploading ? (
                <View style={styles.progressBar}>
                    <ProgressBar progress={0.5} theme={{ colors: { primary: AppColors.primary } }}  />
                    <Text>{processed}%</Text>
                </View> ) : null }
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
                    <View style={styles.textInputBox}>
                        <TextInput 
                            style={[styles.textInput]}
                            placeholder="Price" 
                            keyboardType="numeric"
                            value={price}
                            onChangeText={(value) => setPrice(value)}
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
                                numberOfLines={5}
                                multiline={true}
                                value={discription}
                                onChangeText={(content) => setDiscription(content)}
                            />
                    </View>
                </View>
                <View style={styles.buttoms}>
                    <TouchableOpacity style={styles.clearButtom} onPress={cancelPost}>
                        <Text style={styles.clearText}>Clear</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.postButtom} onPress={() => navigation.navigate("VendorInfo")}> */}
                    <TouchableOpacity 
                        style={styles.postButtom} 
                        disabled={uploading ? true : false} 
                        onPress={() => submitPost()}>
                        <Text style={styles.postText}>{uploading ? 'Posting...' : 'Post'}</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text>{processed} % completed</Text> */}
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
        paddingBottom: 100,
        marginHorizontal: 20
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
        // backgroundColor: 'transparent',
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