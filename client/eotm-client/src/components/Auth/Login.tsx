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
                        onChange={handleChange} />
                    <TextField
                        name="password"
                        label="Password"
                        onChange={handleChange} />
                    <Button variant="outlined" color="primary" onClick={handleLogin}>Login</Button>
                    <label>OR</label>
                    <Button variant="outlined" color="primary" onClick={handleRegister}>Register</Button>
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