import { useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";

function TravelPage() {

    const { appUser } = useAuth();

    useEffect(() => {
        console.log(appUser)
    }, [appUser])

    return(
        <>
            <p>Travel Page</p>
        </>
    )
}

export default TravelPage;