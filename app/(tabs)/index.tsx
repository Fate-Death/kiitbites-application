import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Welcome Message */}
            <Text style={styles.title}>Welcome to KIITBites</Text>
            <Text style={styles.subtitle}>Order your favorite food hassle-free!</Text>

            {/* Buttons for Login, Signup, and Searching */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.searchButton]}
                onPress={() => navigation.navigate('Search')}>
                <Text style={styles.buttonText}>Start Searching</Text>
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Icon name="account" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                    <Icon name="clipboard-list" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Icon name="cart" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        marginBottom: 30,
    },
    button: {
        width: '80%',
        padding: 12,
        marginVertical: 10,
        backgroundColor: '#007bff',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    searchButton: {
        backgroundColor: '#28a745',
    },
    navBar: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        width: '90%',
        justifyContent: 'space-around',
        backgroundColor: '#343a40',
        padding: 15,
        borderRadius: 25,
    }
});

export default HomePage;
