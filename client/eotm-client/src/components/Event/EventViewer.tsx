import { useEffect, useRef, useState } from "react";
import type { EventResponse } from "../../types/response/EventResponse";
import { Box, Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../../hooks/AuthContext";
import { generateEvent } from "../../api/EventAPI";
import './loading.css'

function EventViewer() {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const { appUser } = useAuth();
    const event = useRef<EventResponse | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setReady] = useState(false);
    const hasNotified = useRef(false);
    const navigate = useNavigate();

    const isFetching = useRef(false);

    const fetchEvent = async () => {
        if (!appUser || isFetching.current) return;
        isFetching.current = true;

        try {
            const key = `event_${id}_${appUser.appUserId}`;
            const stored = sessionStorage.getItem(key);

            if (stored) {
                event.current = JSON.parse(stored);
                setIsLoaded(true);
                return;
            }

            const response = await generateEvent(Number(id), appUser.appUserId);
            event.current = response;
            sessionStorage.setItem(key, JSON.stringify(response));
            setIsLoaded(true);
        } catch (error) {
            console.error(error);
        } finally {
            isFetching.current = false;
        }
    };


    const handleResources = () => {
        const e = event.current;
        if (!e) return;

        if (e.fuelFound > 0) {
            enqueueSnackbar(
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760730508/fuel_icon_ferytw.png" style={{ height: '24px', width: 'auto' }} />
                    <span style={{ fontFamily: '"Russo One", sans-serif', }}>Collected {e.fuelFound}L of fuel</span>
                </div>,
                { autoHideDuration: 8000 }
            );
        }
        if (e.scrapFound > 0) {
            enqueueSnackbar(
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760730508/scrap_icon_w6v9lt.png" style={{ height: '24px', width: 'auto' }} />
                    <span style={{ fontFamily: '"Russo One", sans-serif', }}>Collected {e.scrapFound} pieces of scrap</span>
                </div>,
                { autoHideDuration: 8000 }
            );
        }
        if (e.mgrCollected > 0) {
            enqueueSnackbar(
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760730508/mgr_icon_caywlj.png" style={{ height: '24px', width: 'auto' }} />
                    <span style={{ fontFamily: '"Russo One", sans-serif', }}>Collected {e.mgrCollected} Military Grade Rounds</span>
                </div>,
                { autoHideDuration: 8000 }
            );
        }
        if (e.badge) {
            enqueueSnackbar(
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src={e.badge.badgeImagePath} style={{ width: 24, height: 24 }} />
                    <span style={{ fontFamily: '"Russo One", sans-serif', }}>Earned '{e.badge.badgeName}' Badge</span>
                </div>,
                { autoHideDuration: 8000 }
            );
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id, appUser]);

    useEffect(() => {
        if (isLoaded && !hasNotified.current && event.current) {
            handleResources();
            hasNotified.current = true;
            const audio = new Audio(event.current.soundPath);
            audio.play();
        }
    }, [isLoaded]);

    if (!isLoaded || !event.current) {
        return <h1></h1>;
    }

    return (
        <>

            <Container sx={{ position: 'relative', display: "flex", flexDirection: 'column', alignItems: 'center' }}>


                
            {event.current.mediaPath === null ? (
                <Box
                    sx={{

                        display: 'flex',
                        flexDirection: 'column',  // stack p and button vertically
                        justifyContent: 'center', // center vertically
                        alignItems: 'center',
                        
                        marginTop: 20,
                        gap: 4     // center horizontally
                    }}
                >
                    <p style={{fontFamily: '"Russo One", sans-serif',}}>{event.current.text}</p>
                    <Button
                        sx={{ color: '#d31c20', fontFamily: '"Stalinist One", sans-serif' }}
                        onClick={() => {
                            navigate(`/location/${id}`, { replace: true });
                            sessionStorage.removeItem(`event_${id}_${appUser?.appUserId}`);
                        }}
                    >
                        Continue to Destination
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{

                        display: 'flex',
                        flexDirection: 'column',  // stack p and button vertically
                        justifyContent: 'center', // center vertically
                        alignItems: 'center',
                        marginTop: 2,
                        gap: 4     // center horizontally
                    }}
                ><div
                    style={{
                        display: 'inline-block',    // shrink to fit the image
                        marginTop: 10,
                        width: '40vw',
                        height: 'auto',           // rounded corners
                        aspectRatio: '16/9',
  // ensures rounded corners clip the image
                    }}
                >
                    <img
                    className={`jump-in ${ready ? "jump-in-loaded" : ""}`}
                        onLoad={() => setReady(true)}
                        src={event.current.mediaPath}
                        style={{
                            display: 'block', 
                            borderRadius: 20,        // removes inline spacing issues
                            width: '40vw',            // scales to fit the container width
                            
                            height: 'auto',           // keeps aspect ratio       // scales responsively vertically
                            objectFit: 'contain',     // preserves aspect ratio
                        }}
                    />
                </div>
                    <p style={{fontFamily: '"Russo One", sans-serif',}}>{event.current.text}</p>
                    <Button
                        sx={{ color: '#d31c20', fontFamily: '"Stalinist One", sans-serif', }}
                        onClick={() => {
                            navigate(`/location/${id}`, { replace: true });
                            sessionStorage.removeItem(`event_${id}_${appUser?.appUserId}`);
                        }}
                    >
                        Continue to Destination
                    </Button>
                </Box>
            )}
                


            </Container>

        </>
    );
}

export default EventViewer;
