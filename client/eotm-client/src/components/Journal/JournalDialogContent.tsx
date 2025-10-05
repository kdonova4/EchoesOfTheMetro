import { DialogContent, TextField } from "@mui/material";
import type { JournalCreateRequest } from "../../types/create/JournalCreateRequest"

type DialogFormProps = {
    journal: JournalCreateRequest;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


function JournalDialogContent({ journal, handleChange}: DialogFormProps) {
    return(
        <DialogContent
    dividers
    sx={{
      width: '60vw',
      maxWidth: '40vw', 
      height: '90vh',          // fixed width
      maxHeight: '90vh',    // max height responsive
      overflowY: 'auto'     // scroll if content exceeds maxHeight
    }}
  >
    <TextField
      label="Title"
      name="title"
      fullWidth
      margin="normal"
      value={journal.title}
      onChange={handleChange}
    />
    <TextField
      label="Text"
      name="text"
      fullWidth
      multiline
      rows={40}
      value={journal.text}
      onChange={handleChange}
      margin="normal"
    />
  </DialogContent>
    )
}

export default JournalDialogContent;