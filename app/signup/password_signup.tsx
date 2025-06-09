import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { CustomToast } from '../CustomToast';

export default function SignupStep2() {
  const { name, email, phone, type } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[^A-Za-z0-9]/;
  
    return (
      minLength.test(password) &&
      upper.test(password) &&
      lower.test(password) &&
      number.test(password) &&
      special.test(password)
    );
  };
  

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
       Toast.show({
                 type: 'error',
                 text1: 'Validation Error',
                 text2: 'Please fill in both password fields.',
                 position: 'bottom',
               });
      return;
    }

    if (password !== confirmPassword) {
        Toast.show({
                  type: 'error',
                  text1: 'Validation Error',
                  text2: 'Passwords do not match.',
                  position: 'bottom',
                });
     
      return;
    }
    if (!validatePassword(password)) {
     
        Toast.show({
                  type: 'error',
                  text1: 'Validation Error',
                  text2: 'Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character',
                  position: 'bottom',
                });
      return;
    }

    router.push({
      pathname: '/signup/GenderForm',
      params: {
        name,
        email,
        phone,
        type
      }
    });
    // Store password in memory temporarily
    (global as any).tempPassword = password;
  };

  return (
    <>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Set Password</Text>
      <Text style={styles.subtitle}>Create your login credentials</Text>

      <View style={styles.cardWrapper}>
        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#8a8a8a"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>CONFIRM PASSWORD</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#8a8a8a"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.icon}
          >
            <MaterialCommunityIcons
              name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.halfButton]}
            onPress={() => router.push('/signup/SignupForm')}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.halfButton]}
            onPress= {handleSubmit}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Already have an account?{' '}
          <Text
            style={styles.login}
            onPress={() => router.push('/login/LoginForm')}
          >
            LOGIN
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
      <Toast
                config={{
                  error: (props) => <CustomToast {...props} />,
                  success: (props) => <CustomToast {...props} />,
                }}
              />
            </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    paddingTop: 90,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#B0B0B0',
    fontSize: 14,
    marginBottom: 30,
  },
  cardWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    marginTop: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 6,
    color: '#333',
  },
  inputWrapper: {
    position: 'relative',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 12,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  input: {
    paddingLeft: 12,
    paddingRight: 40,
    fontSize: 16,
    color: '#111',
    flex: 1,
    height: '100%',
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: 13,
    zIndex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 12, 
  },
  halfButton: {
    width: '40%',
  },
  button: {
    backgroundColor: '#009688',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  login: {
    color: '#00C2B2',
    fontWeight: 'bold',
  },
});

