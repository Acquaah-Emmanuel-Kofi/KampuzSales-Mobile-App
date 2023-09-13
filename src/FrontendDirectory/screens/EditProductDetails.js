import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import AppColors from "../data/Colors";
import { updateData } from "../../BackendDirectory/functionalities/functions";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function EditProductDetails ({route, navigation}) {

    const product = route.params;

    const [ activeImage, setActiveImage ] = useState(0);
    const [ productTitle, setProductTile ] = useState(null);
    const [ price, setPrice ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ uploading, setUploading ] = useState(false);


    const handleOnchange = (nativeEvent) => {
        if(nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != activeImage) {
                setActiveImage(slide);
            }
        }
    } 

    const submitPost = async () => {
        if(productTitle !== null || price !== null || description !== null){
            setUploading(true);

            let newProductData = {
                productTitle: productTitle ? productTitle : product.name,
                price: price ? price : product.price,
                description: description ? description : product.description,
            }

            if(newProductData.productTitle !== null || newProductData.price !== null || newProductData.description !== null){
                updateData("products", product.id, product.name, newProductData)
                .then(() => {
    
                    setUploading(false);
                    setProductTile(null);
                    setPrice(null);
                    setDescription(null);
    
                    navigation.goBack();
                })
            }

        }  else {
            setUploading(false);
            alert("Nothing is changed!")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Ionicons onPress={() => navigation.goBack()} name="chevron-back-sharp" size={30} color={AppColors.black} />
                    <View>
                        <Text style={styles.title}>Edit Product Details</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.save}
                        disabled={uploading ? true : false} 
                        onPress={() => submitPost()} 
                    >
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>  
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                    alwaysBounceVertical={true}
                    automaticallyAdjustsScrollIndicatorInsets={true}
                >
                <View style={styles.imageWrapper}>
                    <ScrollView
                        onScroll={(event) => handleOnchange(event.nativeEvent)}
                        scrollEventThrottle={16} 
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.imageWrapper}
                    >
                   {
                    Array.isArray(product?.images) ?
                    (product?.images?.map((e, index) => 
                        <View key={index}>
                            <Image style={styles.imageWrapper} resizeMode='stretch' source={{uri: e}} />
                        </View>
                    )) : 
                    (product?.images ?
                        <View>
                            <Image style={styles.imageWrapper} resizeMode='stretch' source={{uri: product.images[0]}} />
                        </View> : null
                    )
                   }
                    </ScrollView>
                    <View style={styles.imageWrapperNav}>
                        {
                            Array.isArray(product?.images) ?
                            (product?.images?.map((e, index) => 
                                <Text 
                                    key={e}
                                    style={activeImage == index ? styles.activeImageNav : styles.activeImage}
                                ></Text>
                            )) : null
                        }
                    </View>
                </View>
                    <View style={styles.productDetailesContainer}>

                        <View style={styles.textInputBox}>
                            <Text style={styles.textTitle}>Title</Text>
                            <TextInput 
                                style={[styles.textInput]}
                                placeholder={`${product.name}`}
                                value={productTitle ? productTitle : product.name}
                                onChangeText={(value) => {
                                    setProductTile(value)
                                }}
                            />
                        </View>
                        <View style={styles.textInputBox}>
                            <Text style={styles.textTitle}>Price</Text>
                            <TextInput 
                                style={[styles.textInput]}
                                placeholder={`${product.price}`}
                                keyboardType="numeric"
                                value={price ? price : product.price}
                                onChangeText={(value) => {
                                    setPrice(value)
                                }}
                            />
                        </View>
                        <View style={styles.textInputBox}>
                            <Text style={styles.textTitle}>Description</Text>
                            <TextInput 
                                style={[styles.descriptionTextInput]}
                                placeholder={`${product.description}`}
                                numberOfLines={30}
                                multiline={true}
                                value={description ? description : product.description}
                                onChangeText={(value) => {
                                    setDescription(value)
                                }}
                            />
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors.white,
      paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        paddingVertical: 10,
    },
    title: {
        fontSize: 16,
        color: AppColors.black,
        fontWeight: '600',
    },
    saveText: {
        fontSize: 16,
        fontWeight: '600',
        color: AppColors.primary,
    },
    imageWrapper: {
        width: WIDTH,
        height: HEIGHT * 0.60,
    },
    imageWrapperNav: {
        position: 'absolute',
        bottom: 27,
        right: 27,
        flexDirection: 'row',
    },
    activeImageNav: {
        margin: 3, 
        backgroundColor: AppColors.primary,
        width: 30,
        height: 4,
        borderRadius: 50,
    },
    activeImage: {
        margin: 3, 
        backgroundColor: AppColors.white,
        width: 15,
        height: 4,
        borderRadius: 50,
    },
    productImage: {
        width: '100%',
        height: 300,
        position: 'relative',
        zIndex: -1,
    },
    productDetailesContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
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
    descriptionTextInput: {
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 30,
    },
  });

export default EditProductDetails;