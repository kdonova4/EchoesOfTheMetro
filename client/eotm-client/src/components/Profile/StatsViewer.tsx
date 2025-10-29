import { Box, Modal } from "@mui/material";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import ProfilePage from "./ProfilePage";

function StatsViewer() {

    const { appUser, getMe } = useAuth();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getMe();
    }, [])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    if (!appUser) {
        return (
            <>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        position: "fixed",
                        bottom: 15,
                        right: 15,
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        maxWidth: 800,
                        minWidth: 500,
                    }}
                >
                    Loading...
                </Box>
            </>
        )
    }

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    bottom: 15,
                    right: 15,
                    p: 2,
                    display: 'inline-block',
                    zIndex: 1000,
                }}
            >
                <img style={{ height: '98px' }} className="stat-viewer" onClick={handleClickOpen} src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1759973965/journal-icon_dcxkmy.png" />
                <Modal open={open} onClose={handleClose}>
                    <ProfilePage handleClose={handleClose} />
                </Modal>
            </Box>
        </>
    )
}

export default StatsViewer;