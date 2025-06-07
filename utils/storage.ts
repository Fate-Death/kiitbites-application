// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';
const EMAIL_KEY = 'user_email';

export const saveEmail = async (email: string) => {
  try {
    await AsyncStorage.setItem(EMAIL_KEY, email);
    return true;
  } catch (e) {
    console.error('Error saving email:', e);
    return false;
  }
};

export const getEmail = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(EMAIL_KEY);
  } catch (e) {
    console.error('Error getting email:', e);
    return null;
  }
};

export const removeEmail = async () => {
  try {
    await AsyncStorage.removeItem(EMAIL_KEY);
  } catch (e) {
    console.error('Error removing email:', e);
  }
};

export const saveToken = async (token: string) => {
  try {
    console.log('Saving token to storage...');
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log('Token saved successfully');
    return true;
  } catch (e) {
    console.error('Error saving token:', e);
    return false;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    console.log('Getting token from storage...');
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    console.log('Retrieved token:', token ? 'Token exists' : 'No token found');
    return token;
  } catch (e) {
    console.error('Error getting token:', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Error removing token:', e);
  }
};
