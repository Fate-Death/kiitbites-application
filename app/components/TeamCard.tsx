// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   Linking,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

// interface TeamCardProps {
//   name: string;
//   image: string;
//   github: string;
//   linkedin: string;
// }

// const TeamCard: React.FC<TeamCardProps> = ({ name, image, github, linkedin }) => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.imageWrapper}>
//         <Image source={{ uri: image }} style={styles.image} />
//       </View>
//       <Text style={styles.name}>{name}</Text>
//       <View style={styles.links}>
//         <TouchableOpacity onPress={() => Linking.openURL(github)}>
//           <Icon name="github" style={styles.icon} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Linking.openURL(linkedin)}>
//           <Icon name="linkedin" style={styles.icon} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#f8f9fa",
//     padding: 20,
//     borderRadius: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     elevation: 8,
//     alignItems: "center",
//     width: "100%",
//     maxWidth: 350,
//     margin: 10,
//   },
//   imageWrapper: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     overflow: "hidden",
//     borderWidth: 3,
//     borderColor: "#4ea199",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#222",
//     marginTop: 12,
//   },
//   links: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 12,
//     gap: 15,
//   },
//   icon: {
//     fontSize: 22,
//     color: "#4ea199",
//     marginHorizontal: 10,
//   },
// });


// export default TeamCard;
