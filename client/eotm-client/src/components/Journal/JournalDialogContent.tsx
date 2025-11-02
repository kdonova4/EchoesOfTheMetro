import { Box, Button, styled, useMediaQuery } from "@mui/material";
import type { JournalCreateRequest } from "../../types/create/JournalCreateRequest"

type DialogFormProps = {
  journal: JournalCreateRequest;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClose: () => void;
  handleSave: () => void;
}

const FormContainer = styled(Box)({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'inline-block',
  width: '80vw',          
  maxWidth: '1000px',      
  position: 'relative',   
})

const MobileJournalButton = styled(Button)({
  position: 'absolute',
  top: '85%',
  fontFamily: '"Rock Salt", cursive',
  color: 'black',
  width: '30%',
  border: 'none',
  fontSize: '4vw',
  '&:hover': {
    color: '#d31c20', 
    backgroundColor: 'transparent', 
    transform: 'scale(1.05)', 
  },
})

const JournalButton = styled(Button)({
  position: 'absolute',
  top: '85%',
  fontFamily: '"Rock Salt", cursive',
  color: 'black',
  width: '30%',
  border: 'none',
  fontSize: '3vw',
  '&:hover': {
    color: '#d31c20', 
    backgroundColor: 'transparent', 
    transform: 'scale(1.05)', 
  },
})
function JournalDialogContent({ journal, handleChange, handleClose, handleSave, handleTextAreaChange }: DialogFormProps) {
  const isMobile = useMediaQuery('(max-width:960px)');


  if (isMobile) {
    return (

      <FormContainer>
        <div className="journal">
          <img
            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1759989861/worn-journal-3-smoothed_dpvxbm.png"
            alt="Journal"
            className="journal-page-img"
          />
          <Box
            sx={{
              position: 'absolute',
              top: '3%',
              left: '56%',
              transform: 'translate(-50%, 0)',
              width: '60%',  
            }}
          >
            <input
              type="text"
              placeholder="Title..."
              name="title"
              value={journal.title}
              onChange={handleChange}
              maxLength={25}
              className="rock-salt journal-title-input-mobile"
            />

          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              height: '64%',
              transform: 'translate(-50%, 0)',
              width: '65%',  
            }}
          >
            <textarea
              placeholder="Write here..."
              name="text"
              value={journal.text}
              onChange={handleTextAreaChange}
              maxLength={5000}
              className="journal-text-area-input caveat"
            /></Box>


          <Box
            sx={{
              position: 'absolute',
              top: '80%',
              left: '52%',
              height: 'auto',
              transform: 'translate(-50%, 0)',
              width: '70%',  
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <MobileJournalButton disableRipple sx={{ left: '50%' }} onClick={handleSave}>Save</MobileJournalButton>
            <MobileJournalButton disableRipple sx={{ left: '15%' }} onClick={handleClose}>Trash</MobileJournalButton>
          </Box>
        </div>


      </FormContainer>



    )
  } else {
    return (

      <FormContainer
        sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'inline-block',
          width: '80vw',          
          maxWidth: '1000px',      
          position: 'relative',   
        }}
      >
        <div className="journal">
          <img
            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1759989861/worn-journal-3-smoothed_dpvxbm.png"
            alt="Journal"
            style={{
              display: 'block',
              maxWidth: '100%', 
              height: 'auto',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '3.8%',
              left: '55%',
              transform: 'translate(-50%, 0)',
              width: '55%',  
            }}
          >
            <input
              type="text"
              placeholder="Title..."
              name="title"
              value={journal.title}
              onChange={handleChange}
              maxLength={25}
              className="journal-title-input rock-salt"
            />

          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              height: '64%',
              transform: 'translate(-50%, 0)',
              width: '65%',  
            }}
          ><textarea
              placeholder="Write here..."
              name="text"
              value={journal.text}
              onChange={handleTextAreaChange}
              maxLength={5000}
              className="journal-text-area-input caveat"
              style={{ fontSize: '24px' }}
            /></Box>


          <Box
            sx={{
              position: 'absolute',
              top: '80%',
              left: '52%',
              height: 'auto',
              transform: 'translate(-50%, 0)',
              width: '70%',  
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <JournalButton disableRipple sx={{ left: '50%', fontSize: '48px' }} onClick={handleSave}>Save</JournalButton>
            <JournalButton disableRipple sx={{ left: '15%', fontSize: '48px' }} onClick={handleClose}>Trash</JournalButton>
          </Box>
        </div>


      </FormContainer>



    )
  }

}

export default JournalDialogContent;