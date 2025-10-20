import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/components/ThemeContext";
import ProgressBar from "@/components/ProgressBar";
import { storedQuestions } from "@/data/questions";

const questions = storedQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);

export default function Quiz() {
  const router = useRouter();
  const { themeStyles } = useTheme();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (selected) => {
    const question = questions[current];
    setAnswers((prev) => [
      ...prev,
      {
        question: question.question,
        selectedOption: selected,
        correctOption: question.correct,
      },
    ]);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const score =
        answers.filter((a) => a.selectedOption === a.correctOption).length +
        (selected === question.correct ? 1 : 0);
      router.push({
        pathname: "/result",
        params: {
          score,
          total: questions.length,
          results: JSON.stringify([
            ...answers,
            {
              question: question.question,
              selectedOption: selected,
              correctOption: question.correct,
            },
          ]),
        },
      });
    }
  };

  const q = questions[current];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeStyles.background,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: themeStyles.text,
          fontSize: 18,
          marginBottom: 10,
          opacity: 0.7,
        }}
      >
        Question {current + 1} of {questions.length}
      </Text>

      <View style={{ marginBottom: 30 }}>
        <Text
          style={{
            color: themeStyles.text,
            fontSize: 22,
            fontWeight: "600",
            marginBottom: 20,
          }}
        >
          {q.question}
        </Text>

        {q.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswer(option)}
            style={{
              backgroundColor: themeStyles.card,
              padding: 14,
              borderRadius: 10,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "#2563eb44",
            }}
          >
            <Text style={{ color: themeStyles.text }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ProgressBar progress={(current + 1) / questions.length} />
    </View>
  );
}
