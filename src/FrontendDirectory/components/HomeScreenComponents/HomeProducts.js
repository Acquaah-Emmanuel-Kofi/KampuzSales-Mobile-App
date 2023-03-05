import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import  Colors  from "../../data/colors";
import CediSign from "../CediSign";
import { firestore, storage } from "../../../BackendDirectory/config";

function HomeProducts() {
    const navigation = useNavigation();

    const [ post, setPost ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ deleted, setDeleted ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);
    const [ filterByCategory, setFilterByCategory ] = useState('');

    
    const fetchProducts = async () => {
        try {
            
            let productData = [];

            await firestore.collection('products')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { productTitle, productImage, description, category ,price, postTime, userId} = doc.data();
                    productData.push({
                        id: doc.id,
                        userPostId: userId,
                        name: productTitle,
                        image: productImage,
                        description: description,
                        price: price,
                        category: category,
                        postTime: postTime,
                    })

                    setFilterByCategory(category)
                })
            })
            .catch((error) => {
                alert("No data to show!");
            })

            setPost(productData);

            if(loading) setLoading(false);

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDeleteModal = (postId) => {
        Alert.alert(
            'Delete Post',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Post'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                }
            ],
            { cancelable: false}
        )
    }

    const deletePost = (postId) => {
        firestore.collection('products')
        .doc(postId)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                const {productImage} = documentSnapshot.data();

                if (productImage !== null) {
                    const storageRef = storage.refFromURL(productImage);
                    const imageRef = storage.ref(storageRef.fullPath);

                    imageRef
                    .delete()
                    .then(() => {
                        deleteFirestoreData(postId);
                        setDeleted(true)
                    })
                    .catch((error) => {
                        console.log("Error deleting image", error);
                    })
                }

                // if the post image is not available
            } else{
                deleteFirestoreData(postId);
            }
        })
    }

    const deleteFirestoreData = (postId) => {
        firestore.collection('products')
        .doc(postId)
        .delete()
        .then(() => {
            Alert.alert(
                'Posted Deleted!',
                'Your post has been deleted succefully!'
            )
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const pulledToRefresh = () => {
        setRefresh(true);

        setTimeout(() => {
        setRefresh(false);
        }, 2000)
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
        setDeleted(false)
    }, [deleted]);



    return (
        <View style={styles.container}>
        <ScrollView 
            contentContainerStyle={styles.scrollViewContainer} 
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl 
                    refreshing={refresh}
                    onRefresh={() => pulledToRefresh()}
                />
            }
        >
        {
            post && post.map((product) => (
                <Pressable key={product.id} style={styles.productBox} onPress={() => navigation.navigate("Single", product)}>
                    {
                        product.image ? (
                        <View style={styles.imageBox}>
                            <Image style={styles.image} resizeMode='stretch' source={{uri: product.image}} alt={product.name} />
                            <Image style={styles.imageCartTag} source={require('../../data/images/Cart.png')} />
                        </View>
                        ) : (
                            <View style={styles.noImage}></View>
                        )
                    }
                    <View style={styles.productDetailsBox}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
                        {/* {auth.currentUser.uid === product.userPostId ? <Text onPress={() => handleDeleteModal(product.id)}>Delete</Text> : null} */}
                    </View>
                </Pressable>
            ))
        }
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
    },
    scrollViewContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
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
    noImage: {
        width: 157,
        height: 200,
        borderRadius: 10,
        backgroundColor: Colors.borderGray,
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

export default HomeProducts;