import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index" options={{ title: "Post list", tabBarIcon: ({focused}) => (<Ionicons name={focused? "list-circle" : "list-circle-outline"}/>)}}></Tabs.Screen>
      <Tabs.Screen name="details" options={{ title: "Details", tabBarIcon: ({focused}) => (<Ionicons name={focused? "library" : "library-outline"}/>)}}></Tabs.Screen>
    </Tabs>
  )

}
