import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SignUp from './screens/SignUp';
import consoleOveride from './consoleOverride/consoleOverride'
import Tabs from './navigation/Tabs';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent"
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SignUp'>
            <Stack.Screen name = "SignUp" component={SignUp}/>
            <Stack.Screen name = "BottomTab" component={Tabs}/>
        </Stack.Navigator>
   </NavigationContainer>
   </SafeAreaProvider>
  );
}

