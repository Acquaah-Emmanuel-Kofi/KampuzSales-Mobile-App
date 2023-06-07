// import { AppRegistry } from 'react-native';
// import App from './App'; // or the name of your root component

// AppRegistry.registerComponent('main', () => App);

import { Device } from 'expo-device';

import { AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import App from "./App";
import { name as appName } from "./app.json";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
if (Device == "android") {
  registerRootComponent(App);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
