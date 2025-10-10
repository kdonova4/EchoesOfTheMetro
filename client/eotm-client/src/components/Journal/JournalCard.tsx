import { Card, CardContent, Typography } from "@mui/material";

function JournalCard() {

    return (
        <>

            <Card sx={{ maxWidth: 345, backgroundColor: 'orange' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Liszart
                    </Typography>
                </CardContent>
            </Card>

            <div style={{ outline: '1px solid yellow', borderRadius: 5, padding: 10, width: '40vw' }} className="journal-card-container">
                <div style={{
                    outline: '1px solid red',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '30vw',
                    gap: '10px',
                    alignItems: 'flex-end'
                }} className="journal-title-container">
                    <div style={{ outline: '1px solid yellow', height: '25%', fontSize: '3rem' }} className="journal-title">
                        Echoes of the past
                    </div>

                    <div style={{ outline: '1px solid purple', height: '10%' }} className="journal-username">
                        written by shadowrunner
                    </div>
                </div>

                <div style={{
                    outline: '1px solid blue',
                    padding: 10,
                    whiteSpace: 'nowrap',     // keep text on one line
                    overflow: 'hidden',       // hide overflow
                    textOverflow: 'ellipsis',  // show "..." at the end
                    width: '80%'
                }} className="journal-text">
                    Every footstep here feels borrowed, as if the station remembers its passengers more vividly than the living do.
                    Every footstep here feels borrowed, as if the station remembers its passengers more vividly than the living do.
                    Every footstep here feels borrowed, as if the station remembers its passengers more vividly than the living do.
                </div>
                <div style={{ outline: '1px solid gray' }} className="journal-status">
                    Fresh
                </div>
                <div style={{ outline: '1px solid gray' }} className="echo-button">
                    ECHO
                </div>
            </div>
        </>
    )
}

export default JournalCard;