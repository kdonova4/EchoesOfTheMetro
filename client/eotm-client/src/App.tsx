import { Container, CssBaseline } from '@mui/material'
import './App.css'
import Login from './components/Auth/Login'
import { AuthProvider } from './hooks/AuthContext'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import TravelPage from './components/Location/TravelPage';

function App() {
  

  return (
    <>
    <Router>
      <Container maxWidth="xl">
        <CssBaseline/>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/travel' element={<TravelPage/>}/>
          </Routes>
        </AuthProvider>
        
      </Container>
    </Router>
      
    </>
  )
}

export default App
