import { ScrollView, View, StyleSheet, Text, Image, Platform, RefreshControl, TouchableOpacity } from "react-native";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import AppColors from "../data/Colors";
import CediSign from "../components/CediSign";
import { firestore } from "../../BackendDirectory/config";
import { useEffect, useState } from "react";

function RequestResponededScreen({navigation}) {

    const [ refresh, setRefresh ] = useState(false);
    const [ dataFromState, setDataFromState ] = useState([]);
    const maxTextLength = 157;

    const fetchProducts = async () => {
        try {
            
            let productData = [];

            await firestore.collection('requests')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const { productTitle, sampleImage, description, budget, postTime, userId } = doc.data();
                    productData.push({
                        id: doc.id,
                        productTitle,
                        image: sampleImage,
                        description,
                        budget,
                        postTime,
                        userId
                    })
                })
            })

            setDataFromState(productData);

        } catch (error) {
            return;
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [dataFromState])

    const pullToRefresh = () => {
        setRefresh(true);
    
        setTimeout(() => {
          setRefresh(false);
          fetchProducts();
        }, 2000)
    }

    return (
        <View style={styles.container}>
            <HeadTitleWithBackIcon title={"Requests Responeded"} />
            <ScrollView 
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            refreshControl={
                <RefreshControl 
                  refreshing={refresh}
                  onRefresh={() => pullToRefresh()}
                />
              }
            >
            <View style={{
                marginBottom: 100,
                marginHorizontal: 10
            }}>
                {dataFromState?.map((request) => (
                    <View style={styles.card} key={request.id}>
                        <View style={[styles.content]}>
                            {request.image ? (
                                <Image style={{
                                    width: 100, 
                                    height: 100,
                                    marginRight: 20,
                                    borderRadius: 8,
                                }} source={{uri: request.image}} />
                            ): null}
                            <View style={{
                                width:  request.image ? '70%' : null
                            }}>
                                <Text style={{fontSize: 14, fontWeight: 500}}>{request.productTitle}</Text>
                                <Text style={{marginTop: 5}}>
                                    {request.description.length > maxTextLength ? request.description.substring(0, maxTextLength) + "..." : request.description}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.content, {marginTop: 10, alignItems: 'center'}]}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RequestAcceptance")}>
                                <Text style={{color: AppColors.white, fontWeight: 600}}>Details</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 16, fontWeight: 600}}>Budget: <CediSign /> {request.budget}</Text>
                        </View>
                    </View>
                ))}
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    card: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: AppColors.white,
        borderColor: AppColors.primary,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        paddingVertical: 20,
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            },
            android: {
              elevation: 1,
            },
        }),
    },
    content: {
        flexDirection:'row',
    },
    button: {
        backgroundColor: AppColors.primary,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 20,
    },
})
export default RequestResponededScreen;