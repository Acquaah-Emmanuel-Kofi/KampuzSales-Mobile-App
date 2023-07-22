import { Image, Text, View, Pressable, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AppColors from '../../data/Colors';
import CediSign from '../CediSign';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProductCard = ({product}) => {
    const navigation = useNavigation();

    return ( 
        <Pressable key={product.id} style={styles.productCard} onPress={() => navigation.navigate("Single", product)}>
            <View style={styles.imageBox}>
                <Image style={styles.image} source={{uri: product.image[0]}} alt={product.productTitle} />
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
        width: WIDTH * 0.4,
        paddingVertical: 2,
        paddingTop: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: AppColors.white,
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
        height: HEIGHT * 0.25,
        borderRadius: 5,
        maxWidth: '100%',
    },
    noImage: {
        width: WIDTH * 0.4,
        height: HEIGHT * 0.25,
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