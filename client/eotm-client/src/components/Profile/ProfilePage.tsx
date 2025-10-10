import { Box, Container, Modal, Stack } from "@mui/material";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import type { JournalResponse } from "../../types/response/JournalResponse";
import { findByUser } from "../../api/JournalAPI";
import DeleteIcon from '@mui/icons-material/Delete';
import { GiBullets } from "react-icons/gi";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
type ProfilePageProps = {
    handleClickOpen: () => void;
    handleClose: () => void;
}


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
    }, [appUser])

    if (!appUser) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            {/**
         * 
         * <Container>
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

         */}


            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'inline-block', // box will shrink/grow with image
            }}>
                <img
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760047166/profile-background_e6jrdo.png"
                    alt="Profile"
                    style={{
                        display: 'block',
                        maxWidth: '100%', // responsive scaling
                        height: 'auto',
                    }}
                />

                <h3 style={{
                    position: 'absolute',
                    top: '18%',
                    color: '#000',
                    left: '20%',
                    width: '80%',
                    height: '100%',
                    textAlign: 'center'
                }}>{appUser.username}
                </h3>
                <div style={{ position: 'absolute', top: '28%', left: '53%'}}>
                    <Stack direction="row" alignItems="center">
                        <DeleteIcon sx={{ color: "black" }} fontSize="medium" />
                        <Box sx={{ margin: 1, color: 'black', fontSize: 34, fontWeight: 'medium' }}>
                            {appUser.scrap}
                        </Box>

                        <GasMeterIcon sx={{ color: "black" }} style={{ marginLeft: 50 }} fontSize="large" />
                        <Box sx={{ margin: 1, color: 'black', fontSize: 34, fontWeight: 'medium' }}>
                            {appUser.fuel}
                        </Box>

                        <GiBullets style={{ marginLeft: 50, color: 'black' }} fontSize="large" />
                        <Box sx={{ margin: 1, color: 'black', fontSize: 34, fontWeight: 'medium' }}>
                            {appUser.mgr}
                        </Box>

                    </Stack>
                </div>



            </Box>

        </>
    )
}

export default ProfilePage;