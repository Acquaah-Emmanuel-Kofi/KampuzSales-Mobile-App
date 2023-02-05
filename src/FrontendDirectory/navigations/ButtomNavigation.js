import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import Colors from '../data/colors';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import WishlistScreen from '../screens/WishlistScreen';
import StackNavigation from './StackNavigation';

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
                        <Image
                            source={require("../data/images/NavigationIcons/HomeIcon.png")}
                            resizeMode='contain'
                            style={{
                                tintColor: focused ? Colors.main : Colors.subBlack
                            }}
                        />
                        {/* <Text style={{color: focused ? Colors.main : Colors.subBlack}}>Home</Text> */}
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='WhishList' component={WishlistScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={require("../data/images/NavigationIcons/WhishList.png")}
                            resizeMode='contain'
                            style={{
                                tintColor: focused ? Colors.main : Colors.subBlack
                            }}
                        />
                        {/* <Text style={{color: focused ? Colors.main : Colors.subBlack}}>WhishList</Text> */}
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='Post' component={PostScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: Colors.main,
                            borderRadius: '50%',
                            width: 50,
                            height: 50,
                            marginTop: -20,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '600',
                                color: Colors.white
                            }}>+</Text>
                        </View>
                        {/* <Text style={{color: focused ? Colors.main : Colors.subBlack}}>Post</Text> */}
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='Search' component={SearchScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={require("../data/images/NavigationIcons/Search.png")}
                            resizeMode='contain'
                            style={{
                                tintColor: focused ? Colors.main : Colors.subBlack
                            }}
                        />
                        {/* <Text style={{color: focused ? Colors.main : Colors.subBlack}}>Search</Text> */}
                    </View>
                ),
            }}></Tab.Screen>
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={require("../data/images/NavigationIcons/Profile.png")}
                            resizeMode='contain'
                            style={{
                                tintColor: focused ? Colors.main : Colors.subBlack
                            }}
                        />
                        {/* <Text style={{color: focused ? Colors.main : Colors.subBlack}}>Profile</Text> */}
                    </View>
                ),
                tabBarBadge: 3
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default ButtomNavigation;
