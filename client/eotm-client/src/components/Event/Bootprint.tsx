import { Container, Stack } from '@mui/material';
import bootprintUrl from '../../assets/bootprint-white.svg';
import './loading.css';




function Bootprint() {


  return (
    <>
      <Container style={{ alignItems: "center" }}>
        <Stack direction="row">
          <div style={{ marginRight: 60, transform: 'scaleX(-1)', display: 'inline-block' }}>
            <img src={bootprintUrl} className="bootprint-left" alt="bootprint" />
          </div>
          <div style={{ display: 'inline-block' }}>
            <img src={bootprintUrl} className="bootprint-right" alt="bootprint" />
          </div>
        </Stack>

      </Container>

    </>
  )
}

export default Bootprint;