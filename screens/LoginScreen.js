import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";
import loading from '/loppuprojekti_mobiili/keystonehabits/screens/loading.gif'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState()

  const navigation = useNavigation();

  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setIsVisible()
      navigation.replace("Homepage");
    }
    return unsubscribe;
  });
  

useEffect(() => {
  const timer = setTimeout(() => {
    setIsVisible(false);
  });
  return () => {
    clearTimeout(timer);
  }
}, []);



  const handleSignUp = () => {
    setIsVisible(true)
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with", user.email);
        unsubscribe();
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    setIsVisible(true)
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        unsubscribe();
      })
      .catch((error) => alert(error.message));
  };


  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
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
      { isVisible == true ?
      <View>
              <Image  style={styles.stretch} source={loading}/>

        </View>
        : null
      }
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 140,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
    borderRadius: 10,
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
  stretch: {
    marginTop: 80,
    width: 70,
    height: 70
  }
});
