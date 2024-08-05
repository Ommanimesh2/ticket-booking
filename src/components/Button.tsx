import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
interface AppButtonProps {
  onPress: () => void;
  title: string;
  loading: boolean;
  disabled: boolean;
  level: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
  onPress,
  title,
  loading,
  disabled,
  level,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.appButtonContainer,
        {
          backgroundColor: disabled
            ? "gray"
            : level === "secondary"
            ? colors.SECONDARY_BTN
            : colors.PRIMARY,
        },
      ]}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.appButtonText}>{title}</Text>
        {loading && (
          <ActivityIndicator
            style={{ marginLeft: 8, paddingHorizontal: 4 }}
            size="small"
            color="white"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 5,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: "100%",
  },
  appButtonText: {
    fontSize: 16,
    color: colors.WHITE,
    fontWeight: "400",
    fontFamily: fonts.SFPRO,
    alignSelf: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
