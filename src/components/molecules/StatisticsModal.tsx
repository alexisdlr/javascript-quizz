import { Box, Button, DialogActions, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useQuestionStore } from "../../store/questions";
import { useStatisticsStore } from "../../store/stats-modal";
import { useQuestionData } from "../../hooks";
import Modal from "../atoms/Modal";

const StatisticsModal = () => {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);
  const hasWin = useQuestionStore((state) => state.hasWin);
  const isOpen = useStatisticsStore((state) => state.isOpen);
  const onClose = useStatisticsStore((state) => state.onClose);
  const { correct, incorrect } = useQuestionData();

  const handleClose = () => {
    onClose();
    fetchQuestions(5);
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Stack>
        <Typography
          variant="h2"
          sx={{ color: hasWin ? "green" : "red" }}
          fontSize={22}
          fontWeight={"bold"}
          mb={2}
        >
          {hasWin ? "Ganaste" : "Perdiste"}
        </Typography>
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          my={2}
          pr={2}
        >
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <CheckIcon sx={{ color: "green" }} />
            <Typography>{`${correct} Aciertos`}</Typography>
          </Box>
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <ClearIcon sx={{ color: "red" }} />
            <Typography>{`${incorrect} Incorrectas`}</Typography>
          </Box>
        </Box>
        {hasWin ? (
          <Typography my={2} fontWeight={'semibold'}>
            Felicidades has contestado todas las preguntas correctamente!{" "}
          </Typography>
        ) : (
          <Typography my={2} fontWeight={'semibold'}>Intentalo de nuevo la proxima vez...</Typography>
        )}
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Continuar!
          </Button>
        </DialogActions>
      </Stack>
    </Modal>
  );
};

export default StatisticsModal;
