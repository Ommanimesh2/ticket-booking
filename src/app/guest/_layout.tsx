import { View } from "react-native";
import { Slot } from "expo-router";
import { RecoilRoot } from "recoil";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="events/index" options={{}} />
      <Stack.Screen name="events/[id]" options={{}} />
      <Stack.Screen name="questions/index" options={{}} />
    </Stack>
  );
}
