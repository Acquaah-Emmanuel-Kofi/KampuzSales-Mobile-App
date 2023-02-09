import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import Colors from '../data/colors';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import WishlistScreen from '../screens/WishlistScreen';
import StackNavigation from './StackNavigation';
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const ButtomNavigation = () => {
    return(
        <Tab.Navigator
            backBehavior='Main'
            initialRouteName='Main'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen name='Main' component={StackNavigation} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <Ionicons name="ios-home" size={24} color={Colors.main} />
                                ) : ( 
                                <Ionicons name="ios-home-outline" size={24} color={Colors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? Colors.main : Colors.subBlack, fontSize: 12}}>Home</Text>
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='WhishList' component={WishlistScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <MaterialIcons name="favorite" size={24} color={Colors.main} />
                                ) : ( 
                                <MaterialIcons name="favorite-outline" size={24} color={Colors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? Colors.main : Colors.subBlack, fontSize: 12}}>WhishList</Text>
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='Post' component={PostScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <AntDesign name="pluscircle" size={50} color={Colors.main} style={{marginTop: -40}} />
                                ) : ( 
                                <AntDesign name="pluscircle" size={50} color={Colors.subBlack} style={{marginTop: -40}} />
                            )}
                        </View>
                        {/* <Text style={{color: focused ? Colors.main : Colors.subBlack}}>Post</Text> */}
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='Search' component={SearchScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <Feather name="search" size={24} color={Colors.main} />
                                ) : ( 
                                <Feather name="search" size={24} color={Colors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? Colors.main : Colors.subBlack, fontSize: 12}}>Search</Text>
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            {focused ? (
                                <Icon name="ios-person" size={24} color={Colors.main} />
                                ) : ( 
                                <Icon name="ios-person-outline" size={24} color={Colors.subBlack} />
                            )}
                        </View>
                        <Text style={{color: focused ? Colors.main : Colors.subBlack, fontSize: 12}}>Profile</Text>
                    </View>
                ),
                tabBarBadge: 3
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default ButtomNavigation;
