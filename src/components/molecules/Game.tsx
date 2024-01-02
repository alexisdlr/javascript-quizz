import { IconButton, Stack } from "@mui/material";
import { useQuestionStore } from "../../store/questions";
import Question from "../atoms/Question";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "..";

const Game = () => {
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  const questionInfo = questions[currentQuestion];
  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionStore(
    (state) => state.goPreviousQuestion
  );

  return (
    <>
       <Stack direction='row' gap={2} sx={{marginTop: 4}} alignItems='center' justifyContent='start'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};

export default Game;
