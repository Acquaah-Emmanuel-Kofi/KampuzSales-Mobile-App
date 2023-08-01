import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RequestScreen from '../screens/RequestScreen';
import AddRequestScreen from '../screens/AddRequestScreen';
import ViewRequestScreen from '../screens/ViewRequestScreen';

const Tab = createNativeStackNavigator();

const RequestStackNavigation = () => {
    return(
        <Tab.Navigator
            initialRouteName='Request'
            backBehavior="order"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { height: 0 },
            }}
        >
            <Tab.Screen name='Request' component={RequestScreen}></Tab.Screen>
            <Tab.Screen name='AddRequest' component={AddRequestScreen}></Tab.Screen>
            <Tab.Screen name='ViewRequest' component={ViewRequestScreen}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default RequestStackNavigation;
