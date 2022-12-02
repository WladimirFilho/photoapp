import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cam from '../../assets/images/cam.png';

const Splashscreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate('Login');
  }, 2500);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, styles.shadowProps]}>
        <Image source={Cam} style={{ height: 100 }} />
      </View>
      <Text style={styles.text}>PhotoApp</Text>
    </SafeAreaView>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  card: {
    height: 200,
    width: 200,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#ff6969',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'rgb(160,160,160)',
  },
  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
});
