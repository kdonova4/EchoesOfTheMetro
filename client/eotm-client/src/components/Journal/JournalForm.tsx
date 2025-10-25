import { useParams } from "react-router-dom";
import type { JournalCreateRequest } from "../../types/create/JournalCreateRequest";
import { Box, Button, Dialog, DialogActions, DialogTitle, Modal, Snackbar } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { createJournal } from "../../api/JournalAPI";
import JournalDialogContent from "./JournalDialogContent";
import type { JournalResponse } from "../../types/response/JournalResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const JOURNAL_DEFAULT: JournalCreateRequest = {
  title: '',
  text: '',
  storylineId: 0,
  appUserId: 0,
  locationId: 0,
}

function JournalForm() {

  const { enqueueSnackbar } = useSnackbar();
  const [journal, setJournal] = useState<JournalCreateRequest>(JOURNAL_DEFAULT);
  const [errors, setErrors] = useState<string[]>([])
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const { appUser } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();


  const { mutate } = useMutation<JournalResponse, Error, JournalCreateRequest>({
    mutationFn: createJournal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals', Number(id)] });
      enqueueSnackbar(`'${journal.title}' Journal Posted Succesfully`, { autoHideDuration: 3000 });
      setJournal(JOURNAL_DEFAULT);
      handleClose();
    },
    onError: (err) => {
      if (Array.isArray(err)) {
        setErrors(err);
      } else if (typeof err === "string") {
        setErrors([err])
      }

      setSnackOpen(true);
    }
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = async () => {

    if (appUser) {
      journal.appUserId = appUser.appUserId;
      journal.locationId = Number(id)
    }

    mutate(journal);

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJournal({
      ...journal, [event.target.name]: event.target.value
    });
  }

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournal({
      ...journal, [event.target.name]: event.target.value
    });
  }

  return (
    <>
      <Button sx={{ fontFamily: '"Russo One", sans-serif', backgroundColor: '#d31c20', color: "white", borderRadius: 1, padding: 1.5 }} onClick={handleClickOpen}>Write Journal</Button>

      <Modal open={open} onClose={handleClose}>

        <JournalDialogContent
          journal={journal}
          handleChange={handleChange}
          handleTextAreaChange={handleTextAreaChange}
          handleClose={handleClose}
          handleSave={handleSave}
        />

      </Modal>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => {
          setSnackOpen(false);
          setErrors([]);
        }}
        message={errors[0]}// <-- list only first error
      />
    </>
  )
}

export default JournalForm;