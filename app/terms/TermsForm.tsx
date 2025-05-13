

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

        <Text style={styles.subheading}>Term & Conditions</Text>
        <Text style={styles.description}>
        Welcome to <Text style= {styles.bold}>KIITBites</Text>. By using our services, you
          agree to the following terms and conditions. Please read them
          carefully.
        </Text>

       

        <View style={styles.section}>
          <Text style={styles.subheading}>1. Account Registration and User Information</Text>
          <Text style={styles.text}> Users must provide accurate and truthful information during
          signup.</Text>
          <Text style={styles.text}>Once registered, users <Text style={styles.bold1}>cannot</Text> modify their
              personal details (such as name, contact information, or other credentials). If you face any issues, kindly reach out via the {''} <Text style={styles.link} onPress={()=>router.push('/help/HelpForm')}>Contact Us</Text> {''}page.</Text>
          <Text style={styles.text}> Users must not misrepresent their <Text style={styles.bold1}>gender</Text> or any
          other personal details.</Text>
        </View>



        <View style={styles.section}>
          <Text style={styles.subheading}>2. Order and Pickup Regulations</Text>
          <Text style={styles.text}> Users must ensure they pick up their orders on time</Text>
          <Text style={styles.text}>  Excessive ordering without collecting food is prohibited. Repeat
          offenders may face penalties, including account suspension.</Text>
          <Text style={styles.text}>  Orders once placed <Text style={styles.bold1}>cannot</Text> be canceled or
          refunded.</Text>
         
        </View>


        <View style={styles.section}>
          <Text style={styles.subheading}>3. Prohibited Activities</Text>
           <Text style={styles.text}>  Users must not create fake profiles or register on behalf of
              someone else. Strict action, including a ban, will be taken
              against violators.</Text>
            <Text style={styles.text}>Any fraudulent activity, including using multiple accounts to
            bypass system limitations, will lead to penalties.</Text>
           
        </View>



        <View style={styles.section}>
          <Text style={styles.subheading}>4. Violations and Penalties</Text>
           <Text style={styles.text}> Violating any of the above terms may result in a{" "}
           <Text style={styles.bold1}>temporary or permanent</Text> ban from KIITBites.</Text>
            <Text style={styles.text}>  For any disputes or queries, please visit our {''} <Text style={styles.link} onPress={()=>router.push('/help/HelpForm')}>Contact Us</Text> {''}page.</Text>
           
        </View>

      
<Text style={styles.description}>
       

          By using KIITBites, you agree to abide by these terms. We reserve the
          right to update these terms at any time.
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
  bold1:{
    
    color:"#2E9C92",
  },
  link:{
    color:"#007AFF"

  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    color: "#777",
    fontSize: 14,
  },
});
