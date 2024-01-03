import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  hasCompleteAll: boolean;
  hasWin: boolean;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  onCompleteQuestions: () => void;
  setWinner: () => void;
  reset: () => void;
}

const API_URL = import.meta.env.PROD
  ? "https://https://javascript-quizz-gilt.vercel.app/"
  : "http://localhost:5173/";

export const useQuestionStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          hasWin: false,
          hasCompleteAll: false,
          fetchQuestions: async (limit: number) => {
            const res = await fetch(`${API_URL}/data.json`);
            const json = await res.json();

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);
            set({ questions, hasCompleteAll: false, hasWin: false}, false, "FETCH_QUESTIONS");
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            // usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions);
            // encontramos el índice de la pregunta
            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            );
            // obtenemos la información de la pregunta
            const questionInfo = newQuestions[questionIndex];
            // averiguamos si el usuario ha seleccionado la respuesta correcta
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;

            if (isCorrectUserAnswer) confetti();

            // cambiar esta información en la copia de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            };
            // actualizamos el estado
            set({ questions: newQuestions }, false, "SELECT_ANSWER");
           
          },
          onCompleteQuestions: () => {
            set({ hasCompleteAll: true, currentQuestion: 0 });
          },
          setWinner: () => {
            set({ hasWin: true });
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, "GO_NEXT_QUESTION");
            }
          },

          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) {
              set(
                { currentQuestion: previousQuestion },
                false,
                "GO_PREVIOUS_QUESTION"
              );
            }
          },

          reset: () => {
            set(
              { currentQuestion: 0, questions: [], hasCompleteAll:false, hasWin: false },
              false,
              "RESET"
            );
          },
        };
      },
      {
        name: "questions",
      }
    )
  )
);
