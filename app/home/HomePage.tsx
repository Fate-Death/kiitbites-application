import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// Sample food data - replace with your actual data source
const foodItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Chicken Burger',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Caesar Salad',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    name: 'Pasta Alfredo',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1571997470379-6b1b7bf97b4f?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    name: 'Chocolate Brownie',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1564355808529-69d6de5b0531?w=500&auto=format&fit=crop&q=60',
  },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

const HomePage = () => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cart, setCart] = useState<Array<{id: number, quantity: number}>>([]);

  // Initialize quantities to 0 for all items
  useEffect(() => {
    const initialQuantities = foodItems.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {} as Record<number, number>);
    setQuantities(initialQuantities);
  }, []);

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const addToCart = (itemId: number) => {
    if (quantities[itemId] > 0) {
      setCart(prev => {
        const existingItem = prev.find(item => item.id === itemId);
        if (existingItem) {
          return prev.map(item => 
            item.id === itemId 
              ? { ...item, quantity: item.quantity + quantities[itemId] }
              : item
          );
        }
        return [...prev, { id: itemId, quantity: quantities[itemId] }];
      });
      // Reset quantity after adding to cart
      setQuantities(prev => ({
        ...prev,
        [itemId]: 0
      }));
    }
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Specials</Text>
        <View style={styles.cartContainer}>
          <MaterialIcons name="shopping-cart" size={28} color="#4ea199" />
          {getTotalItemsInCart() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItemsInCart()}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
      >
        {foodItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.image} 
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, -1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>{quantities[item.id] || 0}</Text>
                
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.addButton,
                  { opacity: quantities[item.id] > 0 ? 1 : 0.5 }
                ]}
                onPress={() => addToCart(item.id)}
                disabled={quantities[item.id] <= 0}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#4ea199',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#4ea199',
    fontWeight: 'bold',
    lineHeight: 24,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#4ea199',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomePage;
