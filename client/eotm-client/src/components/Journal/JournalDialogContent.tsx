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
  return (

    <Box
      sx={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'inline-block',
        width: '80vw',          // controls image scaling
        maxWidth: '1000px',      // optional, for upper limit
        position: 'relative',   // makes children position relative to image
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
      <Box
        sx={{
          position: 'absolute',
          top: '6%',
          left: '52%',
          transform: 'translate(-50%, 0)',
          width: '55%',  // percentage of the image width
        }}
      >
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={journal.title}
          onChange={handleChange}
          maxLength={25}
          style={{
            position: 'absolute',
            top: '25%', // adjust as needed
            left: '5.5%', // adjust as needed
            width: '80%',
            border: 'none',
            background: 'transparent',
            fontSize: '16px',
            textAlign: 'center',
            color: '#000', // text color
            outline: 'none'
          }}
        />

      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          height: '64%',
          transform: 'translate(-50%, 0)',
          width: '65%',  // percentage of the image width
        }}
      ><textarea
          placeholder="Write here..."
          name="text"
          value={journal.text}
          onChange={handleTextAreaChange}
          maxLength={5000}
          style={{
            position: 'absolute',

            width: '100%',
            height: '100%',
            border: 'none',
            background: 'transparent',
            fontSize: '16px',
            color: '#000',
            outline: 'none',
            resize: 'none',       // prevent manual resizing
            overflowWrap: 'break-word', // ensures wrapping
            lineHeight: '1.5',    // optional for spacing like notebook lines
          }}
        /></Box>


      <Box
        sx={{
          position: 'absolute',
          top: '80%',
          left: '52%',
          height: 'auto',
          transform: 'translate(-50%, 0)',
          width: '70%',  // percentage of the image width
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button sx={{
          position: 'absolute',
          top: '85%',
          left: '50%',
          color: '#634531',
          width: '30%',
          border: 'none',
          fontSize: '38px'
        }}
          onClick={handleSave}
        >Save</Button>
        <Button sx={{
          position: 'absolute',
          top: '85%',
          left: '15%',
          color: '#634531',
          width: '30%',
          border: 'none',
          fontSize: '38px'
        }}
          onClick={handleClose}
        >Trash</Button>
      </Box>

    </Box>



  )
}

export default JournalDialogContent;