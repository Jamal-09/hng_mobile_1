import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import "@/globals.css";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";

const HeaderRight = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      {theme === "light" ? (
        <Ionicons name="moon" color="#0f172a" size={24} />
      ) : (
        <Ionicons name="sunny" color="#f9fafb" size={24} />
      )}
    </TouchableOpacity>
  );
};

function LayoutScreens() {
  const { themeStyles } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeStyles.background }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: themeStyles.card },
          headerTintColor: themeStyles.text,
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => <HeaderRight />,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Tech Quiz" }} />
        <Stack.Screen name="quiz" options={{ title: "Quiz" }} />
        <Stack.Screen name="result" options={{ title: "Results" }} />
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutScreens />
    </ThemeProvider>
  );
}
