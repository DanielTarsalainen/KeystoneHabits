import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";
import loading from "/loppuprojekti_mobiili/keystonehabits/screens/loading.gif";
import keystonehabits from "/loppuprojekti_mobiili/keystonehabits/screens/keystonehabits.jpg";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const isMountedRef = useRef(null);

  const navigation = useNavigation();

  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setIsVisible();
      navigation.replace("Homepage");
    }
    return unsubscribe;
  });

  useEffect(() => {
    isMountedRef.current = true; // set true when mounted
    return () => (isMountedRef.current = false); // clear when unmounted
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    });
    return () => {
      clearTimeout(timer);
      setEmail("");
      setPassword("");
      setIsVisible(false)
    };
  }, []);

  const handleSignUp = () => {
    setIsVisible(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with", user.email);
        unsubscribe();
      })
      .catch((error) => showSignUpAlert(error.message));
  };

  const handleLogin = () => {
    setIsVisible(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        unsubscribe();
      })
      .catch((error) => showLogInAlert(error.message));
  };

  const showLogInAlert = (data) => {
    alert(data);
    setIsVisible(false);
  };

  const showSignUpAlert = (data) => {
    alert(data);
    setIsVisible(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={false}>
      <View style={styles.inputContainer}>

        <ImageBackground
          source={keystonehabits}
          style={{ width: "100%", height: "60%" }}
        >
          <View
            style={{
              position: "absolute",
              top:38,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "800", fontFamily: "monospace", fontSize: 27}}>KeystoneHabits</Text>
          </View>
        </ImageBackground>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={(styles.button, styles.buttonOutLine)}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
      {isVisible == true ? (
        <View style={{marginBottom: 25}}>
          <Image style={styles.loadingpic} source={loading} />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  inputContainer: {
    width: "80%",
    justifyContent: "flex-end",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "space-between",
    marginTop: 40,
    flexDirection: "row",
    paddingRight: 30,
    paddingLeft: 30
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutLine: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 2,
    borderRadius: 10,
    padding: 13
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  loadingpic: {
    marginTop: 70,
    width: 36,
    height: 36,
  },
});
