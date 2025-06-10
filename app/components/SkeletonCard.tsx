// import React, { useEffect, useRef } from "react";
// import { View, StyleSheet, Animated, Dimensions } from "react-native";
// import LinearGradient from "react-native-linear-gradient";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// const SkeletonShimmer: React.FC<{ style: any }> = ({ style }) => {
//   const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(translateX, {
//         toValue: SCREEN_WIDTH,
//         duration: 1200,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, []);

//   return (
//     <View style={[styles.shimmerBase, style]}>
//       <Animated.View
//         style={[
//           StyleSheet.absoluteFill,
//           {
//             transform: [{ translateX }],
//           },
//         ]}
//       >
//         <LinearGradient
//           colors={["#e0e0e0", "#f0f0f0", "#e0e0e0"]}
//           start={{ x: 0, y: 0.5 }}
//           end={{ x: 1, y: 0.5 }}
//           style={StyleSheet.absoluteFill}
//         />
//       </Animated.View>
//     </View>
//   );
// };

// const SkeletonCard: React.FC = () => {
//   return (
//     <View style={styles.card}>
//       <SkeletonShimmer style={styles.skeletonImage} />
//       <SkeletonShimmer style={styles.skeletonText} />
//       <SkeletonShimmer style={styles.skeletonLinks} />
//     </View>
//   );
// };

// export default SkeletonCard;

// const styles = StyleSheet.create({
//   card: {
//     width: "100%",
//     maxWidth: 350,
//     padding: 20,
//     borderRadius: 15,
//     backgroundColor: "#f0f0f0",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 6 },
//     elevation: 5,
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 15,
//     margin: 10,
//   },
//   shimmerBase: {
//     overflow: "hidden",
//     backgroundColor: "#e0e0e0",
//   },
//   skeletonImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   skeletonText: {
//     width: "80%",
//     height: 20,
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   skeletonLinks: {
//     width: "50%",
//     height: 20,
//     borderRadius: 5,
//   },
// });
