import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Tabs from './src/FrontendDirectory/navigations/tabs';
import LoginScreen from './src/FrontendDirectory/screens/LoginScreen'

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar hidden={true} /> */}
      <Tabs />
    </NavigationContainer>
  );
}

