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
            <h2>{journal.journalId}</h2>
            <h3>{journal.title}</h3>
            <h5>{journal.username}</h5>
            <h4>{journal.text}</h4>
            <p>{new Date(journal.createdAt).toLocaleString()}</p>
            <p>{journal.createdStatus}</p>
        </>
    )
}

export default JournalViewer;