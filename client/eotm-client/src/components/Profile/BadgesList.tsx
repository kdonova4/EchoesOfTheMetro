import { useState } from "react";
import type { BadgeResponse } from "../../types/response/BadgeResponse";
import { useAuth } from "../../hooks/AuthContext";
import { Card, CardContent, Typography } from "@mui/material";

function BadgesList() {

    const { appUser } = useAuth();
    const [badges, setBadges] = useState<BadgeResponse[]>([]);


    if (appUser)
        return (
            <>
                <div style={{ overflowY: 'auto', height: '90%', padding: 15 }}>
                    {appUser.badgeResponses.map((badge) => (
                        <Card key={badge.badge.badgeId} sx={{ maxWidth: '100%', backgroundColor: '#cfcfd180', color: 'black' }}>
                            <CardContent>
                                <div style={{ display: 'flex', flex: 'row', alignItems: 'center', gap: 20}}>
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

export default BadgesList;