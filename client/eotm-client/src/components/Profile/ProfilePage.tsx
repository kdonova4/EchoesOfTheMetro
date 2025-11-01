import { Box, Button, Stack, styled, Tooltip, useMediaQuery } from "@mui/material";
import { useAuth } from "../../hooks/AuthContext";
import { useState } from "react";
import JournalProfileList from "../Journal/JournalProfileList";
import BadgesList from "./BadgesList";
import { onClickSound, playSound } from "../../sounds";
type ProfilePageProps = {
  handleClose: () => void;
}


const LogoutButton = styled(Button)({
  position: 'absolute',
  top: '0%',
  left: '0%',
  fontFamily: '"Rock Salt", cursive',
  color: 'black',
  width: '100%',
  border: 'none',
  fontSize: 'clamp(.34rem, 1.8vw, 2rem)',
  '&:hover': {
    color: '#d31c20', 
    backgroundColor: 'transparent', 
    transform: 'scale(1.05)', 
  }

})

const CloseButton = styled(Button)({
  position: 'absolute',
  top: '0%',
  left: '0%',
  fontFamily: '"Rock Salt", cursive',
  color: 'black',
  width: '100%',
  border: 'none',
  fontSize: 'clamp(.34rem, 1.8vw, 2rem)',
  '&:hover': {
    color: '#d31c20', 
    backgroundColor: 'transparent', 
    transform: 'scale(1.05)', 
  },

})


const JournalsButton = styled(Button)({
  flex: '1 1 0',             
  minWidth: '0px',               
  borderRadius: '0px',
  fontFamily: '"Russo One", sans-serif',
  backgroundColor: '#d31c1fa6',
  fontSize: '1vw', 
})

const BadgesButton = styled(Button)({
  flex: '1 1 0',
  minWidth: '0px',
  fontFamily: '"Russo One", sans-serif',
  backgroundColor: '#390405',
  borderRadius: '0px',
  fontSize: '1vw',
})

function ProfilePage({ handleClose }: ProfilePageProps) {

  const [view, setView] = useState("journals");
  const isMobile = useMediaQuery('(max-width:960px)');
  const { appUser, logout } = useAuth();


  const handleJournalOpen = () => {
    playSound(onClickSound)
    setView("journals");
  }

  const handleBadgeOpen = () => {
    playSound(onClickSound)
    setView("badges");
  }



  if (!appUser) {
    return <h1>Loading...</h1>
  }

  if (isMobile) {
    return (
      <>


        <Box

          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'inline-block',
            width: '80vw',          
            maxWidth: '1400px',      
            position: 'relative',
          }}
        >
          <div className="profile">
            <img
              src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760047166/profile-background_e6jrdo.png"
              alt="Profile"
              className="background-img"
            />

            <h3 className="profile-name rock-salt">
              {appUser.username} stats
            </h3>

            
            <Box
              sx={{
                position: 'absolute',
                top: '27%',
                left: '69%',
                transform: 'translate(-50%, 0)',
                height: '9%', 
                width: '30%',  
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
                
                <Box sx={{ color: 'black', fontSize: { xs: 8, sm: 16, md: 16 }, fontFamily: '"Rock Salt", cursive', }}>{appUser.scrap}</Box>

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
                
                <Box sx={{ color: 'black', fontSize: { xs: 8, sm: 16, md: 16 }, fontFamily: '"Rock Salt", cursive', }}>{appUser.fuel}</Box>

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
                
                <Box sx={{ color: 'black', fontSize: { xs: 8, sm: 16, md: 16 }, fontFamily: '"Rock Salt", cursive', }}>{appUser.mgr}</Box>
              </Stack>

              <Box
                sx={{
                  position: 'absolute',
                  top: '90%',
                  left: '78%',
                  height: '64%',
                  transform: 'translate(-50%, 0)',
                  width: '65%',  
                }}
              >
                <LogoutButton disableRipple onClick={logout}>Logout</LogoutButton>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: '90%',
                  left: '12%',
                  height: '64%',
                  transform: 'translate(-50%, 0)',
                  width: '65%',  
                }}
              >
                <CloseButton disableRipple onClick={handleClose}>Close</CloseButton>
              </Box>

            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '26%',
                left: '23.5%',
                transform: 'translate(-50%, 0)',
                height: '90vh',
                width: '20vw',
                maxWidth: '80vw', 
                overflowY: 'auto',
              }}
            >
              {view === "journals" ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,           
                    width: '100%',     
                    height: 'auto',   
                  }}
                >
                  <JournalsButton onClick={handleJournalOpen} variant="contained">
                    Journals
                  </JournalsButton>

                  <BadgesButton onClick={handleBadgeOpen} variant="contained">
                    Badges
                  </BadgesButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <JournalsButton style={{ backgroundColor: '#390405' }} onClick={handleJournalOpen} variant="contained">
                    Journals
                  </JournalsButton>

                  <BadgesButton style={{ backgroundColor: '#d31c1fa6' }} onClick={handleBadgeOpen} variant="contained">
                    Badges
                  </BadgesButton>
                </Box>
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
          </div>

        </Box>




      </>
    )
  } else {
    return (
      <>



        <Box

          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'inline-block',
            width: '80vw',          
            maxWidth: '1400px',      
            position: 'relative',   
          }}
        >
          <div className="profile">
            <img
              src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760047166/profile-background_e6jrdo.png"
              alt="Profile"
              className="background-img"
            />

            <h3 className="profile-name rock-salt">
              {appUser.username} stats
            </h3>

            {/* overlay that scales with image */}
            <Box
              sx={{
                position: 'absolute',
                top: '27%',
                left: '69%',
                transform: 'translate(-50%, 0)',
                height: '9%', 
                width: '30%',  
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
                <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 }, fontFamily: '"Rock Salt", cursive', }}>{appUser.scrap}</Box>

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
                <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 }, fontFamily: '"Rock Salt", cursive', }}>{appUser.fuel}</Box>

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
                <Box sx={{ color: 'black', fontSize: { xs: 16, sm: 24, md: 32 }, fontFamily: '"Rock Salt", cursive', }}>{appUser.mgr}</Box>
              </Stack>

              <Box
                sx={{
                  position: 'absolute',
                  top: '90%',
                  left: '78%',
                  height: '64%',
                  transform: 'translate(-50%, 0)',
                  width: '65%',  
                }}
              >
                <LogoutButton disableRipple onClick={logout}>Logout</LogoutButton>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: '90%',
                  left: '12%',
                  height: '64%',
                  transform: 'translate(-50%, 0)',
                  width: '65%',  
                }}
              >
                <CloseButton disableRipple onClick={handleClose}>Close</CloseButton>
              </Box>

            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '24.5%',
                left: '26.5%',
                transform: 'translate(-50%, 0)',
                height: '48%', 
                width: '34%',  
                overflowY: 'auto',
              }}>
              {view === "journals" ? (
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 18 }}>
                  <Button onClick={handleJournalOpen} sx={{ fontFamily: '"Russo One", sans-serif', height: '50px', backgroundColor: '#d31c1fa6', marginTop: 2, borderRadius: 0 }} variant="contained">Journals</Button>
                  <Button onClick={handleBadgeOpen} sx={{ fontFamily: '"Russo One", sans-serif', height: '50px', backgroundColor: '#390405', marginTop: 2, borderRadius: 0 }} variant="contained">Badges</Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 18 }}>


                  <Button onClick={handleJournalOpen} sx={{ fontFamily: '"Russo One", sans-serif', height: '50px', backgroundColor: '#390405', marginTop: 2, borderRadius: 0 }} variant="contained">Journals</Button>
                  <Button onClick={handleBadgeOpen} sx={{ fontFamily: '"Russo One", sans-serif', height: '50px', backgroundColor: '#d31c1fa6', marginTop: 2, borderRadius: 0 }} variant="contained">Badges</Button>
                </div>
              )}

            </Box>
            <Box
            className="scrollable"
              sx={{
                position: 'absolute',
                top: '32%',
                left: '26.5%',
                transform: 'translate(-50%, 0)',
                height: '42%', 
                width: '34%',  
                overflowY: 'auto',
              }}>


              {view === "journals" ? (
                <JournalProfileList />
              ) : (
                <BadgesList />
              )}



            </Box>
          </div>

        </Box>




      </>
    )
  }

}

export default ProfilePage;