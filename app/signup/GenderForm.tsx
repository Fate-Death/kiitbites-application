import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { CustomToast } from '../CustomToast';


export default function GenderForm() {
  const [gender, setGender] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const genderOptions = ['Male', 'Female'];

  const handleSelect = (value: string) => {
    setGender(value);
    setShowOptions(false);
  };

  const handleSubmit = () => {
    if (!gender) {
        Toast.show({
            type: 'error',
            text1: 'Validation Error',
            text2: 'Please choose your gender.',
            position: 'bottom',
          });
      return;
    }
    Toast.show({
        type: 'success',
        text1: 'Signup Successful!',
      
        position: 'bottom',
      });
    
  };

  return (
    <>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Gender</Text>

      <View style={styles.cardWrapper}>
        <Text style={styles.label}>GENDER</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowOptions(true)}
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

        
        <Modal transparent visible={showOptions} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.option}
                    onPress={() => handleSelect(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
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
          >
            <Text style={styles.buttonText}>Submit</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 12,
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






