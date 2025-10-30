import { useAuth } from "../../hooks/AuthContext";
import { Box, Card, CardContent, styled, Typography, useMediaQuery } from "@mui/material";

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
            {appUser.badgeResponses.map((badge) => (

              <BadgeCard key={badge.badge.badgeId}>
                <CardContent>
                  <div style={{ display: 'flex', flex: 'row', alignItems: 'center', gap: 20 }}>
                    <img src={badge.badge.badgeImagePath} style={{ height: '64px', width: 'auto' }} />
                    <Typography sx={{ display: 'flex', flexDirection: 'row', width: '70%', gap: '10px', alignItems: 'flex-end' }} gutterBottom variant="h5" component="div">          
                      <Typography sx={{ fontFamily: '"Russo One", sans-serif', height: '25%', width: '100%', fontSize: '1.5rem' }}>
                        {badge.badge.badgeName}
                      </Typography>
                    </Typography>

                  </div>

                </CardContent>

              </BadgeCard>

            ))}
          </div>

        </>
      )
    }

}

export default BadgesList;