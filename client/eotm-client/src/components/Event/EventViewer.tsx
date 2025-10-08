import { useEffect, useRef } from "react";
import type { EventResponse } from "../../types/response/EventResponse";
import { Button} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack'


function EventViewer() {

    const { id } = useParams();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    const { event } = location.state as { event: EventResponse }
    


    const navigate = useNavigate();

    const handleResources = () => {
        if(event) {
            if(event.fuelFound > 0) {
                enqueueSnackbar(`Collected ${event.fuelFound}L of fuel`, { variant: 'default', autoHideDuration: 3000 })
            }
            if(event.scrapFound > 0) {
                enqueueSnackbar(`Collected ${event.scrapFound} pieces of scrap`, { variant: 'default', autoHideDuration: 3000 })
            }
            if(event.mgrCollected > 0) {
                enqueueSnackbar(`Collected ${event.mgrCollected} Military Grade Rounds`, { variant: 'default', autoHideDuration: 3000 })
            }
            if(event.badge) {
                enqueueSnackbar(<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={event.badge.badgeImagePath} style={{ width: 24, height: 24 }} />
                    <span>Earned The '{event.badge.badgeName}' Badge</span>
                </div>, { variant: 'default', autoHideDuration: 3000 })
            } 
        }
    }

    const hasNotified = useRef(false);

    useEffect(() => {
        if(!hasNotified.current) {
            handleResources();
            hasNotified.current = true;
            const audio = new Audio(event.soundPath);
            audio.play();
        }
    }, [event])

    return (
        <>
            
            
            <p>{event.text}</p>
            <Button onClick={() => navigate(`/location/${id}`, { replace: true })}>Continue to Destination</Button>
        </>
    )
}

export default EventViewer;