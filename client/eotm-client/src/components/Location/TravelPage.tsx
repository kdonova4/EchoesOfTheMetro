import { useEffect, useState } from "react";
import type { LocationResponse } from "../../types/response/LocationResponse";
import { fetchAllLocations } from "../../api/LocationAPI";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Tooltip } from "@mui/material";
import TypewriterText from "../Journal/TypewriterText";
import { locationList } from './locations'
type TravelProps = {
    handleClose?: () => void;
}



function TravelPage({ handleClose }: TravelProps) {

    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const { id } = useParams();
    const locationId = Number(id);
    const navigate = useNavigate();

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

    const navTo = (travelTo: number) => {
        if(travelTo === locationId) {
            navigate('')
            handleClose?.();
        } else {
            navigate(`/traveling/${travelTo}`)
        }
    }
    
    return (
        <>

            <Box
            
  sx={{
    display: 'flex',
    justifyContent: 'center', // center children horizontally
    alignItems: 'center',     // center children vertically
    minHeight: '90vh',        // so it fills most of the viewport vertically
    width: '100%',            // full width of parent
  }}

  onClick={handleClose}
>
  <Box
    sx={{
      outline: '2px solid green',
      width: '80vw',
      maxWidth: '1170px',
      height: 'auto',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onClick={(e) => {
    e.stopPropagation(); // stops the click from bubbling to parent elements
    console.log("Box clicked!");
  }}
  >
    {/* Background map */}
    <img
      src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1761176300/map-background_w28ody.png"
      alt="Map"
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
      }}
    />

    {/* Marker wrapper */}
    {locations.map((location) => (
      <Box
        key={location.locationId}
        className="location-mark"
        sx={{
          position: 'absolute',
          top: location.locationId && locationList[location.locationId - 1].top,
          left: location.locationId && locationList[location.locationId - 1].left,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Tooltip
          title={<TypewriterText text={location.locationName} speed={50} />}
          placement="right"
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: '#da00007a',
                color: 'white',
                maxWidth: 400,
                whiteSpace: 'normal',
                fontSize: '14px',
                padding: '6px 10px',
                textAlign: 'center',
              },
            },
            arrow: { sx: { color: '#da00007a' } },
          }}
        >
          <img
            onClick={() => navTo(location.locationId)}
            src={
              location.locationId === locationId
                ? 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761181758/location-mark-icon-selected_upg7gp.png'
                : 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761177203/location-mark-icon_uyof2q.png'
            }
            alt="Marker"
            style={{ width: '100%', height: '100%', cursor: 'pointer' }}
          />
        </Tooltip>
      </Box>
    ))}
  </Box>
</Box>

            




            {/**
           * 
           * <div>
                <ul>
                    {locations.map((location) => (
                        location.locationId === locationId ? (
                            <div key={location.locationId}>
                                <Link onClick={handleClose} to={``}>{location.locationName} &lt;</Link>
                            </div> 
                        ) : (
                           <div key={location.locationId}>
                            <Link onClick={handleClose} to={`/traveling/${location.locationId}`}>{location.locationName}</Link>
                        </div> 
                        )
                        
                    ))}
                </ul>
            </div>
           */}

        </>
    )
}

export default TravelPage;