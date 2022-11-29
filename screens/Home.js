import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { auth, logout } from "../firebase/Config";

const Home = ({ navigation }) => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("Login");
      }
    });
  }, [auth]);

  return (
    <View style={styles.container}>
      <Pressable onPress={logout}>
        <View>
          <Text>Logout</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
