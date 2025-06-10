import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { ChevronRight, ChevronDown, Plus, Minus } from "lucide-react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-toastify/dist/ReactToastify.css';
import { Ionicons } from "@expo/vector-icons";
import { getToken, removeToken } from "../../utils/storage";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:5001";

// Interfaces
interface FoodItem {
  _id: string;
  name: string;
  type: string;
  uniId: string;
  unit?: string;
  price: number;
  image: string;
  isSpecial: string;
  kind: string;
  vendorId: string;
  vendorName?: string;
}

interface College {
  _id: string;
  fullName: string;
  shortName: string;
}

interface Vendor {
  _id: string;
  name: string;
  price: number;
  inventoryValue: {
    price: number;
    quantity: number;
    isAvailable?: string;
  };
}

interface User {
  _id: string;
  name: string;
}

interface CartItem {
  _id: string;
  quantity: number;
  kind: string;
  vendorId: string;
  vendorName: string;
}

interface CartResponseItem {
  itemId: string;
  quantity: number;
  kind: string;
  vendorId: string;
  vendorName: string;
}

const categories = {
  produce: ["combos-veg", "combos-nonveg", "veg", "shakes", "juices", "soups", "non-veg"],
  retail: ["biscuits", "chips", "icecream", "drinks", "snacks", "sweets", "nescafe"],
};

const FavouriteFoodPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [favorites, setFavorites] = useState<FoodItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<{ [key: string]: string }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentVendorId, setCurrentVendorId] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getAuthToken = async () => {
    try {
      return await getToken();
    } catch (error) {
      console.error("Error getting token from storage:", error);
      return null;
    }
  };

  const getAuthConfig = async () => {
    const token = await getAuthToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Fetch user
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setCheckingAuth(true);
        const token = await getAuthToken();
        if (!token) {
          setIsAuthenticated(false);
          router.push("/login/LoginForm");
          return;
        }
        const response = await axios.get(`${BACKEND_URL}/api/user/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching user details:", error);
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          await removeToken();
          setIsAuthenticated(false);
          router.push("/login/LoginForm");
        }
      } finally {
        setCheckingAuth(false);
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch colleges
  useEffect(() => {
    const fetchColleges = async () => {
      if (!isAuthenticated) return;
      try {
        const config = await getAuthConfig();
        const response = await axios.get(`${BACKEND_URL}/api/user/auth/list`, config);
        setColleges(response.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };
    fetchColleges();
  }, [isAuthenticated]);

  // Fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !user?._id) return;
      try {
        setLoading(true);
        const config = await getAuthConfig();
        const url = selectedCollege
          ? `${BACKEND_URL}/fav/${user._id}/${selectedCollege._id}`
          : `${BACKEND_URL}/fav/${user._id}`;
        const response = await axios.get(url, config);
        setFavorites(response.data.favourites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user?._id, selectedCollege, isAuthenticated]);

  // Fetch vendors
  useEffect(() => {
    const fetchVendors = async () => {
      if (!isAuthenticated || colleges.length === 0) return;
      try {
        const config = await getAuthConfig();
        if (selectedCollege) {
          const response = await axios.get(
            `${BACKEND_URL}/api/vendor/list/uni/${selectedCollege._id}`,
            config
          );
          const vendorsMap = response.data.reduce((acc: { [key: string]: string }, vendor: Vendor) => {
            acc[vendor._id] = vendor.name;
            return acc;
          }, {});
          setVendors(vendorsMap);
        } else {
          const vendorPromises = colleges.map((college) =>
            axios.get(`${BACKEND_URL}/api/vendor/list/uni/${college._id}`, config)
          );
          const responses = await Promise.all(vendorPromises);
          const allVendors = responses.flatMap((res) => res.data);
          const vendorsMap = allVendors.reduce((acc: { [key: string]: string }, vendor: Vendor) => {
            if (!acc[vendor._id]) acc[vendor._id] = vendor.name;
            return acc;
          }, {});
          setVendors(vendorsMap);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, [selectedCollege, colleges, isAuthenticated]);

  // Fetch cart
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isAuthenticated || !user?._id) return;
      try {
        const config = await getAuthConfig();
        const response = await axios.get(`${BACKEND_URL}/cart/${user._id}`, config);
        const cartData = response.data.cart || [];
        const formattedCartItems = cartData.map((item: CartResponseItem) => ({
          _id: item.itemId,
          quantity: item.quantity,
          kind: item.kind,
          vendorId: item.vendorId || response.data.vendorId,
          vendorName: item.vendorName || response.data.vendorName,
        }));
        setCartItems(formattedCartItems);
        if (formattedCartItems.length > 0) {
          setCurrentVendorId(formattedCartItems[0].vendorId);
        } else {
          setCurrentVendorId(null);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [user?._id, isAuthenticated]);

  // Handle URL query parameter on initial load
  useEffect(() => {
    const collegeId = searchParams.college as string;
    if (collegeId && colleges.length > 0) {
      const college = colleges.find((c) => c._id === collegeId);
      if (college) setSelectedCollege(college);
    } else {
      setSelectedCollege(null);
    }
  }, [searchParams, colleges]);

  const handleCollegeSelect = (college: College | null) => {
    setSelectedCollege(college);
    const updatedParams = { ...searchParams };
    if (college) {
      updatedParams.college = college._id;
    } else {
      delete updatedParams.college;
    }
    router.replace({
      pathname: '/fav/FavouritePage',
      params: updatedParams,
    });
    setIsDropdownOpen(false);
  };

  const checkVendorAvailability = async (vendorId: string, itemId: string, itemType: string) => {
    try {
      const isRetail = categories.retail.includes(itemType);
      const isProduce = categories.produce.includes(itemType);
      const token = await getAuthToken();
      const response = await fetch(`${BACKEND_URL}/items/vendors/${itemId}`, {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        return false;
      }
      const vendors = await response.json() as Vendor[];
      const vendor = vendors.find((v) => v._id === vendorId);
      if (!vendor || !vendor.inventoryValue) {
        return false;
      }
      if (isRetail) {
        const quantity = vendor.inventoryValue.quantity;
        return typeof quantity === 'number' && quantity > 0;
      } else if (isProduce) {
        return vendor.inventoryValue.isAvailable === 'Y';
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const getVendorName = (vendorId: string): string => {
    if (!vendorId || typeof vendorId !== 'string') {
      return "Unknown Vendor";
    }
    const vendorName = vendors[vendorId];
    if (!vendorName) {
      return "Unknown Vendor";
    }
    return vendorName;
  };

  const handleAddToCart = async (foodItem: FoodItem) => {
    if (!user?._id) {
      router.push("/login/LoginForm");
      return;
    }

    try {
      if (currentVendorId && currentVendorId !== foodItem.vendorId) {
        Toast.show({
          type: "error",
          text1: "Vendor Conflict",
          text2: "Add items from the same vendor only. Please clear your cart first.",
        });
        return;
      }

      const isVendorAvailable = await checkVendorAvailability(
        foodItem.vendorId,
        foodItem._id,
        foodItem.type
      );

      if (!isVendorAvailable) {
        Toast.show({
          type: "error",
          text1: "Item Unavailable",
          text2: "This item is currently unavailable. Try again later.",
        });
        return;
      }

      const existingItem = cartItems.find(
        (item) =>
          item._id === foodItem._id && item.vendorId === foodItem.vendorId
      );

      if (existingItem) {
        await axios.post(
          `${BACKEND_URL}/cart/add-one/${user._id}`,
          {
            itemId: foodItem._id,
            kind: foodItem.kind,
            vendorId: foodItem.vendorId,
          },
          await getAuthConfig()
        );
      } else {
        await axios.post(
          `${BACKEND_URL}/cart/add/${user._id}`,
          {
            itemId: foodItem._id,
            kind: foodItem.kind,
            quantity: 1,
            vendorId: foodItem.vendorId,
          },
          await getAuthConfig()
        );
      }

      const response = await axios.get(
        `${BACKEND_URL}/cart/${user._id}`,
        await getAuthConfig()
      );

      const cartData = response.data.cart || [];

      const formattedCartItems = cartData.map((item: CartResponseItem) => ({
        _id: item.itemId,
        quantity: item.quantity,
        kind: item.kind,
        vendorId: foodItem.vendorId,
        vendorName: foodItem.vendorName || getVendorName(foodItem.vendorId),
      }));

      setCartItems(formattedCartItems);

      if (!currentVendorId) {
        setCurrentVendorId(foodItem.vendorId);
      }

      Toast.show({
        type: "success",
        text1: "Added to Cart",
        text2: `${foodItem.name} has been added successfully.`,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const errorMsg = error.response.data.message;

        if (errorMsg.includes("max quantity")) {
          Toast.show({
            type: "info",
            text1: "Limit Reached",
            text2: `Maximum limit reached for ${foodItem.name}`,
          });
        } else if (errorMsg.includes("Only")) {
          const available = errorMsg.split("Only ")[1];
          Toast.show({
            type: "info",
            text1: "Limited Availability",
            text2: `Only ${available} available for ${foodItem.name}`,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: errorMsg,
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: "Failed to add item to cart",
        });
      }
    }
  };

  const handleIncreaseQuantity = async (foodItem: FoodItem) => {
    if (!user?._id) return;

    try {
      const isVendorAvailable = await checkVendorAvailability(
        foodItem.vendorId,
        foodItem._id,
        foodItem.type
      );
      if (!isVendorAvailable) {
        Toast.show({
          type: "error",
          text1: "Item Unavailable",
          text2: "This item is currently unavailable. Try again later."
        });
        return;
      }

      const config = await getAuthConfig();

      await axios.post(
        `${BACKEND_URL}/cart/add-one/${user._id}`,
        {
          itemId: foodItem._id,
          kind: foodItem.kind,
          vendorId: foodItem.vendorId
        },
        config
      );

      const response = await axios.get(`${BACKEND_URL}/cart/${user._id}`, config);
      const cartData = response.data.cart || [];

      const formattedCartItems = cartData.map((item: CartResponseItem) => ({
        _id: item.itemId,
        quantity: item.quantity,
        kind: item.kind,
        vendorId: foodItem.vendorId,
        vendorName: foodItem.vendorName || getVendorName(foodItem.vendorId)
      }));

      setCartItems(formattedCartItems);

      Toast.show({
        type: "success",
        text1: "Quantity Increased",
        text2: `Increased quantity of ${foodItem.name}`
      });

    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const errorMsg = error.response.data.message;

        if (errorMsg.includes("max quantity")) {
          Toast.show({
            type: "info",
            text1: "Limit Reached",
            text2: `Maximum limit reached for ${foodItem.name}`
          });
        } else if (errorMsg.includes("Only")) {
          const available = errorMsg.split("Only ")[1];
          Toast.show({
            type: "info",
            text1: "Limited Availability",
            text2: `Only ${available} available for ${foodItem.name}`
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: errorMsg
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: "Failed to increase quantity"
        });
      }
    }
  };

  const handleDecreaseQuantity = async (foodItem: FoodItem) => {
    if (!user?._id) return;
    const config = await getAuthConfig();

    try {
      await axios.post(
        `${BACKEND_URL}/cart/remove-one/${user._id}`,
        {
          itemId: foodItem._id,
          kind: foodItem.kind,
          vendorId: foodItem.vendorId
        },
        config
      );

      const response = await axios.get(
        `${BACKEND_URL}/cart/${user._id}`,
        await getAuthConfig()
      );

      const cartData = response.data.cart || [];

      const formattedCartItems = cartData.map((item: CartResponseItem & { vendorId: string }) => ({
        _id: item.itemId,
        quantity: item.quantity,
        kind: item.kind,
        vendorId: item.vendorId,
        vendorName: getVendorName(item.vendorId)
      }));

      setCartItems(formattedCartItems);

      if (formattedCartItems.length === 0) {
        setCurrentVendorId(null);
      }

      Toast.show({
        type: 'info',
        text1: `Decreased quantity of ${foodItem.name}`,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: "Failed to decrease quantity",
        });
      }
    }
  };

  const clearCart = async () => {
    if (!user?._id) {
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/cart/clear/${user._id}`,
        {},
        await getAuthConfig()
      );

      setCartItems([]);
      setCurrentVendorId(null);
      Toast.show({
        type: "success",
        text1: "Cart cleared successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: "Failed to clear cart"
      });
    }
  };

  const isCartEmpty = () => {
    return cartItems.length === 0;
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Toast />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#4ea199" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Favorites</Text>
        {!isCartEmpty() && (
          <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
            <Text style={styles.clearCartButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        )}
      </View>

      {checkingAuth ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : !isAuthenticated ? (
        <View style={styles.centered}>
          <Text>Please log in to view your favorites</Text>
        </View>
      ) : (
        <>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedCollege ? selectedCollege.fullName : "Select your college"}
              </Text>
              <ChevronDown
                size={20}
                style={{
                  transform: [{ rotate: isDropdownOpen ? "180deg" : "0deg" }],
                }}
              />
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => handleCollegeSelect(null)}
                >
                  <Text style={styles.dropdownItemText}>All Colleges</Text>
                  <ChevronRight size={16} />
                </Pressable>
                {colleges.map((college) => (
                  <Pressable
                    key={college._id}
                    style={styles.dropdownItem}
                    onPress={() => handleCollegeSelect(college)}
                  >
                    <Text style={styles.dropdownItemText}>{college.fullName}</Text>
                    <ChevronRight size={16} />
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.collegeHeader}>
            <Text style={styles.collegeName}>
              {selectedCollege ? selectedCollege.fullName : "All Colleges"}
            </Text>
            <Text style={styles.subTitle}>Your Favorites</Text>
          </View>

          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : favorites.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Oops! You have no favorites yet</Text>
              <Text style={styles.emptySubtitle}>
                Start adding your favorite items to see them here!
              </Text>
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => router.push("/")}
              >
                <Text style={styles.homeButtonText}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.foodGrid}>
              {favorites.map((food) => {
                const matchingCartItem = cartItems.find(
                  (item) => item._id === food._id && item.vendorId === food.vendorId
                );

                const quantity = matchingCartItem?.quantity || 0;
                const isSameVendor = !currentVendorId || currentVendorId === food.vendorId;
                const isInCart = quantity > 0;

                return (
                  <View key={`${food._id}-${food.vendorId}`} style={styles.foodCard}>
                    <Image
                      source={{ uri: food.image }}
                      style={styles.foodImage}
                      resizeMode="cover"
                    />
                    {!selectedCollege && (
                      <View style={styles.collegeTag}>
                        <Text style={styles.collegeTagText}>
                          {colleges.find((c) => c._id === food.uniId)?.fullName}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.vendorName}>
                      {food.vendorName || "Unknown Vendor"}
                    </Text>
                    <Text style={styles.foodPrice}>₹{food.price}</Text>
                    {isInCart && isSameVendor ? (
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => handleDecreaseQuantity(food)}
                        >
                          <Minus size={16} />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => handleIncreaseQuantity(food)}
                        >
                          <Plus size={16} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.addToCartButton,
                          !isSameVendor && styles.disabledButton
                        ]}
                        onPress={() => handleAddToCart(food)}
                        disabled={!isSameVendor}
                      >
                        <Text style={[
                          styles.addToCartText,
                          !isSameVendor && styles.disabledButtonText
                        ]}>
                          {!isSameVendor ? "Different Vendor" : "Add to Cart"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#4ea199',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4ea199',
  },
  clearCartButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  clearCartButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  dropdownContainer: {
    maxWidth: 600,
    alignSelf: 'center',
    marginBottom: 24,
  },
  dropdownButton: {
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: '#d1d5db',
    borderWidth: 1,
    maxHeight: 250,
    zIndex: 50,
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },
  collegeHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  collegeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4ea199',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  foodCard: {
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 1,
  },
  collegeTag: {
    backgroundColor: '#4ea199',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  collegeTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ea199',
  },
  addToCartButton: {
    marginTop: 12,
    backgroundColor: '#4ea199',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quantityControls: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4ea199',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
    color: '#1f2937',
  },
  emptyState: {
    marginTop: 48,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  homeButton: {
    marginTop: 16,
    backgroundColor: '#4ea199',
    padding: 12,
    borderRadius: 8,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledButtonText: {
    color: '#999',
  },
});

export default FavouriteFoodPageContent;