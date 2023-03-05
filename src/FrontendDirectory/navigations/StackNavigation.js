import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/CartScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SingleProductDetailsScreen from '../screens/SingleProductDetailsScreen';

const Tab = createNativeStackNavigator();

const StackNavigation = () => {
    return(
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { height: 0 },
            }}
        >
            <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
            <Tab.Screen name='Single' component={SingleProductDetailsScreen}></Tab.Screen>
            <Tab.Screen name='Search' component={SearchScreen}></Tab.Screen>
            <Tab.Screen name='Cart' component={CartScreen}></Tab.Screen>
            <Tab.Screen name='EditProfile' component={EditProfileScreen}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default StackNavigation;
