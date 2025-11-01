import { findByUser } from "../../api/JournalAPI";
import { useAuth } from "../../hooks/AuthContext";
import JournalCard from "./JournalCard";
import { useQuery } from "@tanstack/react-query";

function JournalProfileList() {

    const { appUser } = useAuth();


    const {data, error, isSuccess} = useQuery({
        queryKey: ["profileJournals", appUser?.appUserId],
        queryFn: () => {
            if(!appUser) {
                return Promise.resolve([]);
            } else {
                return findByUser(appUser.appUserId)
            }
        },
        enabled: !!appUser
    })




    

    if (!isSuccess) return <div>loading Journals...</div>;
    if (error) return <div>Error loading journals</div>;


    return (
        <>
            {data.map((journal) => (
                <div key={journal.journalId} style={{ padding: 15 }}>
                    <JournalCard mode="profile" journal={journal} />
                </div>
            ))}
        </>
    )
}

export default JournalProfileList;