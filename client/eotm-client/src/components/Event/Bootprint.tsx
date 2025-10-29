import { Container, Stack } from '@mui/material';
import bootprintUrl from '../../assets/bootprint-white.svg';





function Bootprint() {


  return (
    <>
      <Container style={{ alignItems: "center" }}>
        <Stack direction="row">
          <div className='bootprint-left-div'>
            <img src={bootprintUrl} className="bootprint-left" alt="bootprint" />
          </div>
          <div className='bootprint-right-div'>
            <img src={bootprintUrl} className="bootprint-right" alt="bootprint" />
          </div>
        </Stack>
      </Container>

    </>
  )
}

export default Bootprint;