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
import { Game, JavascriptLogo } from "./components";
import StartModal from "./components/molecules/StartModal";
import { useQuestionData } from "./hooks";
import "./App.css";

function App() {
  const theme = useTheme();
  const { unanswered } = useQuestionData();
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const questions = useQuestionStore((state) => state.questions);
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);
  const handleClick = () => {
    fetchQuestions(10);
  };
  useEffect(() => {
    fetchQuestions(10);
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
        {questions.length > 0 && unanswered > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
