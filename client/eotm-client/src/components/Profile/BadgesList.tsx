import { useState } from "react";
import type { BadgeResponse } from "../../types/response/BadgeResponse";
import { useAuth } from "../../hooks/AuthContext";
import { Box, Card, CardContent, Typography, useMediaQuery } from "@mui/material";

function BadgesList() {

    const { appUser } = useAuth();
    const [badges, setBadges] = useState<BadgeResponse[]>([]);
    const isMobile = useMediaQuery('(max-width:960px)');

    if (appUser)

        if(isMobile) {
            return (
            <>
                <div style={{ overflowY: 'auto', height: '90%', padding: 15 }}>
  {appUser.badgeResponses.map((badge) => (
    <Card
      key={badge.badge.badgeId}
      sx={{
        maxWidth: '100%',
        backgroundColor: '#cfcfd180',
        color: 'black',
        mb: 1, // spacing between cards
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'nowrap', // keeps image + text on one line
            overflow: 'hidden', // prevent overflow
          }}
        >
          <img
            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760730508/fuel_icon_ferytw.png"
            style={{ height: 48, width: 'auto', flexShrink: 0 }}
          />

          <Typography
            sx={{
              fontFamily: '"Russo One", sans-serif',
              flex: 1,
              fontSize: '1.5vw', // responsive font
              whiteSpace: 'nowrap',       // keep on one line
              overflow: 'hidden',          // hide overflow
              textOverflow: 'ellipsis',    // add "..." when too long
            }}
            variant="h6"
            component="div"
          >
            {badge.badge.badgeName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ))}
</div>


            </>
        )
        } else {
            return (
            <>
                <div style={{ overflowY: 'auto', height: '90%', padding: 15 }}>
                    {appUser.badgeResponses.map((badge) => (
                        <Card key={badge.badge.badgeId} sx={{ maxWidth: '100%', backgroundColor: '#cfcfd180', color: 'black', mb: 2 }}>
                            <CardContent>
                                <div style={{ display: 'flex', flex: 'row', alignItems: 'center', gap: 20 }}>
                                    <img src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760730508/fuel_icon_ferytw.png" style={{ height: '64px', width: 'auto' }} />

                                    <Typography sx={{ display: 'flex', flexDirection: 'row', width: '70%', gap: '10px', alignItems: 'flex-end' }} gutterBottom variant="h5" component="div">
                                        <Typography sx={{ fontFamily: '"Russo One", sans-serif', height: '25%', width: '100%', fontSize: '1.5rem' }}>
                                            {badge.badge.badgeName}
                                        </Typography>
                                    </Typography>

                                </div>

                            </CardContent>

                        </Card>

                    ))}
                </div>

            </>
        )
        }
        
}

export default BadgesList;