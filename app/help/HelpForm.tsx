import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { CustomToast } from '../CustomToast';
import axios from 'axios';
import { config } from '../../config';

export default function Help() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!name || !email || !message) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill out all fields.',
        position: 'bottom',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter a valid email address.',
        position: 'bottom',
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${config.backendUrl}/contact`, {
        name,
        email,
        message,
      });

      Toast.show({
        type: 'success',
        text1: 'Message sent successfully!',
        text2: response.data.message,
        position: 'bottom',
      });

      // Clear form after successful submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to send message. Please try again.',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Help</Text>
        <Text style={styles.subtitle}>Please feel free to ask your queries</Text>

        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={styles.label}>NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#8a8a8a"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#8a8a8a"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>MESSAGE</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Message"
              placeholderTextColor="#8a8a8a"
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]} 
              onPress={handleNext}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
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
    paddingTop: 60,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#B0B0B0',
    fontSize: 16,
    marginBottom: 28,
  },
  cardWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderRadius: 24,
    padding: 22,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomEndRadius: 0,
    marginTop: 40,
  },
  card: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 6,
    color: '#333333',
  },
  input: {
    backgroundColor: '#EDEDED',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    color: '#111',
  },
  button: {
    backgroundColor: '#009688',
    padding: 16,
    borderRadius: 12,
    marginTop: 32,
  },
  buttonDisabled: {
    backgroundColor: '#80CBC4',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
