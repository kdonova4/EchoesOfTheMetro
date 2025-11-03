import { useEffect, useState } from "react";
import type { LocationResponse } from "../../types/response/LocationResponse";
import { fetchAllLocations } from "../../api/LocationAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Tooltip, useMediaQuery } from "@mui/material";
import TypewriterText from "../Journal/TypewriterText";
import { locationList, mobileLocationList } from './locations'
import { playSound, travelSound } from "../../sounds";
type TravelProps = {
  handleClose?: () => void;
}

const props = {
  tooltip: {
    sx: {
      backgroundColor: '#da00007a',
      color: 'white',
      maxWidth: 400,
      whiteSpace: 'normal',
      fontFamily: '"Rock Salt", cursive',
      fontSize: '14px',
      padding: '6px 10px',
      textAlign: 'center',
    },
  },
  arrow: { sx: { color: '#da00007a' } },
}

function TravelPage({ handleClose }: TravelProps) {

  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const { id } = useParams();
  const locationId = Number(id);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:960px)');

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
    if (travelTo === locationId) {
      navigate('')
      handleClose?.();
    } else {
      playSound(travelSound)
      navigate(`/traveling/${travelTo}`)
    }
  }


if(isMobile) {
  return (
    <>

      <Box

        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
          width: '100%',
        }}

        onClick={handleClose}
      >
        <Box
          sx={{
            width: '110vw',
            maxWidth: '1170px',
            height: 'auto',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Background map */}
          <img
            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1761176300/map-background_w28ody.png"
            alt="Map"
            className="background-img"
            
          />

          {/* Marker wrapper */}
          {locations.map((location) => (
            <Box
              key={location.locationId}
              className="location-mark"
              sx={{
                position: 'absolute',
                top: location.locationId && mobileLocationList[location.locationId - 1].top,
                left: location.locationId && mobileLocationList[location.locationId - 1].left,
                transform: 'translate(-50%, -50%)',
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
              
            </Box>
          ))}
        </Box>
      </Box>

    </>
  )
}
  return (
    <>

      <Box

        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
          width: '100%',
        }}

        onClick={handleClose}
      >
        <Box
          sx={{
            width: '110vw',
            maxWidth: '1170px',
            height: 'auto',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Background map */}
          <img
            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1761176300/map-background_w28ody.png"
            alt="Map"
            className="background-img"
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
                componentsProps={props}
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

    </>
  )
}

export default TravelPage;