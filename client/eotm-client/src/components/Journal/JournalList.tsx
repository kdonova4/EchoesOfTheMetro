import { useQuery } from "@tanstack/react-query";
import { findByLocation } from "../../api/JournalAPI";
import { useParams } from "react-router-dom";
import EchoCount from "./EchoCount";
import { Button, Stack } from "@mui/material";
import Echo from "./Echo";

function JournalList() {

    const { id } = useParams();
    const locationId = Number(id);

    const { data, error, isSuccess } = useQuery({
        queryKey: ["journals", locationId],
        queryFn: () => findByLocation(locationId),
        enabled: !isNaN(locationId)
    })

    if (!isSuccess) return <div>Loading...</div>;
    if (error) return <div>Error loading journals</div>;

    return (
        <>
            {data.map((journal) => (
                <div key={journal.journalId}>
                    <h2>{journal.journalId}</h2>
                    <h3>{journal.title}</h3>
                    <h4>{journal.text}</h4>
                    <p>{new Date(journal.createdAt).toLocaleString()}</p>
                    <p>{journal.createdStatus}</p>
                    <Stack direction="row">
                        
                        <Echo journalId={journal.journalId}><EchoCount journalId={journal.journalId}/></Echo>
                    </Stack>
                    
                    <p>--------------------------------</p>
                </div>
            ))}
        </>
    )


}

export default JournalList;