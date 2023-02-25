import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const Tabs = () => {

    // const [ isFirstLunch, setIsFirstLunch ] = useState(null);

    // useEffect(() => {
    //       try {
    //             const value = AsyncStorage.getItem('alreadyLunched');
    //             if (value !== null) {
    //             // We have data!!
    //                 console.log(value);
    //                 setIsFirstLunch(false)
    //             } else {
    //                 AsyncStorage.setItem('alreadyLunched', 'true');
    //                 setIsFirstLunch(true)
    //             }
    //         } catch (error) {
    //             // Error retrieving data
    //             console.log(error);
    //         }
    // }, []);

    // if( isFirstLunch === null){
    //     return null;
    // } else if ( isFirstLunch === true){
    //     return(
    //         <Tab.Navigator
    //             initialRouteName='Login'
    //             screenOptions={{
    //                 tabBarShowLabel: false,
    //                 headerShown: false,
    //                 tabBarStyle: { height: 0 },
    //             }}
    //         >
    //             <Tab.Screen name='Onboarding' component={OnboardingScreen}></Tab.Screen>
    //             <Tab.Screen name='Login' component={LoginScreen}></Tab.Screen>
    //             <Tab.Screen name='Register' component={RegisterScreen}></Tab.Screen>
    //             <Tab.Screen name='Password' component={CreatePasswordScreen}></Tab.Screen>
    //             <Tab.Screen name='ForgotPassword' component={ForgotPasswordScreen}></Tab.Screen>
    //             <Tab.Screen name='ResetPassword' component={ResetPasswordScreen}></Tab.Screen>
    //         </Tab.Navigator>
    //     );
    // } else {
    //     return <LoginScreen />
    // }

    
    return(
        <Tab.Navigator
            initialRouteName='Login'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { height: 0 },
            }}
        >
            <Tab.Screen name='Onboarding' component={OnboardingScreen}></Tab.Screen>
            <Tab.Screen name='Login' component={LoginScreen}></Tab.Screen>
            <Tab.Screen name='Register' component={RegisterScreen}></Tab.Screen>
            <Tab.Screen name='Password' component={CreatePasswordScreen}></Tab.Screen>
            <Tab.Screen name='ForgotPassword' component={ForgotPasswordScreen}></Tab.Screen>
            <Tab.Screen name='ResetPassword' component={ResetPasswordScreen}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default Tabs;
