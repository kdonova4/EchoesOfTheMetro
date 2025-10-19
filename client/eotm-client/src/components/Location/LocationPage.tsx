import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { LocationResponse } from "../../types/response/LocationResponse";
import { fetchLocationById } from "../../api/LocationAPI";
import JournalList from "../Journal/JournalList";
import { Box, Button, Container, Stack } from "@mui/material";
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

    useEffect(() => {
        setSelectedJournal(null)
    }, [id])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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

    useEffect(() => {
        fetchLocation();
    }, [id])



    if (!location) {
        return <h1>Loading...</h1>
    } else {
        return (
            <>









            
                <h1>{location.locationName}</h1>
                <p>{location.description}</p>
                <StatsViewer />
                <Button onClick={handleOpen}>Travel</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <TravelPage handleClose={handleClose} />
                    </Box>
                </Modal>
                <JournalForm />
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
                        <Container>
                            <JournalList onSelectJournal={setSelectedJournal} />
                        </Container>
                        <Container>
                            <JournalViewer journal={selectedJournal} />
                        </Container>
                    </Stack>
                </div>


            </>
        )
    }


}

export default LocationPage;