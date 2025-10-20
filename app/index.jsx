import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/components/ThemeContext";

export default function Home() {
  const router = useRouter();
  const { themeStyles } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeStyles.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: themeStyles.text,
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        ⚡ Tech Quiz Challenge
      </Text>
      <Text
        style={{
          color: themeStyles.text,
          textAlign: "center",
          marginBottom: 30,
          opacity: 0.7,
        }}
      >
        Test your tech knowledge in 10 quick questions!
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/quiz")}
        style={{
          backgroundColor: "#2563eb",
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Start Quiz 🚀
        </Text>
      </TouchableOpacity>
    </View>
  );
}
