import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import AppColors from '../data/Colors';
import PostScreen from '../screens/PostScreen';
import HomeStackNavigation from './HomeStackNavigation';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NotificationScreen from '../screens/NotificationScreen';
import { useState, useEffect } from 'react';
import { auth, firestore } from '../../BackendDirectory/config';
import ProfileStackNavigation from './ProfileStackNavigation';
import RequestStackNavigation from './RequestStackNavigation';

const Tab = createBottomTabNavigator();

const ButtomNavigation = () => {

    const [ numOfAlerts, setNomOfAlerts ] = useState(0);
    const [ userData, setUserData ] = useState([]);
    const [ sellerData, setSellerData ] = useState([]);
  
    const getNotifications = () => {
      if(userData.firstTimePosting == true) {
        setNomOfAlerts(userData.notifications.length);
      }
  
      if(userData.firstTimePosting == false) {
        setNomOfAlerts(sellerData.notifications.length);
      }
    }
  
  
    const getUserDetails = async () => {
      await firestore.collection('users')
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        let data = snapshot.data();
  
        setUserData(data)
      })
      .catch((error) => {
        alert(error.message);
      })
    }
  
    const getSellersDetails = async () => {
      await firestore.collection('sellers')
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
  
            let data = doc.data();
  
            if(auth.currentUser.uid === data.userId){
              setSellerData(data);
            }
  
          })
      })
      .catch((error) => {
          return;
      })
  
  }
  
  
    useEffect(() => {
      getUserDetails();
      getSellersDetails();
      getNotifications();
    }, [sellerData])

    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen name='MainHome' component={HomeStackNavigation} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <Ionicons name="ios-home" size={24} color={AppColors.primary} />
                                ) : ( 
                                <Ionicons name="ios-home-outline" size={24} color={AppColors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? AppColors.primary : AppColors.subBlack, fontSize: 12}}>Home</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name='MainRequest' component={RequestStackNavigation} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <AntDesign name="aliwangwang" size={24} color={AppColors.primary} />
                                ) : ( 
                                <AntDesign name="aliwangwang-o1" size={24} color={AppColors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? AppColors.primary : AppColors.subBlack, fontSize: 12}}>Requests</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name='Post' component={PostScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <AntDesign name="pluscircle" size={50} color={AppColors.primary} style={{marginTop: -40}} />
                        </View>
                    </View>
                ),
            }} />
            <Tab.Screen name='Notification' component={NotificationScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <Ionicons name="ios-notifications-sharp" size={24} color={AppColors.primary} />
                                ) : ( 
                                <Ionicons name="ios-notifications-outline" size={24} color={AppColors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? AppColors.primary : AppColors.subBlack, fontSize: 12}}>Alerts</Text>
                    </View>
                ),
                tabBarBadge: numOfAlerts
            }} />
            <Tab.Screen name='MainProfile' component={ProfileStackNavigation} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <Icon name="ios-person" size={24} color={AppColors.primary} />
                                ) : ( 
                                <Icon name="ios-person-outline" size={24} color={AppColors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? AppColors.primary : AppColors.subBlack, fontSize: 12}}>Profile</Text>
                    </View>
                ),
            }} />
        </Tab.Navigator>
    );
}

export default ButtomNavigation;
