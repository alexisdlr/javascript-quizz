import { Button, DialogActions, Stack, Typography } from "@mui/material";
import { useModalStore } from "../../store/start-modal";
import Modal from "../atoms/Modal";

const StartModal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onClose = useModalStore((state) => state.onClose);

  const handleClose = () => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Stack >
        <Typography variant="h2" fontSize={22} fontWeight={'bold'} mb={2}>Bienvenido a JavaScript Quiz!</Typography>
        <Typography sx={{ mb: 2 }}>¿Estás listo para empezar?</Typography>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Estoy listo!
          </Button>
        </DialogActions>
      </Stack>
    </Modal>
  );
};

export default StartModal;
