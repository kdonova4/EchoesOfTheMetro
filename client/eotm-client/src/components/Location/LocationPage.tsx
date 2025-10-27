import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { LocationResponse } from "../../types/response/LocationResponse";
import { fetchLocationById } from "../../api/LocationAPI";
import JournalList from "../Journal/JournalList";
import { Box, Button, Card, CardContent, Container, Stack, Typography, useMediaQuery, type Theme } from "@mui/material";
import JournalViewer from "../Journal/JournalViewer";
import Modal from '@mui/material/Modal';
import type { JournalResponse } from "../../types/response/JournalResponse";
import JournalForm from "../Journal/JournalForm";
import TravelPage from "./TravelPage";
import StatsViewer from "../Profile/StatsViewer";

import './location.css'

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

    const style = {
        position: 'relative', // instead of absolute
        width: '100%',
        height: '100%',
        transform: '',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent', // remove default background
        boxShadow: 'none',         // remove default shadow
        padding: 0,
        margin: 0,
    };


    const fetchLocation = async () => {
        try {
            const response = await fetchLocationById(Number(id));

            setLocation(response);

        } catch (e) {
            console.error(e)
        }
    }

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    const selectJournal = (Journal: JournalResponse) => {

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
                                objectPosition: '30% center',
                                zIndex: -1, // 👈 puts it behind everything
                            }}
                        >
                            <source src="https://res.cloudinary.com/dhucaqc0o/video/upload/v1760816718/mylivewallpapers.com-Metro-2033-Redux_hmczdy.mp4" type="video/mp4" />
                        </video><Card sx={{ maxWidth: '100%', backgroundColor: '#3904058c', color: 'white', marginTop: 5, position: 'relative', borderRadius: 1 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <Typography sx={{ fontFamily: '"Stalinist One", sans-serif', fontSize: '1.4rem' }}>
                                    {location.locationName}
                                </Typography>
                                <Typography sx={{ fontFamily: '"Russo One", sans-serif', fontSize: '1rem' }}>
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
                                <Button sx={{ fontFamily: '"Russo One", sans-serif', backgroundColor: '#d31c20', color: "white", borderRadius: 1, padding: 1.5 }} onClick={handleOpen}>Travel</Button>
                            </Box>

                        </CardContent>
                    </Card>
                    <div style={{ overflowX: 'hidden', overflowY: 'hidden', paddingTop: 10 }}>
                        <JournalViewer journal={selectedJournal} />
                    </div>
                    <div style={{ height: '95vh', paddingBottom: 60, }}>
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









                    <Card sx={{ maxWidth: '100%', backgroundColor: '#3904058c', color: 'white', marginTop: 5, position: 'relative', borderRadius: 1 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <Typography sx={{}} className="stalin">
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
                                <Button sx={{ fontFamily: '"Russo One", sans-serif', backgroundColor: '#d31c20', color: "white", borderRadius: 1, padding: 1.5 }} onClick={handleOpen}>Travel</Button>
                            </Box>

                        </CardContent>
                    </Card>


                    <StatsViewer />
                    <Modal

                        open={open}
                        onClose={handleClose}
                    >
                        <div className="map">
                            <TravelPage handleClose={handleClose} />
                        </div>


                    </Modal>

                    <div style={{}}>
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
                                zIndex: -1, // 👈 puts it behind everything
                            }}
                        >
                            <source src="https://res.cloudinary.com/dhucaqc0o/video/upload/v1760816718/mylivewallpapers.com-Metro-2033-Redux_hmczdy.mp4" type="video/mp4" />
                        </video>

                        <Stack direction="row" sx={{ height: '75vh', gap: 5, mt: 6 }}>
                            <Container sx={{}}>
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