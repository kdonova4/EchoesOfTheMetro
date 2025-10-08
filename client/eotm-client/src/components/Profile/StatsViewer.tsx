import { Box, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { GiBullets } from "react-icons/gi";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from "../../hooks/AuthContext";
import { useEffect } from "react";


function StatsViewer() {

    const { appUser, getMe } = useAuth();

    useEffect(() => {
        getMe();
    }, [])


    if(!appUser) {
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
                    color: 'black',
                    backgroundColor: 'orange',
                    position: "fixed",
                    bottom: 15,
                    right: 15,
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    maxWidth: 800,
                    minWidth: 300,
                }}
            >
                <Stack direction="row" alignItems="center">
                    <AccountCircleIcon fontSize="large"/>
                   <Box sx={{ margin: 1, color: 'black' }}>{appUser.username} | Stats</Box> 
                </Stack>
                
                
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
                
                
            </Box>
        </>
    )
}

export default StatsViewer;