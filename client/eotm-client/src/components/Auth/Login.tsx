import { useState } from "react";
import type { Credentials } from "../../types/login/Credentials";
import { Button, Snackbar, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import TravelPage from "../Location/TravelPage";
function Login() {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: ''
    })

    const { token, login } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials, [event.target.name]: event.target.value
        });
    }

    const handleLogin = () => {
        axios.post(import.meta.env.VITE_API_URL + "/api/users/login", credentials, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            const jwtToken = res.headers.authorization;


            if (jwtToken !== null) {
                login(jwtToken);
                sessionStorage.setItem("jwt", jwtToken);
            }
            navigate('/travel')
        }).catch(() => setOpen(true))

    }

    const handleRegister = () => {
        navigate("/register");
    }

    if (token) {
        console.log(token)
        return <TravelPage />
    } else {
        return (
            <>
                <Stack spacing={2} alignItems="center" mt={2}>
                    <TextField

                        name="username"
                        label="Username"
                        variant="filled"
                        sx={{
                            backgroundColor: '#cfcfd1',
                            borderRadius: 1,

                            // Target the underline pseudo-elements
                            '& .MuiFilledInput-underline:after': {
                                borderBottomColor: '#d31c20', // focused color
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                sx: {
                                    color: '#333',
                                    '&.Mui-focused': { color: '#d31c20' },
                                },
                            },
                        }}
                        onChange={handleChange}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        variant="filled"
                        sx={{
                            backgroundColor: '#cfcfd1',
                            borderRadius: 1,

                            // Target the underline pseudo-elements
                            '& .MuiFilledInput-underline:after': {
                                borderBottomColor: '#d31c20', // focused color
                            },
                        }}
                        slotProps={{
                            inputLabel: {
                                sx: {
                                    color: '#333',
                                    '&.Mui-focused': { color: '#d31c20' },
                                },
                            },
                        }}
                        onChange={handleChange} />
                    <Button sx={{ backgroundColor: '#d31c20', color: "white", borderRadius: 1, padding:1.5 }}  onClick={handleLogin}>Login</Button>
                    
                    <div style={{ borderBottom: '1px solid #cfcfd1', width: '250px' }}></div>
                    <Button sx={{ backgroundColor: '#d31c20', color: "white", borderRadius: 1, padding:1.5 }}  onClick={handleRegister}>Register</Button>
                </Stack>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login Failed: Check your username and password"
                />
            </>
        )

    }
}

export default Login;