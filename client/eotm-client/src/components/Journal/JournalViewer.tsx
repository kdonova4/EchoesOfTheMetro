import { Box } from "@mui/material";
import type { JournalResponse } from "../../types/response/JournalResponse";

type JournalViewerProps = {
    journal: JournalResponse | null
}

function JournalViewer({ journal }: JournalViewerProps) {
    

    if (!journal) {
        return (
            <>
                <Box sx={{  marginTop: 14, display: 'inline-block', transform: "translateZ(0)" }}>
                
                <img
                className="content"
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                    alt="Journal"
                    style={{
                        scale: '1.2',
                        display: 'block',
                        borderRadius: 20,
                        maxWidth: '100%', // responsive scaling
                        height: 'auto',
                    }}
                />
                
                



                
                
                
            </Box>
            </>
        )
    }

    return (
        <>

            <Box sx={{  marginTop: 14, display: 'inline-block', transform: "translateZ(0)", height: 'auto', width: '100%' }}>
                
                <img
                className="content"
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                    alt="Journal"
                    style={{
                        scale: '1.2',
                        display: 'block',
                        borderRadius: 20,
                        maxWidth: '100%', // responsive scaling
                        height: 'auto',
                    }}
                />
                
                <img
                className="content"
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040531/worn-journal-3-smoothed_rhauhc.png"
                    alt="Journal"
                    style={{
                        position: 'absolute',
                        
                        top: '-2%',
                        left: '1%',
                        scale: '.98',
                        display: 'block',
                        borderRadius: 20,
                        maxWidth: '100%', // responsive scaling
                        height: 'auto',
                    }}
                />

                    <Box
          sx={{
            position: 'absolute',
            top: '0%',
            left: '52%',
            transform: 'translate(-50%, 0)',
            width: '55%',  // percentage of the image width
          }}
        >

            <h3 style={{
                    position: 'absolute',
                    top: '0%',
                    color: 'black',
                    left: '11%',
                    width: '80%',
                    height: '100%',
                    textAlign: 'center'
                }}>{journal.title}</h3>
        </Box>

                
                
<Box
          sx={{
            position: 'absolute',
            top: '8%',
            left: '53%',
            transform: 'translate(-50%, 0)',
            height: '65%',
            width: '70%',  // percentage of the image width

          }}
        >
<div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',       // <--- makes it scrollable
                    background: 'transparent',
                    fontSize: '16px',
                    color: '#000',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',  // preserves line breaks
                    wordWrap: 'break-word',  // optional for spacing like notebook lines
                }}>{journal.text}</div>
            
        </Box>
                
                
            </Box>


        </>
    )
}

export default JournalViewer;