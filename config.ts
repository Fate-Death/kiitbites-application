import Constants from 'expo-constants';

export const config = {
  backendUrl: Constants.expoConfig?.extra?.backendUrl || 'http://fatedeath.ddns.net:5001'
}; 