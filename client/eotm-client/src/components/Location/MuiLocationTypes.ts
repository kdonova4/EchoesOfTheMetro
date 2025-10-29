import { Button, Card, styled, Typography } from "@mui/material";

export const LocationCard = styled(Card)({
    maxWidth: '100%', 
    backgroundColor: '#3904058c', 
    color: 'white', 
    marginTop: '40px', 
    position: 'relative', 
    borderRadius: '4px'
})

export const MobileLocationName = styled(Typography)({
    fontFamily: '"Stalinist One", sans-serif', 
    fontSize: '1.4rem'
})

export const MobileLocationDescription = styled(Typography)({
    fontFamily: '"Russo One", sans-serif', 
    fontSize: '1rem'
})

export const TravelButton = styled(Button)({
    fontFamily: '"Russo One", sans-serif', 
    backgroundColor: '#d31c20', 
    color: "white", 
    borderRadius: '4px', 
    padding: '12px'
})

