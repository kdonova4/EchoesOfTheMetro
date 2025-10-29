import { Box } from "@mui/material";
import Bootprint from "./Bootprint";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";


function Loading() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { appUser } = useAuth();

    useEffect(() => {
        const fetchEvent = async () => {
            if (!appUser) return;

            try {
                

                
                const waitTime = Math.random() * 2000 + 8000;
                console.log(`Waiting for ${(waitTime / 1000).toFixed(2)} seconds`);
                const timer = setTimeout(() => {
                    navigate(`/event/${id}`, { replace: true });
                }, waitTime);

                
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
                    position: 'fixed',      
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', 
                    zIndex: 1000,           
                }}
            >
                <Bootprint />
            </Box>
        </>
    )
}

export default Loading;