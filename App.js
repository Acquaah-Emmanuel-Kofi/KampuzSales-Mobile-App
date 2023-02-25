import React, { useEffect, useState } from 'react';
import Tabs from './src/FrontendDirectory/navigations/tabs';
import { auth }  from './src/BackendDirectory/config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ButtomNavigation from './src/FrontendDirectory/navigations/BottomNavigation';


const AppStack = createNativeStackNavigator();

function App() {

  const [ initializing, setInitializing ] = useState(true);
  const [ user, setUser ] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  if(initializing) return null;

  if(!user){
    return (
      <Tabs />
    );
  }


  return (
        <AppStack.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { height: 0 },
              }}
          >
            <AppStack.Screen name='Buttom' component={ButtomNavigation}></AppStack.Screen>
        </AppStack.Navigator>
  );
}

export default () => {
    return (
      <NavigationContainer>
        <App />
      </NavigationContainer>
  );
}