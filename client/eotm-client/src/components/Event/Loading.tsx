import { Box } from "@mui/material";
import Bootprint from "./Bootprint";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { generateEvent } from "../../api/EventAPI";


function Loading() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { appUser } = useAuth();

    useEffect(() => {
        const fetchEvent = async () => {
            if (!appUser) return;

            try {
                

                // Start the timer AFTER event is loaded
                const waitTime = Math.random() * 2000 + 8000;
                console.log(`Waiting for ${(waitTime / 1000).toFixed(2)} seconds`);
                const timer = setTimeout(() => {
                    navigate(`/event/${id}`, { replace: true });
                }, waitTime);

                // Cleanup
                return () => clearTimeout(timer);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvent();
    }, [appUser, id, navigate]);

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',      // stay fixed relative to viewport
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', // center
                    zIndex: 1000,           // optional: make sure it's on top
                }}
            >
                <Bootprint />
            </Box>
        </>
    )
}

export default Loading;