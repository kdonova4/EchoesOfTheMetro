import { useParams } from "react-router-dom";
import type { JournalCreateRequest } from "../../types/create/JournalCreateRequest";
import { Box, Button, Dialog, DialogActions, DialogTitle, Modal, Snackbar } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { createJournal } from "../../api/JournalAPI";
import JournalDialogContent from "./JournalDialogContent";
import type { JournalResponse } from "../../types/response/JournalResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const JOURNAL_DEFAULT: JournalCreateRequest = {
    title: '',
    text: '',
    storylineId: 0,
    appUserId: 0,
    locationId: 0,
}

function JournalForm() {

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

    return (
        <>
            <Button onClick={handleClickOpen}>Write Journal</Button>

            <Modal open={false} onClose={handleClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'inline-block', // box will shrink/grow with image
    }}
  >
    <img
      src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1759880068/cutout-journal_o6hd2m.png"
      alt="Journal"
      style={{
        display: 'block',
        maxWidth: '100%', // responsive scaling
        height: 'auto',
      }}
    />
    <input
      type="text"
      placeholder="Title..."
      maxLength={50}
      style={{
        position: 'absolute',
        top: '15%', // adjust as needed
        left: '9%', // adjust as needed
        width: '80%',
        border: 'none',
        background: 'transparent',
        fontSize: '16px',
        textAlign: 'center',
        color: '#000', // text color
        outline: 'none',
      }}
    />
    <textarea
      placeholder="Write here..."
      maxLength={5000}
      style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '80%',
        height: '58%', 
        border: 'none',
        background: 'transparent',
        fontSize: '16px',
        color: '#000',
        outline: 'none',
        resize: 'none',       // prevent manual resizing
        overflowWrap: 'break-word', // ensures wrapping
        lineHeight: '1.5',    // optional for spacing like notebook lines
      }}
    />
  </Box>
</Modal>
            <Dialog maxWidth="xl" open={open} onClose={handleClose}>
                <DialogTitle>New Journal Entry</DialogTitle>
                <JournalDialogContent journal={journal} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Trash</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
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