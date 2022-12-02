import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, firestore, storage } from '../firebase/Config';
import { collection, Timestamp, addDoc } from 'firebase/firestore';

const New = ({ navigation }) => {
  const [image, setImage] = useState();
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(0);

  const imagePickerCall = async (type) => {
    let data;
    if (type === 'camera') {
      data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }
    if (type === 'gallery') {
      data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }
    if (!data) {
      return;
    }

    setImage(data.assets[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      alert('Please select an image');
      return;
    }
    const generateName = `images/${Date.now()}.jpg`;
    const storageRef = ref(storage, generateName);
    const img = await fetch(image.uri);
    const bytes = await img.blob();

    const uploadTask = uploadBytesResumable(storageRef, bytes);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(uploadProgress);
      },

      (error) => {
        alert(error.message);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        createDocInCollection(url, generateName);
        alert('Uploaded successfully');
        setDescription('');
        setLocation('');
        setImage(null);
        setLoading(0);
      },
    );
  };

  const createDocInCollection = async (url, name) => {
    const data = {
      uid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      fileRef: name,
      description,
      location,
      image: url,
      createdAt: Timestamp.now(),
    };
    const collectionRef = collection(firestore, 'posts');
    await addDoc(collectionRef, data);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
          <View style={styles.navbar}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                name='arrow-back-ios'
                size={30}
                style={{ color: '#FF6969' }}
              />
            </Pressable>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#FF6969' }}>
              New
            </Text>
          </View>

          {image ? (
            <Image source={{ uri: image.uri }} style={styles.previewImage} />
          ) : null}
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={styles.buttonsContainer}
              onPress={() => {
                imagePickerCall('camera');
              }}
            >
              <Icon name='add-a-photo' size={30} style={{ color: '#FF6969' }} />
              <Text style={styles.buttonsTexts}>Take a Picture</Text>
            </Pressable>
            <Pressable
              style={styles.buttonsContainer}
              onPress={() => {
                imagePickerCall('gallery');
              }}
            >
              <Icon name='collections' size={30} style={{ color: '#FF6969' }} />
              <Text style={styles.buttonsTexts}>Select from gallery</Text>
            </Pressable>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputsLabel}>Description</Text>
            <TextInput
              style={[
                styles.input,
                styles.shadowProps,
                {
                  height: 200,
                  textAlignVertical: 'top',
                  paddingTop: 15,
                  shadowOpacity: 0.1,
                },
              ]}
              multiline={true}
              numberOfLines={10}
              placeholder='Write your description here...'
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputsLabel}>Location</Text>
            <TextInput
              style={[styles.input, styles.shadowProps]}
              placeholder='Write your location here...'
              value={location}
              onChangeText={(text) => setLocation(text)}
            />
          </View>
          {loading > 0 ? (
            <View style={[styles.submitBtnContainer, styles.shadowProps]}>
              <Text style={styles.submitBtnText}>Loading..</Text>
              <Text style={styles.submitBtnText}>{`${loading}%`}</Text>
            </View>
          ) : (
            <Pressable
              onPress={uploadImage}
              style={[styles.submitBtnContainer, styles.shadowProps]}
            >
              <Text style={styles.submitBtnText}>UPLOAD FILE</Text>
              <View style={styles.submitBtnCircle}>
                <Icon
                  style={styles.submitBtn}
                  name='arrow-forward-ios'
                  size={20}
                />
              </View>
            </Pressable>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default New;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 50 : 0,
  },
  navbar: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '5%',
  },
  previewImage: {
    width: 50,
    height: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    borderRadius: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
  buttonsTexts: {
    fontSize: 15,
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  inputsContainer: {
    width: '90%',
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
  },
  inputsLabel: {
    color: '#515C6F',
  },
  input: {
    marginTop: 10,
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

  submitBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    padding: 8,
    width: '50%',
    marginTop: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FF6969',
  },
  submitBtnText: {
    color: 'white',
    fontWeight: '700',
    paddingLeft: 10,
  },
  submitBtnCircle: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
  },
  submitBtn: {
    color: '#FF6969',
  },

  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
