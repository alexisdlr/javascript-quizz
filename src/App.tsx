import { useEffect } from "react";
import {
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuestionStore } from "./store/questions";
import { Game, JavascriptLogo, StatisticsModal, StartModal } from "./components";
import { useQuestionData } from "./hooks";
import "./App.css";
import { useStatisticsStore } from "./store/stats-modal";

function App() {
  const theme = useTheme();
  const { unanswered } = useQuestionData();
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const questions = useQuestionStore((state) => state.questions);
  const hasCompleteAll = useQuestionStore(state => state.hasCompleteAll)
  const setWinner = useQuestionStore(state => state.setWinner)
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);
  const onCompleteQuestions = useQuestionStore(state => state.onCompleteQuestions)
  const onOpen = useStatisticsStore((state) => state.onOpen);
  if (hasCompleteAll) {
    onOpen();
  }
  const handleClick = () => {
    fetchQuestions(5);
  };
  if(questions.every(q => q.isCorrectUserAnswer)){
    setWinner()
  }
  if(questions.every(q => q.userSelectedAnswer != null)){
    onCompleteQuestions()
  }
  useEffect(() => {
    fetchQuestions(5);
  }, []);
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
          gap={2}
        >
          <JavascriptLogo />
          <Typography component={"h1"} variant={medium ? "h2" : "h5"}>
            Javascript Quizz
          </Typography>
        </Stack>
        {questions.length === 0 && (
          <div style={{ marginTop: "16px" }}>
            <Button onClick={handleClick} variant="contained">
              ¡Empezar juego!
            </Button>
          </div>
        )}
        <StartModal />
        
         <StatisticsModal />
        
        {questions.length > 0 && unanswered > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
