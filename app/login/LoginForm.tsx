import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Toast from 'react-native-toast-message';
import { CustomToast } from '../CustomToast';
import { config } from "../../config";



export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();



  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("user-jwt");
        if (token) {
          router.replace("/profile/ProfilePage");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLogin();
  }, []);
  
  const handleSubmit = async () => {
    setError("");

    if (!identifier || !password) {
     
        Toast.show({
              type: 'error',
              text1: 'Validation Error',
              text2: 'Email/username and password are required.',
              position: 'bottom',
            });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${config.backendUrl}/api/auth/login`, {
        identifier,
        password,
      });

      const { token, message } = response.data;

      if (!token) {
        throw new Error("Invalid response from server.");
      }

      try {
        console.log("Attempting to store token:", token);
        await SecureStore.setItemAsync("user-jwt", token);
        console.log("Token stored successfully");
        router.replace("/profile/ProfilePage");
      } catch (storageError) {
        console.error("Detailed storage error:", storageError);
        if (storageError instanceof Error) {
          throw new Error(`Failed to store login credentials: ${storageError.message}`);
        }
        throw new Error("Failed to store login credentials");
      }
    } catch (error: any) {
      console.error("Login error details:", {
        error: error,
        responseData: error.response?.data,
        statusCode: error.response?.status,
        message: error.message
      });

      // Handle backend-sent errors like OTP required or rate limit
      const backendMessage = error.response?.data?.message || 
        (error instanceof Error ? error.message : "Login failed");
      const redirectTo = error.response?.data?.redirectTo;

      if (redirectTo) {
        router.push(redirectTo); // redirect to OTP verification
      } else {
        setError(backendMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidView}
          >
          <View style={styles.headerContainer}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dt45pu5mx/image/upload/v1743530399/top_left_icon_jbwtev.png",
              }}
              style={styles.topleftimage}
            />
            <Text style={styles.headerTitle}>Login</Text>
            <Text style={styles.headerSubtitle}>
              Please sign in to your existing account
            </Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL or PHONE</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email or Phone"
                  placeholderTextColor="#8a8a8a"
                  value={identifier}
                  onChangeText={setIdentifier}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••••"
                  placeholderTextColor="#8a8a8a"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#8a8a8a"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rememberForgotContainer}>
              <TouchableOpacity
                onPress={() => router.push("/forgotpassword/ForgotPassword")}
              >
                <Text style={styles.forgotText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.noAccountText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push("/signup/SignupForm")}
              >
                <Text style={styles.signupText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  keyboardAvoidView: { 
    flex: 1, 
    justifyContent: "flex-start" 
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: 90,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  headerSubtitle: { 
    fontSize: 16, 
    color: "#B0B0B0", 
    textAlign: "center",
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    paddingTop: 40,
  },
  inputGroup: { 
    marginBottom: 20 
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  inputContainer: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  input: { 
    flex: 1, 
    height: "100%", 
    fontSize: 16, 
    color: "#111",
    paddingVertical: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 14,
    margin: 0,
    borderRadius: 10,
  },
  eyeIcon: { 
    padding: 5 
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    marginBottom: 20,
  },
  forgotText: { 
    fontSize: 14, 
    color: "#00C2B2", 
    fontWeight: "600" 
  },
  loginButton: {
    backgroundColor: "#009688",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold",
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  noAccountText: { 
    fontSize: 14, 
    color: "#333" 
  },
  signupText: { 
    fontSize: 14, 
    color: "#00C2B2", 
    fontWeight: "bold" 
  },
  topleftimage: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});



