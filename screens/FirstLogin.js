import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import firstImage from '../assets/images/img1.jpeg';
import secondImage from '../assets/images/img2.jpeg';

const FirstLogin = ({ navigation }) => {
  const [changeImage, setChangeImage] = useState(false);

  return (
    <SafeAreaView>
      {changeImage ? (
        <>
          <Image source={secondImage} />

          <View style={styles.container}>
            <Text style={styles.description}>
              Taking pictures, you can help your city to be better
            </Text>

            <Pressable
              onPress={() => navigation.navigate('Home')}
              style={styles.button}
            >
              <Text style={styles.btnText}>NEXT</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Image source={firstImage} />

          <View style={styles.container}>
            <Text style={styles.description}>
              Taking pictures, you can help your city to be better
            </Text>

            <Pressable
              onPress={() => setChangeImage(true)}
              style={[styles.button, styles.shadowProps]}
            >
              <Text style={styles.btnText}>NEXT</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default FirstLogin;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  description: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(70,70,70)',
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#ff6969',
    width: 150,
    borderRadius: 50,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
});
