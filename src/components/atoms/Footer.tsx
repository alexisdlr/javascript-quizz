import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import { useQuestionData } from "../../hooks";
import { useQuestionStore } from "../../store/questions";
const Footer = () => {
  const {correct, incorrect, unanswered} = useQuestionData()
  const reset = useQuestionStore(state => state.reset)

  return (
    <Container sx={{ marginTop: "16px" }}>
      <Stack direction={"row"} justifyContent={"center"} gap={2} alignItems={"center"} flexWrap={'wrap'}>
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <CheckIcon sx={{ color: "green" }} />
          <Typography>{`${correct} Correctas`}</Typography>
        </Box>
        -
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <ClearIcon sx={{ color: "red" }} />
          <Typography>{`${incorrect} Incorrectas`}</Typography>
        </Box>
        -
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <QuestionMarkIcon color="action" sx={{fontSize: 16}} />
          <Typography>{`${unanswered} Sin responder`}</Typography>
        </Box>
      </Stack>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </Container>
  );
};

export default Footer;
