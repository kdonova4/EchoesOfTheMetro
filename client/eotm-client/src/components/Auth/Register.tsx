import { useState } from "react";
import type { AppUserCreateRequest } from "../../types/create/AppUserCreateRequest";
import { register } from "../../api/AppUserAPI";
import { useNavigate } from "react-router-dom";
import { Button, Snackbar, Stack, TextField } from "@mui/material";

function Register() {

    const [open, setOpen] = useState(false);
    const [credentials, setCredentials] = useState<AppUserCreateRequest>({
        email: '',
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials, [event.target.name]: event.target.value
        })
    }

    const handleRegister = async () => {
        try {
            await register(credentials);
            
            navigate("/");
        } catch (e) {
            if (Array.isArray(e)) {
                setErrors(e);
            }
            setOpen(true);
        }
    };

    const goToLogin = () => {
        navigate('/')
    }

    return (
        <>
            <Stack spacing={2} alignItems="center" mt={2}>
                <TextField
                    name="email"
                    label="Email"
                    onChange={handleChange}
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
                    />
                <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange} 
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
                    />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleChange} 
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
                    />
                <Button sx={{ backgroundColor: '#d31c20', color: "white", borderRadius: 1, padding:1.5 }} onClick={handleRegister}>Register</Button>
                <div style={{ borderBottom: '1px solid #cfcfd1', width: '250px' }}></div>
                <Button sx={{ backgroundColor: '#d31c20', color: "white", borderRadius: 1, padding:1.5 }} onClick={goToLogin}>Login</Button>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={errors[0]}// <-- list only first error
            />

        </>
    )
}

export default Register;