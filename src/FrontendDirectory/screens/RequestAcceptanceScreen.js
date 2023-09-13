import { ScrollView, View, StyleSheet, Text, Image, Platform, RefreshControl, TouchableOpacity, Alert } from "react-native";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";
import AppColors from "../data/Colors";
import CediSign from "../components/CediSign";
import { firestore } from "../../BackendDirectory/config";
import { useEffect, useState } from "react";

function RequestAcceptanceScreen({navigation}) {

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

    const handleAcceptance= () => {
        Alert.alert(
          'Accept Offer',
          'Are you sure you want to accept this offer?',
          [
              {
                  text: 'Cancel',
                  onPress: () => {},
                //   style: 'cancel'
              },
              {
                  text: 'Accept',
                  onPress: () => alert("Accepted"),
              }
          ],
          { cancelable: false}
        )
      }

    return (
        <View style={styles.container}>
            <HeadTitleWithBackIcon title={"Requests Acceptance"} />
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
                                <Text style={{fontSize: 16,}}>Budget: <CediSign /> {request.budget}</Text>
                            </View>
                        </View>
                        <View style={[styles.content, {marginTop: 10, paddingTop: 10, alignItems: 'center', borderTopColor: AppColors.borderGray, borderTopWidth: 1}]}>
                            <View style={{width: '100%'}}>
                                <Text style={{textAlign: 'center', fontWeight: 400}}>Vendor Response</Text>
                                <Text style={{fontSize: 14, fontWeight: 500}}>Product Name: {request.productTitle}</Text>
                                <Text style={{fontSize: 16,}}>Price: <CediSign /> {request.budget}</Text>
                                <Text style={{fontSize: 14, fontWeight: 500}}>Condition: {request.productTitle}</Text>
                                <Text style={{marginTop: 5}}>
                                    Description: {request.description.length > maxTextLength ? request.description.substring(0, maxTextLength) + "..." : request.description}
                                </Text>
                                <Text style={{marginTop: 5}}>
                                    Additional note: Has some little fault.
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => handleAcceptance()}>
                            <Text style={{color: AppColors.white, fontWeight: 600}}>Accept</Text>
                        </TouchableOpacity>
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
        marginTop: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
})
export default RequestAcceptanceScreen;