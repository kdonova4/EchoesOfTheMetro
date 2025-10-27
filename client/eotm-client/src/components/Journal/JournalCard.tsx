import { Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import type { JournalResponse } from "../../types/response/JournalResponse";
import './journal.css'
import EchoCount from "./EchoCount";
import Echo from "./Echo";

type JournalCardProps = {
    journal: JournalResponse;
    onSelectJournal?: (journal: JournalResponse) => void;
    mode: string;
}

function JournalCard({ journal, onSelectJournal, mode }: JournalCardProps) {

    const isMobile = useMediaQuery('(max-width:960px)');

    if (mode === "location") {
        return (
            <>

                <Card key={journal.journalId} sx={{  maxWidth: '629px', backgroundColor: '#d31c1f73', color: 'white' }}>
                    <CardContent>
                        <div style={{  borderRadius: 10, padding: 4 }} className="journal-card" onClick={() => onSelectJournal?.(journal)}>
                            <Typography sx={{  display: 'flex', flexDirection: 'row', width: '100%', gap: '10px', alignItems: 'flex-end' }} gutterBottom variant="h5" component="div">
                                <Typography sx={{ fontFamily: '"Russo One", sans-serif', fontSize: '1.6rem', height: '25%', width: '50%', overflow: "hidden", flex: 1, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {journal.title}
                                </Typography>
                                <Typography  sx={{  color: '#cfcfd1', flexShrink: 0, fontFamily: '"Russo One", sans-serif', height: '10%', width: '50%', fontSize: '.7rem', textAlign: 'right' }}>
                                    written by {journal.username}
                                </Typography>
                            </Typography>

                            <Typography sx={{
                                padding: 2,

                                fontFamily: '"Russo One", sans-serif',
                                height: '35px',
                                width: '80%',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2, // number of lines before truncating
                                textOverflow: 'ellipsis',
                            }}>
                                {journal.text}
                            </Typography>
                            <Typography sx={{
                                padding: 1,
                                fontFamily: '"Russo One", sans-serif',
                                color: '#cfcfd1', fontSize: '.7rem',
                                textAlign: 'left',
                                height: '20px',
                                width: '90%',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2, // number of lines before truncating
                                textOverflow: 'ellipsis',
                                
                            }}>
                                Condition: {journal.createdStatus}
                            </Typography>
                        </div>
                        <Echo journalId={journal.journalId}><EchoCount journalId={journal.journalId} /></Echo>
                    </CardContent>
                </Card>


            </>
        )
    } else {
        if(isMobile) {
            return (
            <>
                <Card key={journal.journalId} sx={{ maxWidth: '100%', height: '100%', backgroundColor: '#d31c1f63', color: 'white' }}>
                    <CardContent>
                        <div>
                            <Typography sx={{ display: 'flex', flexDirection: 'row', width: '70%', gap: '10px', alignItems: 'flex-end' }} gutterBottom variant="h5" component="div">
                                <Typography sx={{ fontFamily: '"Russo One", sans-serif', fontSize: '1.4vw', height: '2%', width: '100%', overflow: "hidden", whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {journal.title}
                                </Typography>
                            </Typography>
                            
                        </div>
                        
                    <div style={{ marginTop: 15, fontFamily: '"Russo One", sans-serif', height: '20%', width: 'auto'}}>
                        <EchoCount journalId={journal.journalId} />
                    </div>
                        
                    </CardContent>

                </Card>


            </>
        )
        } else {
            return (
            <>
                <Card key={journal.journalId} sx={{ maxWidth: '100%', backgroundColor: '#d31c1f63', color: 'white' }}>
                    <CardContent>
                        <div>
                            <Typography sx={{ display: 'flex', flexDirection: 'row', width: '70%', gap: '10px', alignItems: 'flex-end' }} gutterBottom variant="h5" component="div">
                                <Typography sx={{ fontFamily: '"Russo One", sans-serif', fontSize: '1.6rem', height: '25%', width: '100%', overflow: "hidden", whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {journal.title}
                                </Typography>
                            </Typography>
                            <Typography sx={{
                                padding: 2,
                                height: '10px',
                                width: '80%',
                                fontFamily: '"Russo One", sans-serif',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 1, // number of lines before truncating
                                textOverflow: 'ellipsis',
                            }}>
                                {journal.text}
                            </Typography>
                        </div>
                        
                    <div style={{ marginTop: 15, fontFamily: '"Russo One", sans-serif', }}>
                        <EchoCount journalId={journal.journalId} />
                    </div>
                        
                    </CardContent>

                </Card>


            </>
        )
        }
        
    }

}

export default JournalCard;