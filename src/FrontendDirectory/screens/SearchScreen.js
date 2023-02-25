import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, Pressable, Image, Platform, } from "react-native";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import  Colors  from "../data/colors";
import Feather from "react-native-vector-icons/Feather";
import products from "../data/testProducts"
import { useNavigation } from "@react-navigation/native";
import CediSign from "../components/CediSign";


function SearchScreen() {
  
  const navigation = useNavigation();

  const [ dataFromState, setData ] = useState(products);

  const searchValue = (input) => {
    if(input){
      let data = dataFromState;
      let searchData = data.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase())
      })
      setData(searchData)
    } else {
      setData(products)
    }
  }

    return (
        <View style={styles.container}>
            <SafeAreaView>
              <HeadTitleWithBackIcon previousScreen={() => navigation.navigate("Home")} title={'Search'} />
              <View style={styles.searchArea}>
                <View style={styles.seachBoxRow}> 
                    <View style={styles.seacrhBox}>
                        <Feather style={styles.searchIcon} name="search" size={20} color={Colors.subBlack} />
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
                <Pressable key={product._id} style={styles.productBox} onPress={() => navigation.navigate("Single", product)}>
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
        borderColor: Colors.labelGray,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '100%'
    },
    searchIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    scrollViewContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        paddingBottom: Platform.OS === 'ios' ? 150 : 200,
    },
    productBox: {
        width: 157,
        height: 256,
        marginVertical: 5,
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
        color: Colors.labelGray,
        fontSize: 14,
        fontWeight: '400',
    },
    productPrice: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: '600',
    }
  });

export default SearchScreen;