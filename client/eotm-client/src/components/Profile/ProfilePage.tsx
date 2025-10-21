import { Box, Button, Container, Modal, Stack, Tooltip } from "@mui/material";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import type { JournalResponse } from "../../types/response/JournalResponse";
import { findByUser } from "../../api/JournalAPI";
import DeleteIcon from '@mui/icons-material/Delete';
import { GiBullets } from "react-icons/gi";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import JournalProfileList from "../Journal/JournalProfileList";
import BadgesList from "./BadgesList";
type ProfilePageProps = {
  handleClickOpen: () => void;
  handleClose: () => void;
}


function ProfilePage() {

  const [view, setView] = useState("journals");

  const { appUser } = useAuth();


  const handleJournalOpen = () => {
    setView("journals");
  }

  const handleBadgeOpen = () => {
    setView("badges");
  }

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
          {appUser.username} stats
        </h3>

        {/* overlay that scales with image */}
        <Box
          sx={{
            position: 'absolute',
            top: '27%',
            left: '69%',
            transform: 'translate(-50%, 0)',
            height: '9%', // percentage of the image height
            width: '30%',  // percentage of the image width
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >

            <Tooltip title="Scrap" arrow placement="top">
              <img
                src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760731227/scrap_icon_dark_lny9jt.png"
                alt="Scrap Icon"
                style={{
                  width: '10%',
                  objectFit: 'contain',
                }}
              />
            </Tooltip>
            <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 } }}>{appUser.scrap}</Box>

            <Tooltip title="Fuel" arrow placement="top">
              <img
                src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760731548/fuel_icon_dark_kw4e7j.png"
                alt="Fuel icon"
                style={{
                  width: '10%',
                  objectFit: 'contain',
                }}
              />
            </Tooltip>
            <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 } }}>{appUser.fuel}</Box>

            <Tooltip title="Money" arrow placement="top">
              <img
                src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760731548/mgr_icon_dark_ad7ct6.png"
                alt="Money icon"
                style={{
                  width: '10%',
                  objectFit: 'contain',
                }}
              />
            </Tooltip>
            <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 } }}>{appUser.mgr}</Box>
          </Stack>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '27%',
            left: '26.5%',
            transform: 'translate(-50%, 0)',
            height: '48%', // percentage of the image height
            width: '34%',  // percentage of the image width
            overflowY: 'auto',
          }}>
          {view === "journals" ? (
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 18 }}>
              <Button onClick={handleJournalOpen} sx={{ height: '50px', backgroundColor: '#d31c1fa6', marginTop: 2, borderRadius: 0 }} variant="contained">Journals</Button>
              <Button onClick={handleBadgeOpen} sx={{ height: '50px', backgroundColor: '#390405', marginTop: 2, borderRadius: 0 }} variant="contained">Badges</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 18 }}>


              <Button onClick={handleJournalOpen} sx={{ height: '50px', backgroundColor: '#390405', marginTop: 2, borderRadius: 0 }} variant="contained">Journals</Button>
              <Button onClick={handleBadgeOpen} sx={{ height: '50px', backgroundColor: '#d31c1fa6', marginTop: 2, borderRadius: 0 }} variant="contained">Badges</Button>
            </div>
          )}

        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '32%',
            left: '26.5%',
            transform: 'translate(-50%, 0)',
            height: '42%', // percentage of the image height
            width: '34%',  // percentage of the image width
            overflowY: 'auto',
          }}>


          {view === "journals" ? (
            <JournalProfileList />
          ) : (
            <BadgesList />
          )}

        </Box>

      </Box>




    </>
  )
}

export default ProfilePage;