import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { answersState, questionsQuery } from "../state/answersState";
import { ImageBackground } from "expo-image";
import { AppButton } from "@/components/Button";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { currentEventSelector } from "../state/currentEventIdState";
import { submitTicketRequest } from "@/api/mutationMethods";
import { useRouter } from "expo-router";
import { currentTicketStatus } from "../state/ticketStatusState";

const QuestionsComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useRecoilState(answersState);
  const currentEvent = useRecoilValue(currentEventSelector);
  const questions = useRecoilValue(questionsQuery(currentEvent?.id));
  const userId = "XDTHDEKDF4123"; // Replace with user Id after auth
  const router = useRouter();
  const [ticketState, setTicketState] = useRecoilState(currentTicketStatus);
  const handleAnswerChange = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = async () => {
    const currentAnswer = answers[currentQuestionIndex];

    if (currentAnswer === undefined || currentAnswer === "") {
      Alert.alert("Please answer the current question before proceeding.");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const updatedResponses = questions.map((question, index) => ({
        question: question.question,
        answer: answers[index] || [],
      }));
      const payload = {
        userId: userId,
        responses: updatedResponses,
        ticketStatus: "waiting",
        event: currentEvent?.id,
      };
      await submitTicketRequest(payload);
      setTicketState("waiting");
      router.push(`/guest/events/${currentEvent?.id}`);
      console.log(payload);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === "single") {
      return (
        <TextInput
          style={styles.input}
          placeholderTextColor={"#6C63FF"}
          onChangeText={handleAnswerChange}
          value={answers[currentQuestionIndex] || ""}
          placeholder="Write your answer here"
        />
      );
    } else if (currentQuestion.type === "multiple") {
      return currentQuestion.options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              const selectedOptions = answers[currentQuestionIndex] || [];
              const updatedOptions = selectedOptions.includes(option)
                ? selectedOptions.filter((opt) => opt !== option)
                : [...selectedOptions, option];
              handleAnswerChange(updatedOptions);
            }}
          >
            <Text style={styles.optionButtonText}>{option}</Text>
            {answers[currentQuestionIndex]?.includes(option) && (
              <Ionicons
                name="checkmark-circle-sharp"
                size={24}
                color="#8D86FE"
                style={styles.optionIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      ));
    } else if (currentQuestion.type === "boolean") {
      return (
        <View style={styles.booleanContainer}>
          <TouchableOpacity
            style={[styles.optionButton]}
            onPress={() => handleAnswerChange(true)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
            {answers[currentQuestionIndex] === true && (
              <Ionicons
                name="checkmark-circle-sharp"
                size={24}
                color="#8D86FE"
                style={styles.optionIcon}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton]}
            onPress={() => handleAnswerChange(false)}
          >
            <Text style={styles.optionButtonText}>No</Text>
            {answers[currentQuestionIndex] === false && (
              <Ionicons
                name="checkmark-circle-sharp"
                size={24}
                color="#8D86FE"
                style={styles.optionIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../../../assets/questionsBg.png")}
        contentFit="cover"
        transition={1000}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Text style={styles.question}>
            {questions[currentQuestionIndex].question}
          </Text>
          {renderQuestion()}
        </View>
        <AppButton
          title={
            currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Claim Ticket"
          }
          onPress={handleNextQuestion}
          loading={false}
          disabled={false}
          level={""}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    padding: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginRight: 10,
  },
  optionButton: {
    width: "100%",
    backgroundColor: colors.TRANSPARENT,
    padding: 20,
    rowGap: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionButtonText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontFamily: fonts.SFPRO,
    color: colors.TEXT,
  },
  optionIcon: {
    position: "absolute",
    right: 20,
  },
  questionContainer: {
    marginTop: 60,
    width: "100%",
  },
  questionNumber: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.SFPROMEDIUM,
    color: colors.PRIMARY,
    textTransform: "uppercase",
  },
  question: {
    fontSize: 26,
    fontFamily: fonts.SFPROBOLD,
    marginBottom: 20,
    color: colors.BLACK,
  },
  input: {
    padding: 10,
    fontSize: 26,
    marginBottom: 20,
    fontFamily: fonts.SFPROMEDIUM,
    color: colors.PRIMARY,
    backgroundColor: colors.TRANSPARENT,
  },
  booleanContainer: {
    flexDirection: "column",
    rowGap: 15,
    width: "100%",
  },
  booleanButton: {
    width: "48%",
    backgroundColor: colors.TRANSPARENT,
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBooleanButton: {
    backgroundColor: colors.SELECTED_OPTION,
  },
  booleanButtonText: {
    fontSize: 20,
    fontFamily: fonts.SFPRO,
    color: colors.TEXT,
  },
  booleanIcon: {
    marginLeft: 10,
  },
});
export default QuestionsComponent;
