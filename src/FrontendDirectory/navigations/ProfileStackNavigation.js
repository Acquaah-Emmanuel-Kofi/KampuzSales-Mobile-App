import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfileScreen from '../screens/EditProfileScreen';
import PostedProductScreen from '../screens/PostedProductScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WishlistScreen from '../screens/WishlistScreen';
import EditProductDetails from '../screens/EditProductDetails';
import SingleProductDetailsScreen from '../screens/SingleProductDetailsScreen';

const Tab = createNativeStackNavigator();

const ProfileStackNavigation = () => {
    return(
        <Tab.Navigator
            initialRouteName='Profile'
            backBehavior="order"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { height: 0 },
            }}
        >
            <Tab.Screen name='Profile' component={ProfileScreen}></Tab.Screen>
            <Tab.Screen name='Wishlist' component={WishlistScreen}></Tab.Screen>
            <Tab.Screen name='PostedProducts' component={PostedProductScreen}></Tab.Screen>
            <Tab.Screen name='Single' component={SingleProductDetailsScreen}></Tab.Screen>
            <Tab.Screen name='EditProduct' component={EditProductDetails}></Tab.Screen>
            <Tab.Screen name='EditProfile' component={EditProfileScreen}></Tab.Screen>
            <Tab.Screen name='AccountSettings' component={AccountSettingsScreen}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default ProfileStackNavigation;
