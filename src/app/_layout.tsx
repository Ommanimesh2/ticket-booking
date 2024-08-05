import { ActivityIndicator, View } from "react-native";
import { Slot } from "expo-router";
import { RecoilRoot } from "recoil";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { Suspense } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
export default function Layout() {
  const fontsLoaded = useCustomFonts();
  console.log("fonts load", fontsLoaded);

  if (!fontsLoaded) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootSiblingParent>
        <RecoilRoot>
          <Suspense
            fallback={<ActivityIndicator size="large" color="#0000ff" />}
          >
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="guest" />
              <Stack.Screen name="admin/index" />
            </Stack>
          </Suspense>
        </RecoilRoot>
      </RootSiblingParent>
    </SafeAreaView>
  );
}
