import { View, Text } from "react-native";
import { Link, useRouter } from "expo-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentEventIdState } from "./guest/state/currentEventIdState";
import { AppButton } from "@/components/Button";
import { fonts } from "@/constants/fonts";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{ flex: 1, justifyContent: "center", rowGap: 30, padding: 40 }}
    >
      <Text style={{ fontFamily: fonts.SFPRO, fontSize: 18 }}>
        Welcome to the Home Page
      </Text>
      <AppButton
        title="Go to Admin Dashboard"
        onPress={() => router.push("/admin")}
        loading={false}
        disabled={false}
        level={""}
      />
      <AppButton
        title="Go to Guest View"
        onPress={() => router.push("/guest/events")}
        loading={false}
        disabled={false}
        level={""}
      />
    </View>
  );
}
