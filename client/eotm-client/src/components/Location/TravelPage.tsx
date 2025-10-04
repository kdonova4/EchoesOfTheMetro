import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import type { LocationResponse } from "../../types/response/LocationResponse";
import { fetchAllLocations } from "../../api/LocationAPI";
import { Link } from "react-router-dom";

function TravelPage() {

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
                            <Link to={`/location/${location.locationId}`}>{location.locationName}</Link>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default TravelPage;