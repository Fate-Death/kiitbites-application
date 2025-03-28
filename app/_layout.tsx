import { Redirect, Stack } from "expo-router";
  
export default function RootLayout() {
 //return <Stack screenOptions={{headerShown:false}}/>;
  return(
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="LoginScreen"/>
    </Stack>
  );
} 

