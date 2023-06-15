import { Image, Text, View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AppColors from '../../data/Colors';
import CediSign from '../CediSign';

const ProductCard = ({product}) => {
    const navigation = useNavigation();

    return ( 
        <Pressable key={product.id} style={styles.productCard} onPress={() => navigation.navigate("Single", product)}>
            <View style={styles.imageBox}>
                <Image style={styles.image} source={{uri: product.image[0]}} alt={product.name} />
                <Image style={styles.imageCartTag} source={require('../../data/images/Cart.png')} />
            </View>
            <View style={styles.productDetailsBox}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}><CediSign /> {product.price}</Text>
            </View>
        </Pressable>
     );
}

const styles = StyleSheet.create({
    productCard: {
        // width: 157,
        // height: 256,
        width: 180,
        height: 256,
        paddingVertical: 2,
        paddingTop: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: AppColors.white,
        // backgroundColor: 'transparent',
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
        width: 170,
        height: 200,
        borderRadius: 5,
    },
    noImage: {
        width: 170,
        height: 200,
        borderRadius: 5,
        backgroundColor: AppColors.borderGray,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
})
 
export default ProductCard;