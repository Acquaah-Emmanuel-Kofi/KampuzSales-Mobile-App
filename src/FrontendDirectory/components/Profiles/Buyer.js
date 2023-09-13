import { SafeAreaView, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import  AppColors  from "../../data/Colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import moment from "moment/moment";
import { handleLogout } from "../../../BackendDirectory/authentications/authentications";

const HEIGHT = Dimensions.get('window').height;

const BuyerProfile = ({userData}) => {

    const navigation = useNavigation();

    return (
        <>
            <SafeAreaView>
            <View style={styles.profileDetails}>
              { userData.profileDisplay ? 
              (
                <Image style={styles.profileDisplay} source={{uri: userData.profileDisplay}} resizeMode='stretch' />
              ) : 
              (
                <View style={styles.imageContainer}>
                  <Icon name="ios-person" size={80} style={styles.image} color={AppColors.primary} />
                </View>
              )}
              <View style={styles.details}>
                <Text style={styles.userName}>{userData.username}</Text>
                <Text style={styles.phoneNumber}>{userData.phoneNumber}</Text>
                { userData.joinedDate && <Text style={styles.dateJoined}>Member Since: {moment(userData.joinedDate.toDate()).format('LL')}</Text>}
                <TouchableOpacity style={styles.editProfile} onPress={() => navigation.navigate("EditProfile")}>
                    <View style={styles.pencil}>
                      <FontAwesome5 name="pencil-alt" size={14} color={AppColors.white} />
                    </View>
                    <Text style={styles.editProfileText}> Edit Profile  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </SafeAreaView>

            <TouchableOpacity onPress={() => navigation.navigate("ComingSoon")}>
              <View style={styles.inviteFriends}>
                <Ionicons style={styles.icon} name="ios-person-add-outline" size={24} color={AppColors.primary} />
                <Text>Invite friends</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.options}>

              <View style={styles.optionsDivider}>
                <TouchableOpacity onPress={() => navigation.navigate("ComingSoon")}>
                  <View style={styles.optionsTab}>
                    <Entypo style={styles.icon} name="address" size={24} color={AppColors.primary} />
                    <Text>Delivery Address</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.optionsTab}>
                    <Octicons style={styles.icon} name="list-unordered" size={24} color={AppColors.primary} />
                    <Text>Order History</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
                  <View style={styles.optionsTab}>
                    <Ionicons style={styles.icon} name="bookmark-outline" size={24} color={AppColors.primary} />
                    <Text>Wishlist</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("RequestResponeded")}>
                  <View style={styles.optionsTab}>
                    <AntDesign style={styles.icon} name="aliwangwang-o1" size={24} color={AppColors.primary} />
                    <Text>My Requests</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.optionsDivider}>
                <TouchableOpacity onPress={() => navigation.navigate("VendorInfo")}>
                  <View style={styles.optionsTab}>
                    <MaterialCommunityIcons style={styles.icon} name="store-check-outline" size={24} color={AppColors.primary} />
                    <Text style={{color: AppColors.primary, fontWeight: 600}}>Become A Seller</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AccountSettings")}>
                  <View style={styles.optionsTab}>
                    <Ionicons style={styles.icon} name="ios-settings-outline" size={24} color={AppColors.primary} />
                    <Text>Account Settings</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AboutKampuzSales")}>
                  <View style={styles.optionsTab}>
                    <Image style={[styles.icon, {width: 24, height: 24}]} source={require('../../../../assets/favicon.png')} />
                    <Text>About KampuzSales</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.optionsDivider}>
                <TouchableOpacity onPress={() => navigation.navigate("ComingSoon")}>
                  <View style={styles.optionsTab}>
                    <MaterialCommunityIcons style={styles.icon} name="help-rhombus-outline" size={24} color={AppColors.primary} />
                    <Text>Help & Complaint</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.optionsTab}>
                    <MaterialCommunityIcons style={styles.icon} name="head-question-outline" size={24} color={AppColors.primary} />
                    <Text>FAQ</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLogout()}>
                  <View style={styles.optionsTab}>
                    <MaterialCommunityIcons style={styles.icon} name="logout" size={24} color={AppColors.danger} />
                    <Text style={{color: AppColors.danger}}>Logout</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{
            color: AppColors.borderGray,
            marginBottom: 50,
            alignSelf: 'center'
          }}>Release Version 1.0.0</Text>
        </>
    );
}

const styles = StyleSheet.create({
    profileDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: AppColors.primary,
      paddingHorizontal: 20,
      marginHorizontal: 10,
      height: HEIGHT * 0.3,
      borderRadius: 10,
    },
    details: {
      ...Platform.select({
        ios: {
          width: '65%',
        },
        android: {
          // elevation: 5,
        },
    })
    },
    imageContainer: {
      borderRadius: 10,
      backgroundColor: AppColors.white,
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
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
    profileDisplay: {
      borderRadius: 10,
      width: 95,
      height: 95,
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 10,
      left: 10,
    },
    userName: {
      color: AppColors.labelGray,
      fontSize: 24.6822,
      fontWeight: '400',
      marginBottom: 2,
    },
    phoneNumber: {
      color: AppColors.labelGray,
      fontSize: 14.8094,
      fontWeight: '400',
      marginBottom: 2,
    },
    dateJoined: {
      color: AppColors.labelGray,
      fontSize: 14.8094,
      fontWeight: '400',
    },
    editProfile: {
      fontSize: 14.8094,
      fontWeight: '400',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '43%',
    },
    editProfileText: {
      fontSize: 15,
      color: AppColors.white,
    },
    inviteFriends: {
      flexDirection: 'row',
      backgroundColor: AppColors.white,
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginTop: 20,
      marginHorizontal: 10,
      borderRadius: 10,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
        },
    })
    },
    icon: {
      marginRight: 30
    },
    options: {
      flexDirection: 'column',
      marginTop: 20,
      marginTop: 20,
      marginBottom: 30,
    },
    optionsTab: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 10,
    },
    optionsDivider: {
      paddingVertical: 10,
      marginVertical: 10,
      marginHorizontal: 10,
      backgroundColor: AppColors.white,
      borderRadius: 10,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
        },
    })
    }
  });

export default BuyerProfile;