import { Box, Button, DialogContent, Modal, TextField } from "@mui/material";
import type { JournalCreateRequest } from "../../types/create/JournalCreateRequest"

type DialogFormProps = {
    journal: JournalCreateRequest;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleClose: () => void;
    handleSave: () => void;
}


function JournalDialogContent({ journal, handleChange, handleClose, handleSave, handleTextAreaChange }: DialogFormProps) {
    return(
        
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
            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1759989861/worn-journal-3-smoothed_dpvxbm.png"
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
            name="title"
            value={journal.title}
            onChange={handleChange}
            maxLength={50}
            style={{
              position: 'absolute',
              top: '15%', // adjust as needed
              left: '9.5%', // adjust as needed
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
            name="text"
            value={journal.text}
            onChange={handleTextAreaChange}
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
          <Button sx={{
            position: 'absolute',
            top: '85%',
            left: '50%',
            color: '#634531',
            width: '40%',
            border: 'none',
            fontSize: '38px'
          }}
          onClick={handleSave}
          >Save</Button>
          <Button sx={{
            position: 'absolute',
            top: '85%',
            left: '10%',
            color: '#634531',
            width: '40%',
            border: 'none',
            fontSize: '38px'
          }}
          onClick={handleClose}
          >Trash</Button>
        </Box>
        
      
    )
}

export default JournalDialogContent;