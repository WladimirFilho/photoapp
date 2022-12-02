import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import Login from './screens/auth/Login';
import Signin from './screens/auth/Signin';
import New from './screens/New';
import Posts from './screens/Posts';
import Post from './screens/Post';
import Splashscreen from './screens/splash/Splashscreen';
import FirstLogin from './screens/FirstLogin';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Splash'
          component={Splashscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signin'
          component={Signin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FirstLogin'
          component={FirstLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='New'
          component={New}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Posts'
          component={Posts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Post'
          component={Post}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
