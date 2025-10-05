import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { LocationResponse } from "../../types/response/LocationResponse";
import { fetchLocationById } from "../../api/LocationAPI";
import JournalList from "../Journal/JournalList";
import { Container, Stack } from "@mui/material";
import JournalViewer from "../Journal/JournalViewer";
import type { JournalResponse } from "../../types/response/JournalResponse";
import JournalForm from "../Journal/JournalForm";

function LocationPage() {

    const [location, setLocation] = useState<LocationResponse | null>(null)
    const [selectedJournal, setSelectedJournal] = useState<JournalResponse | null>(null);
    const { id } = useParams();

    const fetchLocation = async () => {
        try {
            const response = await fetchLocationById(Number(id));

            setLocation(response);

        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchLocation();
    }, [])

    if (!location) {
        return <h1>Loading...</h1>
    } else {
        return (
            <>
                <h1>{location.locationName}</h1>
                <p>{location.description}</p>
                <JournalForm/>
                <Stack direction="row">
                    <Container>
                        <JournalList onSelectJournal={setSelectedJournal}/>
                    </Container>
                    <Container>
                        <JournalViewer journal={selectedJournal} />
                    </Container>
                </Stack>

            </>
        )
    }


}

export default LocationPage;