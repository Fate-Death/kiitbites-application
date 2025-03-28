import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
//   const inputRefs = useRef([]);
    const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = () => {
    Keyboard.dismiss();
    const otpCode = otp.join('');
    console.log('Entered OTP:', otpCode);
    
    if (otpCode === '1234') {
      router.push('/LoginScreen');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidView}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Enter OTP Code</Text>
            <Text style={styles.headerSubtitle}>Please enter the 4-digit code sent to your phone</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(digit, index);
                    }
                  }}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={verifyOTP}>
              <Text style={styles.verifyButtonText}>VERIFY</Text>
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
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  otpInput: {
    width: 55,
    height: 55,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  verifyButton: {
    backgroundColor: '#009688',
    borderRadius: 12,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});