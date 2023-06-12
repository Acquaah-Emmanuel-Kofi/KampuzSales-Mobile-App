import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import AppColors from '../data/Colors';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WishlistScreen from '../screens/WishlistScreen';
import StackNavigation from './StackNavigation';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();

const ButtomNavigation = () => {
    return(
        <Tab.Navigator
            backBehavior='Major'
            initialRouteName='Major'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen name='Major' component={StackNavigation} options={{
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
            }}></Tab.Screen>
            <Tab.Screen name='WhishList' component={WishlistScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <Ionicons name="bookmark" size={24} color={AppColors.primary} />
                                ) : ( 
                                <Ionicons name="bookmark-outline" size={24} color={AppColors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? AppColors.primary : AppColors.subBlack, fontSize: 12}}>Wishlist</Text>
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='Post' component={PostScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <AntDesign name="pluscircle" size={50} color={AppColors.primary} style={{marginTop: -40}} />
                        </View>
                    </View>
                ),
            }}></Tab.Screen>
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
                tabBarBadge: 3
            }}></Tab.Screen>
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
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
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default ButtomNavigation;
