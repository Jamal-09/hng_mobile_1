import ProgressBar from "@/components/ProgressBar";
import { useTheme } from "@/components/ThemeContext";
import { storedQuestions } from "@/data/questions";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const questions = storedQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);

export default function Quiz() {
  const router = useRouter();
  const { themeStyles } = useTheme();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const q = questions[current];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = (auto = false) => {
    const updatedAnswers = [...answers];
    const question = questions[current];

    updatedAnswers[current] = {
      question: question.question,
      selectedOption: auto ? "Unanswered" : selected || "Unanswered",
      correctOption: question.correct,
    };

    setAnswers(updatedAnswers);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setTimeLeft(15);
    } else {
      const score = updatedAnswers.filter(
        (a) => a.selectedOption === a.correctOption
      ).length;

      router.push({
        pathname: "/result",
        params: {
          score,
          total: questions.length,
          results: JSON.stringify(updatedAnswers),
        },
      });
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1]?.selectedOption || null);
      setTimeLeft(15);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeStyles.background,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            color: themeStyles.text,
            fontSize: 18,
            opacity: 0.7,
          }}
        >
          Question {current + 1} of {questions.length}
        </Text>

        <Text
          style={{
            color: timeLeft <= 5 ? "tomato" : themeStyles.text,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 4,
          }}
        >
          Time Left: {timeLeft}s
        </Text>
      </View>

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

        {q.options.map((option, index) => {
          const isSelected = selected === option;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              style={{
                backgroundColor: isSelected ? "#2563eb" : themeStyles.card,
                padding: 14,
                borderRadius: 10,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: isSelected ? "#2563eb" : "#2563eb44",
              }}
            >
              <Text
                style={{
                  color: isSelected ? "#fff" : themeStyles.text,
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {current > 0 ? (
          <TouchableOpacity
            onPress={handlePrevious}
            style={{
              backgroundColor: "#6b7280",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Previous</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        <TouchableOpacity
          onPress={() => handleNext(false)}
          style={{
            backgroundColor: "#2563eb",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            {current + 1 === questions.length ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <ProgressBar progress={(current + 1) / questions.length} />
      </View>
    </View>
  );
}
