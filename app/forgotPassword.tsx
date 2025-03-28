import React, { useState } from 'react';
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
  TouchableWithoutFeedback
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidView}
        >
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/top_left_icon.png')}
              style={styles.topleftimage}
            />
            <Text style={styles.headerTitle}>Forgot Password</Text>
            <Text style={styles.headerSubtitle}>Please sign in to your existing account</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL or PHONE</Text>
              <TextInput
                style={styles.input}
                placeholder="Email or Phone"
                placeholderTextColor="#8a8a8a"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={() => {
                Keyboard.dismiss();
                // Add your send code logic here
              }}
            >
              <Text style={styles.loginButtonText}>SEND CODE</Text>
            </TouchableOpacity>
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
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 65,
    flex: 0.18,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#b3b3b3',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
   },
   loginButton: {
     backgroundColor: '#009688',
     borderRadius: 12,
     height: 55,
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 20,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.2,
     shadowRadius: 3,
     elevation: 3,
   },
   loginButtonText: {
     color: 'white',
     fontSize: 16,
     fontWeight: 'bold',
   },
   topleftimage:{
     position: 'absolute',
   }
});