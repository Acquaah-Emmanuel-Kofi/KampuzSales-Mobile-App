import React from "react";
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import HeadTitle from "../components/HeadTitle";
import  Colors  from "../data/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function PostScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <HeadTitle title={"Sell"} />
                <View style={styles.postAndThumbnail}>
                    <View style={styles.thumbnail}>
                        <Text>Thumbnail</Text>
                    </View>
                    <Pressable style={styles.postIconView} onPress={() => alert("Upload!")}>
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
                        <KeyboardAvoidingView>
                            <TextInput 
                                style={styles.descriptionTextInput}
                                placeholder="Description" 
                                // numberOfLines={5}
                                multiline={true}
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={styles.buttoms}>
                    <Pressable style={styles.clearButtom} onPress={() => alert("Cleared!")}>
                        <Text style={styles.clearButtomText}>Clear</Text>
                    </Pressable>
                    <Pressable style={styles.postButtom} onPress={() => alert("Posted!")}>
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