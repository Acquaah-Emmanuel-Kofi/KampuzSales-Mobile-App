import { View, ScrollView, Text, RefreshControl, StyleSheet, Image, Platform } from "react-native";
import AppColors from "../data/Colors";
import CediSign from "../components/CediSign";
import HeadTitleWithBackIcon from "../components/HeadTitleWithBackIcon";

function SalesHistoryScreen ({navigation}) {

    return (
        <View style={styles.container}>
            <HeadTitleWithBackIcon previousScreen={() => navigation.goBack()} title={"Sales History"} />
            <ScrollView 
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            automaticallyAdjustsScrollIndicatorInsets={true}
            refreshControl={
                <RefreshControl 
                //   refreshing={refresh}
                //   onRefresh={() => pullToRefresh()}
                />
              }
            >
            { true ? (
                <View style={{
                    marginBottom: 100,
                    marginHorizontal: 10
                }}>
                    <View style={styles.timeline}>
                        <View style={styles.timelineDate}>
                            <Text>20</Text>
                            <Text style={{color: AppColors.subBlack}}>Jun <Text style={{color: AppColors.black}}>2023</Text></Text>
                            <View style={[styles.circle, {borderColor: 'green'}]}></View>
                        </View>
                        <View style={styles.timelineBox}>
                        <View style={styles.timelineCard}>
                            <Image style={styles.image} source={{uri: 'https://th.bing.com/th/id/R.bb134912948dad2a199eaeaf7e398137?rik=aE6IAsqpJJFpog&riu=http%3a%2f%2fs3.amazonaws.com%2fdigitaltrends-uploads-prod%2f2016%2f12%2fApple-AirPods-kit1.jpg&ehk=b7Upud25GtqHWwuNV%2faUjRVLKC%2fHL%2fGlBh056YVeBqk%3d&risl=&pid=ImgRaw&r=0'}} />
                            <View style={styles.timelineContent}>
                                <Text style={{color: AppColors.subBlack, fontSize: 16}}>Airpods</Text>
                                <Text style={{fontSize: 18, fontWeight: 400, marginVertical: 3}}><CediSign /> 180.00</Text>
                                <Text style={{fontWeight: 400}}>Posted on 12 Oct,2021</Text>
                            </View>
                        </View>
                            <TouchableOpacity style={styles.deleteButton}>
                                <Text style={{fontWeight: 400, color: AppColors.primary}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.timeline}>
                        <View style={styles.timelineDate}>
                            <Text>10</Text>
                            <Text style={{color: AppColors.subBlack}}>Nov <Text style={{color: AppColors.black}}>2022</Text></Text>
                            <View style={[styles.circle, {borderColor: 'black'}]}></View>
                        </View>
                        <View style={styles.timelineBox}>
                            <View style={styles.timelineCard}>
                                <Image style={styles.image} source={{uri: 'https://th.bing.com/th/id/OIP.I4T2sIxeB18K0V2GM5_PsgHaE6?pid=ImgDet&rs=1'}} />
                                <View style={styles.timelineContent}>
                                    <Text style={{color: AppColors.subBlack, fontSize: 16}}>Controller</Text>
                                    <Text style={{fontSize: 18, fontWeight: 400, marginVertical: 3}}><CediSign /> 80.00</Text>
                                    <Text style={{fontWeight: 400}}>Posted on 12 Oct,2021</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.deleteButton}>
                                <Text style={{fontWeight: 400, color: AppColors.primary}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.timeline}>
                        <View style={styles.timelineDate}>
                            <Text>10</Text>
                            <Text style={{color: AppColors.subBlack}}>Nov <Text style={{color: AppColors.black}}>2023</Text></Text>
                            <View style={styles.circle}></View>
                        </View>
                        <View style={styles.timelineBox}>
                        <View style={styles.timelineCard}>
                            <Image style={styles.image} source={{uri: 'https://th.bing.com/th/id/R.58d492e2f26df7e9a2fe246f3d363bcd?rik=lEE3WSbO7gG2wg&riu=http%3a%2f%2ftechbeat.com%2fwp-content%2fuploads%2f2013%2f01%2fSmartphone.jpg&ehk=BATf99yB2LxHH7UUWn9DEZqXzIr073JGrX4o%2bhPNHGM%3d&risl=&pid=ImgRaw&r=0'}} />
                            <View style={styles.timelineContent}>
                                <Text style={{color: AppColors.subBlack, fontSize: 16}}>Komorka</Text>
                                <Text style={{fontSize: 18, fontWeight: 400, marginVertical: 3}}><CediSign /> 234.00</Text>
                                <Text style={{fontWeight: 400}}>Posted on 12 Oct,2021</Text>
                            </View>
                        </View>
                            <TouchableOpacity style={styles.deleteButton}>
                                <Text style={{fontWeight: 400, color: AppColors.primary}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.timeline}>
                        <View style={styles.timelineDate}>
                            <Text>10</Text>
                            <Text style={{color: AppColors.subBlack}}>Nov <Text style={{color: AppColors.black}}>2023</Text></Text>
                            <View style={styles.circle}></View>
                        </View>
                        <View style={styles.timelineBox}>
                        <View style={styles.timelineCard}>
                            <Image style={styles.image} source={{uri: 'https://th.bing.com/th/id/R.c6a02ae6a87cdb600ce2d86d615449e5?rik=sLBOlRJ9dZ%2f3Og&pid=ImgRaw&r=0'}} />
                            <View style={styles.timelineContent}>
                                <Text style={{color: AppColors.subBlack, fontSize: 16}}>Samoa Vintage</Text>
                                <Text style={{fontSize: 18, fontWeight: 400, marginVertical: 3}}><CediSign /> 334.00</Text>
                                <Text style={{fontWeight: 400}}>Posted on 12 Oct,2021</Text>
                            </View>
                        </View>
                            <TouchableOpacity style={styles.deleteButton}>
                                <Text style={{fontWeight: 400, color: AppColors.primary}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 70,
                }}>
                    <Image style={{width: 300, height: 300}} source={require("../../../assets/sales.png")} />
                    <Text style={{
                        marginTop: 20,
                        fontSize: 18,
                    }}>You've sold nothing yet!</Text>
                    <Text style={{textAlign: 'center', marginVertical: 10}}>
                        Start posting your products and sell it to interested buyers on the platform.
                    </Text>
                    <Text style={{fontSize: 12, color: AppColors.primary}}>Happy shopping! 🎉</Text>
                </View>
            )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    timeline: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 180,
    },
    timelineDate: {
        borderRightColor: AppColors.primary,
        borderRightWidth: 3,
        height: '100%',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        position: 'relative',
    },
    circle: {
        borderWidth: 2,
        borderColor: AppColors.danger,
        backgroundColor: AppColors.white,
        width: 20,
        height: 20,
        borderRadius: 100,
        position: 'absolute',
        top: '40%',
        right: -11,
    },
    timelineCard: {
        backgroundColor: AppColors.white,
        padding: 15,
        borderRadius: 10,
        width: '70%',
        flexDirection: 'row',
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            },
            android: {
              elevation: 1,
            },
        }),
    },
    timelineContent: {
        marginLeft: 10
    },
    image: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: AppColors.borderGray,
        borderRadius: 8,
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: AppColors.primary,
        backgroundColor: AppColors.white,
        borderRadius: 5,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
})

export default SalesHistoryScreen;