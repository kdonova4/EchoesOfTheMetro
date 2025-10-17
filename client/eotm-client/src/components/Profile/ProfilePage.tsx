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


            <Box
  sx={{
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'inline-block',
    width: '80vw',          // controls image scaling
    maxWidth: '1500px',      // optional, for upper limit
    position: 'relative',   // makes children position relative to image
  }}
>
  <img
    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760047166/profile-background_e6jrdo.png"
    alt="Profile"
    style={{
      display: 'block',
      width: '100%',         // fill parent
      height: 'auto',
    }}
  />

  <h3
    style={{
      position: 'absolute',
      top: '18%',
      left: '62%',
      transform: 'translateX(-50%)',
      color: '#000',
      width: '80%',
      textAlign: 'center',
      fontSize: 'clamp(1rem, 2vw, 1.8rem)', // responsive text scaling
    }}
  >
    {appUser.username}
  </h3>

  {/* overlay that scales with image */}
  <Box
    sx={{
      position: 'absolute',
      top: '27%',
      left: '68%',
      transform: 'translate(-50%, 0)',
      outline: '1px solid blue',
      height: '9%', // percentage of the image height
      width: '30%',  // percentage of the image width
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ outline: '1px solid yellow' }}
    >
      <DeleteIcon sx={{ color: 'black', fontSize: { xs: 20, sm: 28, md: 34 } }} />
      <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 } }}>{appUser.scrap}</Box>

      <GasMeterIcon sx={{ color: 'black', fontSize: { xs: 20, sm: 28, md: 34 } }} />
      <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 } }}>{appUser.fuel}</Box>

      <GiBullets style={{ color: 'black', fontSize: '2rem' }} />
      <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 } }}>{appUser.mgr}</Box>
    </Stack>
  </Box>
</Box>


        </>
    )
}

export default ProfilePage;