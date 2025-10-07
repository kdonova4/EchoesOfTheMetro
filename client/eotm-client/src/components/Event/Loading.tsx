import { Box, Container } from "@mui/material";
import Bootprint from "./Bootprint";

type LoadingProps = {
    locationId?: number;
}

function Loading({ locationId }: LoadingProps) {

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