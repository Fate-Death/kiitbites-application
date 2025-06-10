// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   Dimensions,
// } from "react-native";
// import TeamCard from "@/app/components/TeamCard"
// import SkeletonCard from "@/app/components/SkeletonCard"
// import { Animated } from "react-native";

// interface TeamMember {
//   name: string;
//   image: string;
//   github: string;
//   linkedin: string;
// }


// const TeamPage: React.FC = () => {
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/team`)
//       .then((res) => res.json())
//       .then((data: TeamMember[]) => {
//         setTeamMembers(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error loading team data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const renderItem = ({ item, index }: { item: TeamMember; index: number }) => {
//     const animation = new Animated.Value(0);

//     useEffect(() => {
//       Animated.timing(animation, {
//         toValue: 1,
//         duration: 800,
//         delay: index * 150,
//         useNativeDriver: true,
//       }).start();
//     }, []);

//     const translateX = animation.interpolate({
//       inputRange: [0, 1],
//       outputRange: [index < teamMembers.length / 2 ? -200 : 200, 0],
//     });

//     return (
//       <Animated.View style={{ opacity: animation, transform: [{ translateX }] }}>
//         <TeamCard {...item} />
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Meet Our Team</Text>
//       {loading ? (
//         <View style={styles.skeletonWrapper}>
//           {[...Array(6)].map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </View>
//       ) : (
//         <FlatList
//           data={teamMembers}
//           renderItem={renderItem}
//           keyExtractor={(_, index) => index.toString()}
//           numColumns={2}
//           columnWrapperStyle={styles.row}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//     </View>
//   );
// };

// export default TeamPage;

// const styles = StyleSheet.create({
//    container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     backgroundColor: "#f0f4f8",
//   },
//   title: {
//     color: "#4ea199",
//     fontSize: 32,
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   box: {
//     backgroundColor: "white",
//     padding: 30,
//     borderRadius: 15,
//     marginTop: 50,
//     width: "90%",
//     maxWidth: 1100,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     alignItems: "center",
//   },
//   listContainer: {
//     paddingTop: 10,
//     paddingHorizontal: 20,
//     width: "100%",
//   },
//   row: {
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   skeletonWrapper: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: 24,
//   },
// });
