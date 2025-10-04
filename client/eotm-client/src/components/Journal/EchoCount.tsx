import { useQuery } from "@tanstack/react-query";
import { countByJournal } from "../../api/EchoAPI"

type EchoProps = {
    journalId: number
}

function EchoCount({ journalId }: EchoProps) {

    const { data, error, isSuccess } = useQuery({
        queryKey: ["echoCount", journalId],
        queryFn: () => countByJournal(journalId),
    })


    if (!isSuccess) return <div>Loading...</div>;
    if (error) return <div>Error counting echoes</div>;

    return (
        <>
            <p>Echoes: {data}</p>
        </>
    )
}

export default EchoCount;