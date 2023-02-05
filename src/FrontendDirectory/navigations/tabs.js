import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import Colors from '../data/colors';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ButtomNavigation from './ButtomNavigation';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            initialRouteName='Login'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tab.Screen name='Login' component={LoginScreen}></Tab.Screen>
            <Tab.Screen name='Register' component={RegisterScreen}></Tab.Screen>
            <Tab.Screen name='Buttom' component={ButtomNavigation}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default Tabs;
