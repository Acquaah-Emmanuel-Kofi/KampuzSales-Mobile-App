import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
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
        </Tab.Navigator>
    );
}

export default StackNavigation;
