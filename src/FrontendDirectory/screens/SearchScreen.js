import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, Pressable, Image, Platform, } from "react-native";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import  AppColors  from "../data/Colors";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import CediSign from "../components/CediSign";
import { firestore } from "../../BackendDirectory/config";
import { Device } from 'expo-device';


function SearchScreen() {
  
  const navigation = useNavigation();

    const [ dataFromState, setDataFromState ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ deleted, setDeleted ] = useState(false);

    
    const fetchProducts = async () => {
        try {
            
            let productData = [];

            await firestore.collection('products')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { productTitle, productImage, description, price, postTime, userId} = doc.data();
                    productData.push({
                        id: doc.id,
                        userPostId: userId,
                        name: productTitle,
                        image: productImage,
                        description,
                        price,
                        postTime,
                    })
                })
            })

            setDataFromState(productData);

            if(loading) setLoading(false);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
        setDeleted(false)
    }, [deleted]);

  const searchValue = (input) => {
    if(input){
      let data = dataFromState;
      let searchData = data.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase())
      })
      setDataFromState(searchData)
    } else {
      setDataFromState(dataFromState)
    }
  }

    return (
        <View style={styles.container}>
            <SafeAreaView>
              <HeadTitleWithBackIcon previousScreen={() => navigation.navigate("Home")} title={'Search'} />
              <View style={styles.searchArea}>
                <View style={styles.seachBoxRow}> 
                    <View style={styles.seacrhBox}>
                        <Feather style={styles.searchIcon} name="search" size={20} color={AppColors.subBlack} />
                        <TextInput 
                          style={styles.textInput} 
                          placeholder="What are you looking for?"
                          onChangeText={(inputeValue) => {
                            searchValue(inputeValue)
                          }} 
                        />
                    </View>
                </View>
              </View>

        <ScrollView 
            contentContainerStyle={styles.scrollViewContainer} 
            showsVerticalScrollIndicator={false}>
        {
            dataFromState.map((product) => (
                <Pressable key={product.id} style={styles.productCard} onPress={() => navigation.navigate("Single", product)}>
                    <View style={styles.imageBox}>
                        <Image style={styles.image} source={{uri: product.image}} alt={product.name} />
                        <Image style={styles.imageCartTag} source={require('../../FrontendDirectory/data/images/Cart.png')} />
                    </View>
                    <View style={styles.productDetailsBox}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                    </View>
                </Pressable>
            ))
        }
        </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchArea: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    seachBoxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBackIcon: {
        marginRight: 15,
    },
    seacrhBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: AppColors.labelGray,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        backgroundColor: AppColors.white,
        width: '100%',
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
    searchIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    scrollViewContainer: {
        backgroundColor: AppColors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        paddingBottom: Device === 'ios' ? 150 : 200,
    },
    productCard: {
        width: 157,
        height: 256,
        marginVertical: 5,
        backgroundColor: 'transparent',
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
    imageBox: {
        position: 'relative',
    },
    imageCartTag: {
        width: 25,
        height: 25,
        position: 'absolute',
        bottom: 12,
        right: 12,
    },
    image: {
        width: 157,
        height: 200,
        borderRadius: 10,
    },
    productDetailsBox: {
        paddingTop: 12,
    },
    productName: {
        color: AppColors.labelGray,
        fontSize: 14,
        fontWeight: '400',
    },
    productPrice: {
        color: AppColors.black,
        fontSize: 14,
        fontWeight: '600',
    }
  });

export default SearchScreen;