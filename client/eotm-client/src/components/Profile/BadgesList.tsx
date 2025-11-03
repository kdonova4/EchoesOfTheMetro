import { useAuth } from "../../hooks/AuthContext";
import { Box, Card, CardContent, styled, Typography, useMediaQuery } from "@mui/material";
import { JournalLocation } from "../Journal/MuiJournalCards";

const MobileBadgeCard = styled(Card)({
  maxWidth: '100%',
  backgroundColor: '#cfcfd180',
  color: 'black',
  mb: '8px',
})

const MobileBadgeName = styled(Typography)({
  fontFamily: '"Russo One", sans-serif',
  flex: 1,
  fontSize: '1.5vw',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const BadgeCard = styled(Card)({
  maxWidth: '100%',
  backgroundColor: '#cfcfd180',
  color: 'black', 
  mb: '16px'
})

function BadgesList() {

  const { appUser } = useAuth();
  const isMobile = useMediaQuery('(max-width:960px)');

  if (appUser)

    if (isMobile) {
      return (
        <>
          <div className="badge-div">
            {appUser.badgeResponses.map((badge) => (
              <MobileBadgeCard key={badge.badge.badgeId}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flexWrap: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={badge.badge.badgeImagePath}
                      style={{ height: 18, width: 18}}
                      className="badge-img"
                    />

                    <MobileBadgeName
                      variant="h6"
                    > 
                      {badge.badge.badgeName}
                    </MobileBadgeName>
                    
                  </Box>
                </CardContent>
              </MobileBadgeCard>
            ))}
          </div>


        </>
      )
    } else {
      return (
        <>
          <div className="badge-div">
            <div>
              {appUser.badgeResponses.map((badge) => (

              <BadgeCard style={{marginBottom: 15}} key={badge.badge.badgeId}>
                <CardContent>
                  <div style={{ display: 'flex', flex: 'row', alignItems: 'center', gap: 20, }}>
                    <img src={badge.badge.badgeImagePath} style={{ height: '64px', width: 'auto' }} />
                    <Typography sx={{ display: 'flex', flexDirection: 'column', width: '70%', gap: '10px' }} gutterBottom variant="h5" component="div">          
                      <Typography sx={{ fontFamily: '"Russo One", sans-serif', height: '25%', width: '100%', fontSize: '1.5rem' }}>
                        {badge.badge.badgeName}
                      </Typography>
                      <JournalLocation sx={{ fontFamily: '"Russo One", sans-serif', height: '25%', width: '100%', fontSize: '.8rem', color: 'black', padding: 0 }}>
                        Acquired on {new Date(badge.dateEarned).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        })}
                      </JournalLocation>
                    </Typography>

                  </div>

                </CardContent>

              </BadgeCard>

            ))}
            </div>
            
          </div>

        </>
      )
    }

}

export default BadgesList;