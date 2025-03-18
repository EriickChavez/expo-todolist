import { LOTTIES } from "@/constants/constants";
import LocalizationService from "@/utils/LocalizationService";

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import useTheme from "@/hook/useTheme";
interface EmptyTaskProps {}

const EmptyTaskList: React.FC<EmptyTaskProps> = ({}) => {
  const themes = useTheme();

  return (
    <View>
      <LottieView
        style={styles.lottie}
        autoPlay
        loop
        resizeMode={"contain"}
        source={LOTTIES.EMPTY_LIST}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: themes.colors.text }]}>
          {LocalizationService.empty.title}
        </Text>
        <Text style={[styles.subtext, { color: themes.colors.subtext }]}>
          {LocalizationService.empty.subtext}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: "100%",
    height: RFValue(250),
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  subtext: {
    fontSize: RFValue(12),
  },
});

export default EmptyTaskList;
