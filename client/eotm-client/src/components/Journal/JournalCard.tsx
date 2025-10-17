import { Card, CardContent, Typography } from "@mui/material";
import type { JournalResponse } from "../../types/response/JournalResponse";
import './journal.css'
import EchoCount from "./EchoCount";
import Echo from "./Echo";

type JournalCardProps = {
    journal: JournalResponse;
    onSelectJournal: (journal: JournalResponse) => void;
}

function JournalCard({ journal, onSelectJournal }: JournalCardProps) {

    return (
        <>
            
                <Card className="journal-card" key={journal.journalId} sx={{ maxWidth: '100%', backgroundColor: '#d773105e', color: 'white' }}>
                <CardContent>
                    <div onClick={() => onSelectJournal(journal)}>
                        <Typography sx={{  display: 'flex', flexDirection: 'row', width: '100%', gap: '10px', alignItems: 'flex-end' }} gutterBottom variant="h5" component="div">
                        <Typography sx={{  height: '25%', width: '50%', fontSize: '1.5rem' }}>
                            {journal.title}
                        </Typography>
                        <Typography sx={{  height: '10%', width: '60%', color: 'gray', fontSize: '.8rem' }}>
                            written by {journal.username} | Condition: {journal.createdStatus}
                        </Typography>

                    </Typography>

                    <Typography sx={{
                        padding: 2,
                        height: '50px',
                        width: '80%',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3, // number of lines before truncating
                        textOverflow: 'ellipsis',
                    }}>
                        {journal.text}
                    </Typography>
                    </div>
                    
                    <Echo journalId={journal.journalId}><EchoCount journalId={journal.journalId} /></Echo>
                </CardContent>
                
            </Card>
            
            
        </>
    )
}

export default JournalCard;