import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { type Question as QuestionType } from "../../types";
import { useQuestionStore } from "../../store/questions";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer == null) return "#282A36";
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "#282A36";
  if (index === correctAnswer ) return "green";
  if (index === userSelectedAnswer) return "red";
  return "#282A36";
};
const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  return (
    <Card sx={{ textAlign: "left", p: 4, borderRadius: 4, marginY: 2, maxWidth: '500px' }}>
      <Typography fontSize={18}>{info.question}</Typography>
      <SyntaxHighlighter style={dracula} language="javascript">
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#334" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              sx={{ bgcolor: getBackgroundColor(info, index) }}
              onClick={createHandleClick(index)}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Question;
