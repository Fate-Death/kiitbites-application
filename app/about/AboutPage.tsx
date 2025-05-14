
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

export default function AboutUs() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>

        <Text style={styles.subheading}>About Us</Text>
        <Text style={styles.description}>
          Welcome to <Text style={styles.bold}>KIITBites</Text>. We are dedicated to providing a seamless and efficient food ordering experience for students and staff.
        </Text>

        <View style={styles.section}>
          <Text style={styles.subheading}>Our Mission</Text>
          <Text style={styles.text}>
            At <Text style={styles.bold}>KIITBites</Text>, our goal is to make food ordering easy, fast, and reliable while ensuring quality service for everyone.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>What We Offer</Text>
          <Text style={styles.text}>Fast and convenient food ordering system.</Text>
          <Text style={styles.text}>Easy pickup process without long waiting times.</Text>
          <Text style={styles.text}>Transparent policies to ensure fair usage.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any queries or feedback, feel free to reach out via our <Text style={styles.link} onPress={()=>router.push('/help/HelpForm')}>Contact Us</Text> {''}page.
          </Text>
        </View>

        <Text style={styles.footer}>
          Thank you for choosing <Text style={styles.bold}>KIITBites</Text>. We look forward to serving you!
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 20,
  },
  
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  link:{
    color:"#007AFF"

  },
  section: {
    backgroundColor: "#F8FAFB",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#2E9C92",
  },
  subheading: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2E9C92",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 6,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    color: "#777",
    fontSize: 14,
  },
});
