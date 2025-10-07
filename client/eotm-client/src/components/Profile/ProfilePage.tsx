import { Container } from "@mui/material";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import type { JournalResponse } from "../../types/response/JournalResponse";
import { findByUser } from "../../api/JournalAPI";

function ProfilePage() {

    const [journals, setJournals] = useState<JournalResponse[]>([]);
    const { appUser } = useAuth();


    const fetchJournals = async () => {
        if (appUser) {
            try {
                const response = await findByUser(appUser.appUserId)

                setJournals(response)
            } catch (error) {
                console.error(error);
            }
        }

    }

    useEffect(() => {
        fetchJournals();
    })

    if (!appUser) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Container>
                <h1>{appUser.username}</h1>
                <p>{appUser.fuel}</p>
                <p>{appUser.scrap}</p>
                <p>{appUser.mgr}</p>
                {appUser.badgeResponses.map((appBadge) => (
                    <div key={appBadge.badge.badgeId}>
                        <p>{appBadge.badge.badgeName}</p>
                    </div>
                ))}

                {journals.map((journal) => (
                <div key={journal.journalId}>
                    <h2>{journal.journalId}</h2>
                    <h3>{journal.title}</h3>
                    <h5>{journal.username}</h5>
                    <h4>{journal.text}</h4>
                    <p>{new Date(journal.createdAt).toLocaleString()}</p>
                    <p>{journal.createdStatus}</p>
                    
                    <p>--------------------------------</p>
                </div>
            ))}
            </Container>
        </>
    )
}

export default ProfilePage;