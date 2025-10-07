import { useEffect, useState } from "react";
import type { LocationResponse } from "../../types/response/LocationResponse";
import { fetchAllLocations } from "../../api/LocationAPI";
import { Link } from "react-router-dom";

type TravelProps = {
    handleClose?: () => void;
}

function TravelPage({ handleClose }: TravelProps) {

    const [locations, setLocations] = useState<LocationResponse[]>([]);

    const fetchLocations = async () => {
        try {
            const response = await fetchAllLocations();

            setLocations(response);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchLocations();
    }, [])

    

    return(
        <>
            <div>
                <ul>
                    {locations.map((location) => (
                        <div key={location.locationId}>
                            <Link onClick={handleClose} to={`/location/${location.locationId}`}>{location.locationName}</Link>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default TravelPage;