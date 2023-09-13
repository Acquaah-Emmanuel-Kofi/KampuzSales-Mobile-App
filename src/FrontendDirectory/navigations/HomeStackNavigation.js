import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SingleProductDetailsScreen from '../screens/SingleProductDetailsScreen';
import VendorInformationScreen from '../screens/VendorInformationScreen';
import WishlistScreen from '../screens/WishlistScreen';
import PostedProductScreen from '../screens/PostedProductScreen';
import EditProductDetails from '../screens/EditProductDetails';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import AlertScreen from '../components/NotificationComponent/AlertScreen';
import BuyerInformationScreen from '../screens/BuyerInformationScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';

const Tab = createNativeStackNavigator();

const HomeStackNavigation = () => {
    return(
        <Tab.Navigator
            backBehavior="order"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { height: 0 },
            }}
        >
            <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
            <Tab.Screen name='Single' component={SingleProductDetailsScreen}></Tab.Screen>
            <Tab.Screen name='Wishlist' component={WishlistScreen}></Tab.Screen>
            <Tab.Screen name='Search' component={SearchScreen}></Tab.Screen>
            <Tab.Screen name='Cart' component={CartScreen}></Tab.Screen>
            <Tab.Screen name='Alert' component={AlertScreen}></Tab.Screen>
            <Tab.Screen name='PostedProducts' component={PostedProductScreen}></Tab.Screen>
            <Tab.Screen name='EditProduct' component={EditProductDetails}></Tab.Screen>
            <Tab.Screen name='AccountSettings' component={AccountSettingsScreen}></Tab.Screen>
            <Tab.Screen name='VendorInfo' component={VendorInformationScreen}></Tab.Screen>
            <Tab.Screen name='BuyerInfo' component={BuyerInformationScreen}></Tab.Screen>
            <Tab.Screen name='OrderSummary' component={OrderSummaryScreen}></Tab.Screen>
            <Tab.Screen name='OrderSuccess' component={OrderSuccessScreen}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default HomeStackNavigation;
