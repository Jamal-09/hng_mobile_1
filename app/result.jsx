import { useTheme } from "@/components/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Result() {
  const { themeStyles } = useTheme();
  const router = useRouter();
  const { score, total, results } = useLocalSearchParams();
  const parsedResults = results ? JSON.parse(results) : [];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: themeStyles.background,
        padding: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ alignItems: "center", marginBottom: 25 }}>
        <Text
          style={{
            color: themeStyles.text,
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          🎉 Quiz Complete!
        </Text>
        <Text
          style={{
            color: themeStyles.text,
            fontSize: 18,
            opacity: 0.8,
          }}
        >
          You scored {score}/{total}
        </Text>
      </View>

      {parsedResults.map((item, index) => {
        const isCorrect = item.selectedOption === item.correctOption;
        return (
          <View
            key={index}
            style={{
              backgroundColor: isCorrect ? "#16a34a22" : "#dc262622",
              borderLeftWidth: 5,
              borderLeftColor: isCorrect ? "#16a34a" : "#dc2626",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: themeStyles.text,
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              Q{index + 1}. {item.question}
            </Text>

            <Text
              style={{
                color: isCorrect ? "#16a34a" : "#dc2626",
                fontWeight: "600",
              }}
            >
              Your Answer: {item.selectedOption}
            </Text>

            {!isCorrect && (
              <Text style={{ color: "#16a34a", marginTop: 3 }}>
                Correct Answer: {item.correctOption}
              </Text>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{
          marginTop: 30,
          marginBottom: 30,
          backgroundColor: "#2563eb",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Take Quiz Again 🔁
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
