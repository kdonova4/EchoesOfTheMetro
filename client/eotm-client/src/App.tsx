import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import Login from './components/Auth/Login'
import { AuthProvider } from './hooks/AuthContext'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import TravelPage from './components/Location/TravelPage';
import LocationPage from './components/Location/LocationPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient();

  return (
    <>
      <AppBar style={{ backgroundColor: "orange", color: "black" }} position='static'>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant='h6'>
            Echoes of The Metro
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Container maxWidth="xl">
          <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/travel' element={<TravelPage />} />
              <Route path='/location/:id' element={<LocationPage />} />
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
          

        </Container>
      </Router>

    </>
  )
}

export default App
