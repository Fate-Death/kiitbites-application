import Constants from 'expo-constants';

export const config = {
  backendUrl: Constants.expoConfig?.extra?.backendUrl || 'http://192.168.1.5:5002'
}; 