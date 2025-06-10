import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { CustomToast } from '../CustomToast';
import Constants from 'expo-constants';

const BACKEND_URL = Constants.expoConfig?.extra?.backendUrl || 'http://localhost:5001';

export default function GenderForm() {
  const { name, email, phone, type } = useLocalSearchParams();
  const [gender, setGender] = useState('');
  const [college, setCollege] = useState('');
  const [selectedCollegeId, setSelectedCollegeId] = useState('');
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [showCollegeOptions, setShowCollegeOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingColleges, setIsLoadingColleges] = useState(true);
  const [colleges, setColleges] = useState<Array<{_id: string, fullName: string}>>([]);
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleSelectGender = (value: string) => {
    setGender(value);
    setShowGenderOptions(false);
  };

  const handleSelectCollege = (uniID: string, collegeName: string) => {
    setCollege(collegeName);
    setSelectedCollegeId(uniID);
    setShowCollegeOptions(false);
  };

  // Fetch colleges from the backend
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/user/auth/list`);
        if (response.ok) {
          const data = await response.json();
          setColleges(data);
        }
      } catch (error) {
        console.error('Error fetching colleges:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load colleges. Please try again.',
          position: 'bottom',
        });
      } finally {
        setIsLoadingColleges(false);
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async () => {
    if (!gender || !college) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: !gender ? 'Please choose your gender.' : 'Please select your college.',
        position: 'bottom',
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/user/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          password: (global as any).tempPassword,
          gender,
          uniID: selectedCollegeId,
          type
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear the temporary password from memory
        delete (global as any).tempPassword;
        
        Toast.show({
          type: 'success',
          text1: 'Signup Successful!',
          text2: 'Please verify your email with the OTP sent.',
          position: 'bottom',
        });
        
        // Store token if provided
        if (data.token) {
          // You might want to use a secure storage solution here
          // For now, we'll just store it in memory
          (global as any).token = data.token;
        }

        // Navigate to OTP verification
        setTimeout(() => {
          router.push({
            pathname: '/otpverification/OtpVerification',
            params: { email }
          });
        }, 2000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: data.message || 'Something went wrong. Please try again.',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection and try again.',
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
        <Text style={styles.title}>Profile Details</Text>

        <View style={styles.cardWrapper}>
          <Text style={styles.label}>GENDER</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowGenderOptions(true)}
          >
            <Text style={{ color: gender ? '#000' : '#8a8a8a', fontSize: 16 }}>
              {gender || 'Select Gender'}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="#666"
              style={{ position: 'absolute', right: 10 }}
            />
          </TouchableOpacity>

          <Modal transparent visible={showGenderOptions} animationType="fade" onRequestClose={() => setShowGenderOptions(false)}>
            <Pressable onPress={() => setShowGenderOptions(false)} style={{ flex: 1 }}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={genderOptions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => handleSelectGender(item)}
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.optionsList}
                  />
                </View>
              </View>
            </Pressable>
          </Modal>

          <Text style={[styles.label, { marginTop: 20 }]}>COLLEGE</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => !isLoadingColleges && setShowCollegeOptions(true)}
            disabled={isLoadingColleges}
          >
            <Text style={{ color: college ? '#000' : '#8a8a8a', fontSize: 16 }}>
              {isLoadingColleges ? 'Loading colleges...' : (college || 'Select College')}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="#666"
              style={{ position: 'absolute', right: 10 }}
            />
          </TouchableOpacity>

          <Modal transparent visible={showCollegeOptions} animationType="fade" onRequestClose={() => setShowCollegeOptions(false)}>
            <Pressable onPress={() => setShowCollegeOptions(false)} style={{ flex: 1 }}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={colleges}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => handleSelectCollege(item._id, item.fullName)}
                      >
                        <Text style={styles.optionText}>{item.fullName}</Text>
                      </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.optionsList}
                    ListEmptyComponent={
                      <View style={styles.noOptionsContainer}>
                        <Text style={styles.noOptionsText}>
                          {isLoadingColleges ? 'Loading colleges...' : 'No colleges available'}
                        </Text>
                      </View>
                    }
                  />
                </View>
              </View>
            </Pressable>
          </Modal>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.halfButton]}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.halfButton]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </Text>
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
    paddingTop: 90,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
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
  dropdown: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownButton: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  optionsList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 300,
    width: '90%',
    alignSelf: 'center',
  },
  noOptionsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noOptionsText: {
    color: '#666',
    fontSize: 16,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});






