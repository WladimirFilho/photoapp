import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/Config';
//import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(loading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });
  }, [auth]);

  const loginHandler = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
          <Text style={styles.title}>Log In</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.shadowProps]}
              placeholder='Email'
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={[styles.input, styles.shadowProps]}
              placeholder='Password'
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry
            />
          </View>
          {loading ? (
            <View
              style={[
                styles.loginBtnContainer,
                styles.shadowProps,
                { width: '90%', justifyContent: 'center' },
              ]}
            >
              <Text style={styles.loginBtnText}>Loading...</Text>
            </View>
          ) : (
            <Pressable
              style={{ width: '90%', justifyContent: 'center' }}
              onPress={loginHandler}
            >
              <View style={[styles.loginBtnContainer, styles.shadowProps]}>
                <Text style={styles.loginBtnText}>Log In</Text>
              </View>
            </Pressable>
          )}
          <View style={styles.signinBtnContainer}>
            <Text style={styles.signinText}>Dont have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Signin');
              }}
            >
              <Text style={[styles.signinText, { color: '#ff6969' }]}>
                {' '}
                Sing In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

// style={styles.}
export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    color: '#515C6F',
    textTransform: 'capitalize',
    fontSize: 35,
    fontWeight: '800',
    marginBottom: 40,
  },
  inputContainer: {
    width: '90%',
    justifyContent: 'space-between',
    height: 130,
  },
  input: {
    height: 60,
    borderRadius: 10,
    color: '#515C6F',
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    backgroundColor: 'rgb(235,235,235)',
  },
  loginBtnContainer: {
    marginTop: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6969',
    borderRadius: 50,
    boxShadow: '0 0 10 0 rgba(0,0,0,0.3)',
  },
  loginBtnText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  signinBtnContainer: { marginTop: 20, flexDirection: 'row' },
  signinText: { color: '#515C6F', fontWeight: '700' },
  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
