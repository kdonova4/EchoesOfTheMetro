import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { LocationResponse } from "../../types/response/LocationResponse";
import { fetchLocationById } from "../../api/LocationAPI";
import JournalList from "../Journal/JournalList";
import { Box, CardContent, Container, Stack, Typography, useMediaQuery } from "@mui/material";
import JournalViewer from "../Journal/JournalViewer";
import Modal from '@mui/material/Modal';
import type { JournalResponse } from "../../types/response/JournalResponse";
import JournalForm from "../Journal/JournalForm";
import TravelPage from "./TravelPage";
import StatsViewer from "../Profile/StatsViewer";
import { LocationCard, MobileLocationDescription, MobileLocationName, TravelButton } from "./MuiLocationTypes";
import { mapSound } from "../../sounds";



function LocationPage() {

    const [loaded, setLoaded] = useState(false);
    const [location, setLocation] = useState<LocationResponse | null>(null)
    const [selectedJournal, setSelectedJournal] = useState<JournalResponse | null>(null);
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const isMobile = useMediaQuery('(max-width:960px)');

    useEffect(() => {
        setSelectedJournal(null)
    }, [id])



    const fetchLocation = async () => {
        try {
            const response = await fetchLocationById(Number(id));

            setLocation(response);

        } catch (e) {
            console.error(e)
        }
    }

    const handleClose = () => setOpen(false)
    const handleOpen = () => {
        const audio = new Audio(mapSound);
        audio.play();
        setOpen(true)
    }

    useEffect(() => {
        fetchLocation();
    }, [id])



    if (!location) {
        return <h1>Loading...</h1>
    } else {

        if (isMobile) {
            return (
                <>

                    <video
                        className={`fade-in ${loaded ? "fade-in-loaded" : ""} video-background`}
                        onCanPlay={() => setLoaded(true)}
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="https://res.cloudinary.com/dhucaqc0o/video/upload/v1760816718/mylivewallpapers.com-Metro-2033-Redux_hmczdy.mp4" type="video/mp4" />
                    </video>

                    <LocationCard>


                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                                <MobileLocationName>
                                    {location.locationName}
                                </MobileLocationName>

                                <MobileLocationDescription sx={{ fontFamily: '"Russo One", sans-serif', fontSize: '1rem' }}>
                                    {location.description}
                                </MobileLocationDescription>
                            </Box>
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'right',
                                    gap: 2,
                                }}
                            >
                                <JournalForm />

                                <TravelButton onClick={handleOpen}>Travel</TravelButton>
                            </Box>

                        </CardContent>
                    </LocationCard>

                    <div className="journal-viewer-div">
                        <JournalViewer journal={selectedJournal} />
                    </div>

                    <div className="journal-list-div">
                        <JournalList onSelectJournal={setSelectedJournal} />
                    </div>




                    <Modal

                        open={open}
                        onClose={handleClose}
                    >
                        <div className="map">
                            <TravelPage handleClose={handleClose} />
                        </div>


                    </Modal>
                    <StatsViewer />
                </>
            )
        } else {
            return (
                <>
                    <LocationCard sx={{ maxWidth: '100%', backgroundColor: '#3904058c', color: 'white', marginTop: 5, position: 'relative', borderRadius: 1 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <Typography className="stalin">
                                    {location.locationName}
                                </Typography>
                                <Typography className="russo">
                                    {location.description}
                                </Typography>
                            </Box>
                            <Box
                                sx={{

                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'right',
                                    gap: 2,
                                }}
                            >
                                <JournalForm />
                                <TravelButton onClick={handleOpen}>Travel</TravelButton>
                            </Box>

                        </CardContent>
                    </LocationCard>


                    <StatsViewer />
                    <Modal

                        open={open}
                        onClose={handleClose}
                    >
                        <div className="map">
                            <TravelPage handleClose={handleClose} />
                        </div>


                    </Modal>


                    <div>
                        
                        <video
                            className={`fade-in ${loaded ? "fade-in-loaded" : ""}`}
                            onCanPlay={() => setLoaded(true)}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                objectFit: 'cover',
                                zIndex: -1,
                            }}
                        >
                            <source src="https://res.cloudinary.com/dhucaqc0o/video/upload/v1760816718/mylivewallpapers.com-Metro-2033-Redux_hmczdy.mp4" type="video/mp4" />
                        </video>
                        <Stack direction="row" sx={{ height: '75vh', gap: 5, mt: 6 }}>
                            <Container>
                                <JournalList onSelectJournal={setSelectedJournal} />
                            </Container>
                            <Container sx={{ minWidth: '800px' }}>
                                <JournalViewer journal={selectedJournal} />
                            </Container>
                        </Stack>
                    </div>


                </>
            )
        }


    }


}

export default LocationPage;