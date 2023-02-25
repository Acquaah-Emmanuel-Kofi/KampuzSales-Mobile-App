import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  Colors  from "../data/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../BackendDirectory/config';

function PostScreen() {

     const [ image, setImage ] = useState(null);
     const [ uploading, setUploading ] = useState(false);


     const pickImage = async () => {
        // no permission is rewuired
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4,3],
            allowsMultipleSelection: true,
            quality: 1
        });

        if (!result.canceled) {
            const source = {uri: result.assets[0].uri};
            setImage(source);
        }

     }

     const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try {
            await ref;
        } catch(e){
            console.log(e);
        }

        setUploading(false);

        setImage(null);
     }
     
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <HeadTitle title={"Sell"} />
                <View style={styles.postAndThumbnail}>
                    <View style={styles.thumbnail}>
                        { image && <Image source={{uri: image.uri}} resizeMode='stretch' style={styles.image} />}
                    </View>
                    <Pressable style={styles.postIconView} onPress={pickImage}>
                        <MaterialCommunityIcons style={styles.postIcon} name="plus-circle-multiple" size={50} color={Colors.main} />
                    </Pressable>
                </View>
                <View style={styles.postDetails}>
                    <View style={styles.textInputBox}>
                        <TextInput style={styles.textInput} placeholder="Title" />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput style={styles.textInput} placeholder="Category" />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput style={styles.textInput} placeholder="Location" />
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput style={styles.textInput} placeholder="Brand" />
                    </View>
                    <View style={styles.textInputBox}>
                            <TextInput 
                                style={styles.descriptionTextInput}
                                placeholder="Description" 
                                // numberOfLines={5}
                                multiline={true}
                            />
                    </View>
                </View>
                <View style={styles.buttoms}>
                    <Pressable style={styles.clearButtom} onPress={() => alert("Cleared!")}>
                        <Text style={styles.clearButtomText}>Clear</Text>
                    </Pressable>
                    <Pressable style={styles.postButtom} onPress={uploadImage}>
                        <Text style={styles.postButtomText}>Post</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    innerContainer: {
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
        backgroundColor: Colors.borderGray,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 140,
        height: 140,
    },
    postIconView: {
        width: '35%',
    },
    postIcon: {
        opacity: .9,
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
        borderColor: Colors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    descriptionTextInput: {
        borderWidth: 1,
        borderColor: Colors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 150,
    },
    buttoms: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    clearButtom: {
        borderWidth: 1,
        borderColor: Colors.main,
        borderRadius: 8,
        width: 150,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButtomText: {
        color: Colors.main,
    },
    postButtom: {
        backgroundColor: Colors.main,
        borderRadius: 8,
        width: 150,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postButtomText: {
        color: Colors.white,
    },
  });

export default PostScreen;