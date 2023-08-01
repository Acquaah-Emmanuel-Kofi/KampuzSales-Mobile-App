import { Text, Pressable, View, Image, StyleSheet } from "react-native";
import CediSign from "../CediSign";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AppColors from "../../data/Colors";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../../BackendDirectory/config";

const ProductItem = ({product, handleDeleteModal}) => {
    const navigation = useNavigation();

    const [ isChecked, setIsChecked ] = useState(product.isChecked); 
    const [ sellerId, setSellerId ] = useState(product.isChecked); 

    // console.log("sellerId: ", sellerId);

    const updateIsChecked = async () => {
        // const userRef =  firestore.collection('products').doc(sellerId);
        // const userDoc = await userRef.get();
        
        // const userData = userDoc.data();
        // console.log(userData);

        // const collectionRef = firestore.collection('products');

        // collectionRef.where("field", "==", "value")
        // .get()
        // .then((querySnapshot) => {
        //     querySnapshot.forEach(doc => {
        //         const { productTitle, productImage, description, price, postTime, userId} = doc.data();
        //         console.log(doc.data());
        //     })
        // })

                
                // await userRef.update({ firstTimePosting: false });

                // navigation.navigate("Post");
                // navigation.goBack();

        // if (userDoc.exists) {
        //     await userRef.update({ isChecked: isChecked });
        // }
    }

    useEffect(() => {

        firestore.collection('sellers')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const { userId } = doc.data();
                { auth.currentUser.uid === userId ? 
                    setSellerId(doc.id)
                : null }
            })
        })

        updateIsChecked();
    }, [isChecked])

    return (
        <Pressable style={styles.productBox} onPress={() => navigation.navigate("Single", product)}>
            <View style={styles.imageBox}>
                <Image style={styles.image} source={{uri: product.images[0]}} alt={product.name} />
            </View>
            <View style={styles.productDetailsBox}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
            <Pressable style={styles.editProduct} onPress={() => navigation.navigate("EditProduct", product)}>
                <Text style={{color: AppColors.white}}>Edit Product</Text>
            </Pressable>
            </View>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Pressable onPress={() => handleDeleteModal(product.id)}>
                    <MaterialIcons name="delete-forever" size={30} color={AppColors.danger} />
                </Pressable>
                <Pressable style={{marginTop: 30}} onPress={() => setIsChecked(!isChecked)}>
                    { isChecked ? (
                        <Fontisto name="checkbox-active" size={20} color="green" />
                    ) : (
                        <Fontisto name="checkbox-passive" size={20} color="green" />
                    )}
                </Pressable>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    productBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: AppColors.borderGray,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productDetailsBox: {
        ...Platform.select({
            ios: {
                width: '55%',
            },
            android: {
                width: '45%',
            },
        })
    },
    productName: {
        color: AppColors.deepGray,
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 10
    },
    productPrice: {
        color: AppColors.black,
        fontSize: 16,
        fontWeight: '600',
    },
    editProduct: {
        backgroundColor: AppColors.primary,
        width: 120,
        height: 25,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
})

export default ProductItem;