import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { auth, logout } from "../firebase/Config";
import cam from "../assets/images/cam.png";
import pic from "../assets/images/pic.png";

const Home = ({ navigation }) => {
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       navigation.navigate("Login");
  //     }
  //   });
  // }, [auth]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <Pressable onPress={logout}>
        <View>
          <Text>Logout</Text>
        </View>
      </Pressable> */}

      <Pressable
        style={{ width: "60%" }}
        onPress={() => {
          navigation.navigate("New");
        }}
      >
        <View style={[styles.card, styles.shadowProps]}>
          <Image source={cam} />
          <Text style={styles.text}>TAKE A PICTURE</Text>
        </View>
      </Pressable>
      <Pressable
        style={{ width: "60%", marginTop: 30 }}
        onPress={() => {
          navigation.navigate("Posts");
        }}
      >
        <View
          style={[
            styles.card,
            styles.shadowProps,
            { backgroundColor: "#F8E6C7" },
          ]}
        >
          <Image source={pic} />
          <Text style={[styles.text, { textAlign: "center" }]}>
            SEE THE OTHER PICTURES
          </Text>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  card: {
    height: 300,
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#D3DFEB",
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
  },

  text: {
    marginTop: 30,
    color: "#515C6F",
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "700",
  },

  shadowProps: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
});
