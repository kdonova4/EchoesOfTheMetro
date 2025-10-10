import { Box, Modal, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { GiBullets } from "react-icons/gi";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import './profile.css'
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
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    display: 'inline-block',
                    zIndex: 1000
                }}
            >


                







                <img className="stat-viewer" onClick={handleClickOpen} src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1759973965/journal-icon_dcxkmy.png" />





                <Modal open={open} onClose={handleClose}>
                    <ProfilePage />
                </Modal>










                {/** 
                 * 
                 * <Stack direction="row" alignItems="center">
                    <AccountCircleIcon fontSize="large"/>
                   <Box sx={{ margin: 1, color: 'black' }}>{appUser.username} | Stats</Box> 
                </Stack>
                
                <img src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1759973965/journal-icon_dcxkmy.png"/>
                    <Stack direction="row" alignItems= "center">
                    <DeleteIcon fontSize="medium"/>
                    <Box sx={{ margin: 1, color: 'black', fontSize: 34, fontWeight: 'medium' }}>
                        {appUser.scrap}
                    </Box>

                    <GasMeterIcon style={{ marginLeft: 50 }} fontSize="large"/>
                    <Box sx={{ margin: 1, color: 'black', fontSize: 34, fontWeight: 'medium' }}>
                        {appUser.fuel}
                    </Box>

                    <GiBullets style={{ marginLeft: 50 }} fontSize="large"/>
                    <Box sx={{ margin: 1, color: 'black', fontSize: 34, fontWeight: 'medium' }}>
                        {appUser.mgr}
                    </Box>
                    
                </Stack>
                 */}



            </Box>
        </>
    )
}

export default StatsViewer;