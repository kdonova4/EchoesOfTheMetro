import { Box } from "@mui/material";
import type { JournalResponse } from "../../types/response/JournalResponse";

type JournalViewerProps = {
    journal: JournalResponse | null
}

function JournalViewer({ journal }: JournalViewerProps) {

    if (!journal) {
        return <p>...</p>
    }

    return (
        <>
            <Box sx={{ position: "sticky", top: 65, marginTop: 4, display: 'inline-block', transform: "translateZ(0)" }}>
                
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



                
                <h3 style={{
                    position: 'absolute',
                    top: '0%',
                    color: '#000',
                    left: '11%',
                    width: '80%',
                    height: '100%',
                    textAlign: 'center'
                }}>{journal.title}</h3>

                <div style={{
                    position: 'absolute',
                    top: '9%',
                    left: '19%',
                    width: '65%',
                    height: '75%',
                    overflowY: 'auto',       // <--- makes it scrollable
                    background: 'transparent',
                    fontSize: '16px',
                    color: '#000',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',  // preserves line breaks
                    wordWrap: 'break-word',  // optional for spacing like notebook lines
                }}>{journal.text}</div>
                
            </Box>


        </>
    )
}

export default JournalViewer;