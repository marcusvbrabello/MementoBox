import colors from "@theme/colors";
import Constants from "expo-constants";
import { StatusBar as SB } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform, StatusBar as SBRN, View } from "react-native";
import { StatusBarType } from "./types";

export default function StatusBar({
  color = colors.PRIMARY,
  style = "light-content",
}: StatusBarType) {
  useEffect(() => {
    SBRN.setBarStyle(style, true);
  }, []);

  if (Platform.OS === "ios") {
    return (
      <View
        style={{
          height: Constants.statusBarHeight,
          backgroundColor: color,
        }}
      />
    );
  } else {
    return (
      <>
        <SB backgroundColor={color} />
        <View
          style={{
            height: Constants.statusBarHeight,
            backgroundColor: color,
          }}
        />
      </>
    );
  }
}
