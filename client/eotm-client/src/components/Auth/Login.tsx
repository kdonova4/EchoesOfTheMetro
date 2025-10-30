import { useState } from "react";
import type { Credentials } from "../../types/login/Credentials";
import { Snackbar, Stack } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import TravelPage from "../Location/TravelPage";
import { AuthButton, CustomTextField, fieldProps } from "./MuiTypes";
import { onClickSound, playSound } from "../../sounds";
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
            playSound(onClickSound)
            navigate('/travel')
        }).catch(() => {
        playSound(onClickSound)
          setOpen(true)  
        })

    }

    const handleRegister = () => {
        playSound(onClickSound);
        navigate("/register");
    }

    if (token) {
        return <TravelPage />
    } else {
        return (
            <>
                <Stack spacing={2} alignItems="center" mt={2}>
                    
                    <CustomTextField

                        name="username"
                        label="Username"
                        variant="filled"
                        slotProps={fieldProps}
                        onChange={handleChange}
                    />
                    
                    <CustomTextField
                        name="password"
                        label="Password"
                        type="password"
                        variant="filled"
                        slotProps={fieldProps}
                        onChange={handleChange} />
                        
                    <AuthButton onClick={handleLogin}>Login</AuthButton>
                    <div className="seperator"></div>
                    <AuthButton onClick={handleRegister}>Register</AuthButton>
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