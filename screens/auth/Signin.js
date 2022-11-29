import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/Config";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
  }, [auth]);

  const register = async () => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: username });
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const signinHandler = () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Empty fields");
      return;
    } else if (confirmPassword !== password) {
      alert("Password dont Match");
      return;
    }
    register();
    return;
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "android" ? 200 : 0,
        },
      ]}
      behavior="padding"
    >
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.shadowProps]}
          placeholder="User Name"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          style={[styles.input, styles.shadowProps]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={[styles.input, styles.shadowProps]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, styles.shadowProps]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          secureTextEntry
        />
      </View>
      {loading ? (
        <View
          style={[
            styles.loginBtnContainer,
            styles.shadowProps,
            { width: "90%", justifyContent: "center" },
          ]}
        >
          <Text style={styles.loginBtnText}>Loading...</Text>
        </View>
      ) : (
        <Pressable
          style={{ width: "90%", justifyContent: "center" }}
          onPress={signinHandler}
        >
          <View style={[styles.loginBtnContainer, styles.shadowProps]}>
            <Text style={styles.loginBtnText}>Sign In</Text>
          </View>
        </Pressable>
      )}
      <View style={styles.signinBtnContainer}>
        <Text style={styles.signinText}>Have an account?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={[styles.signinText, { color: "#ff6969" }]}> Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

// style={styles.}
export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#515C6F",
    textTransform: "capitalize",
    fontSize: 35,
    fontWeight: "800",
    marginBottom: 40,
  },
  inputContainer: {
    width: "90%",
    justifyContent: "space-between",
    height: 270,
  },
  input: {
    height: 60,
    borderRadius: 10,
    color: "#515C6F",
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    backgroundColor: "rgb(235,235,235)",
  },
  loginBtnContainer: {
    marginTop: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6969",
    borderRadius: 50,
    boxShadow: "0 0 10 0 rgba(0,0,0,0.3)",
  },
  loginBtnText: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  signinBtnContainer: { marginTop: 20, flexDirection: "row" },
  signinText: { color: "#515C6F", fontWeight: "700" },
  shadowProps: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
