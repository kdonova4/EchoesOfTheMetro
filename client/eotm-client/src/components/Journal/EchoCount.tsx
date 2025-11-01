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
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}
            >
                <img
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760652092/echo-icon_pgh8y0.png"
                    alt="echo"
                    style={{ width: '48px', height: '48px' }}
                />
                <span
                    style={{
                        fontFamily: '"Russo One", sans-serif',
                        fontSize: '1rem',
                        color: 'white',
                        lineHeight: 1,
                    }}
                >
                    {data}
                </span>
            </div>

        </>
    )
}

export default EchoCount;