import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfileScreen from '../screens/EditProfileScreen';
import PostedProductScreen from '../screens/PostedProductScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WishlistScreen from '../screens/WishlistScreen';
import EditProductDetails from '../screens/EditProductDetails';
import SingleProductDetailsScreen from '../screens/SingleProductDetailsScreen';
import AboutKampuzSales from '../screens/AboutKampuzSales';
import RequestResponededScreen from '../screens/RequestResponededScreen';
import UpdateEmailScreen from '../screens/UpdateEmailScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import RequestAcceptanceScreen from '../screens/RequestAcceptanceScreen';
import SalesHistoryScreen from '../screens/SalesHistoryScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import FAQScreen from '../screens/FAQScreen';

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
            <Tab.Screen name='RequestResponeded' component={RequestResponededScreen}></Tab.Screen>
            <Tab.Screen name='RequestAcceptance' component={RequestAcceptanceScreen}></Tab.Screen>
            <Tab.Screen name='Single' component={SingleProductDetailsScreen}></Tab.Screen>
            <Tab.Screen name='EditProduct' component={EditProductDetails}></Tab.Screen>
            <Tab.Screen name='EditProfile' component={EditProfileScreen}></Tab.Screen>
            <Tab.Screen name='SalesHistory' component={SalesHistoryScreen}></Tab.Screen>
            <Tab.Screen name='OrderHistory' component={OrderHistoryScreen}></Tab.Screen>
            <Tab.Screen name='AccountSettings' component={AccountSettingsScreen}></Tab.Screen>
            <Tab.Screen name='FAQ' component={FAQScreen}></Tab.Screen>
            <Tab.Screen name='AboutKampuzSales' component={AboutKampuzSales}></Tab.Screen>
            <Tab.Screen name='UpdateEmail' component={UpdateEmailScreen}></Tab.Screen>
            <Tab.Screen name='UpdatePassword' component={UpdatePasswordScreen}></Tab.Screen>
            <Tab.Screen name='ComingSoon' component={ComingSoonScreen}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default ProfileStackNavigation;
