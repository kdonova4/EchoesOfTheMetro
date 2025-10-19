import { useQuery } from "@tanstack/react-query";
import { findByLocation } from "../../api/JournalAPI";
import { useParams } from "react-router-dom";
import EchoCount from "./EchoCount";
import Echo from "./Echo";
import type { JournalResponse } from "../../types/response/JournalResponse";
import JournalCard from "./JournalCard";

type JournalListProps = {
    onSelectJournal: (journal: JournalResponse) => void;
}

function JournalList({ onSelectJournal }: JournalListProps) {

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
        <div style={{ overflowY: 'auto', height: '90%' }}>
            {data.map((journal) => (
                
                <div style={{ padding: 15, cursor: "pointer" }}>
                    <JournalCard mode="location" onSelectJournal={onSelectJournal} journal={journal} />
                </div>

            ))}
        </div>
            {/**<div key={journal.journalId} >
                    <div onClick={() => onSelectJournal(journal)} style={{ cursor: "pointer", margin: "8px 0" }}>
                        <h2>{journal.journalId}</h2>
                        <h3>{journal.title}</h3>
                        <h5>{journal.username}</h5>
                        <h4>{journal.text}</h4>
                        <p>{new Date(journal.createdAt).toLocaleString()}</p>
                        <p>{journal.createdStatus}</p>
                    </div>
                    <Echo journalId={journal.journalId}><EchoCount journalId={journal.journalId} /></Echo>
                    <p>--------------------------------</p>
                </div> */}
        </>


    )


}

export default JournalList;