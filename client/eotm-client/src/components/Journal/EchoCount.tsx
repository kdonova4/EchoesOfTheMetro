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
        <div style={{ display: 'flex', flexDirection: 'row', gap: '4px'}}>
            <img src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760652092/echo-icon_pgh8y0.png"/>
            <p style={{ fontFamily: '"Russo One", sans-serif', color: 'white' }}>{data}</p>
        </div>
            
        </>
    )
}

export default EchoCount;