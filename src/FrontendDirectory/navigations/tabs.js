import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ButtomNavigation from './ButtomNavigation';

const Tab = createNativeStackNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            initialRouteName='Login'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { height: 0 },
            }}
        >
            <Tab.Screen name='Login' component={LoginScreen}></Tab.Screen>
            <Tab.Screen name='Register' component={RegisterScreen}></Tab.Screen>
            <Tab.Screen name='ForgotPassword' component={ForgotPasswordScreen}></Tab.Screen>
            <Tab.Screen name='ResetPassword' component={ResetPasswordScreen}></Tab.Screen>
            <Tab.Screen name='Buttom' component={ButtomNavigation}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default Tabs;
