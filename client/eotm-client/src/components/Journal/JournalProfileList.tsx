import { useEffect, useState } from "react";
import { findByUser } from "../../api/JournalAPI";
import { useAuth } from "../../hooks/AuthContext";
import type { JournalResponse } from "../../types/response/JournalResponse";
import JournalCard from "./JournalCard";

function JournalProfileList() {

    const { appUser } = useAuth();
    const [journals, setJournals] = useState<JournalResponse[]>([])

    const fetchProfilesJournal = async () => {

        if (appUser) {
            try {
                const response = await findByUser(appUser.appUserId)

                setJournals(response)
            } catch (error) {
                console.log(error)
            }
        }

    }

    useEffect(() => {
        fetchProfilesJournal();
    }, [appUser])


    return (
        <>
            {journals.map((journal) => (
                <div style={{ padding: 15 }}>
                    <JournalCard mode="profile" journal={journal} />
                </div>


            ))}
        </>
    )
}

export default JournalProfileList;