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
                    onChange={handleChange} />
                <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange} />
                <TextField
                    name="password"
                    label="Password"
                    onChange={handleChange} />
                <Button variant="outlined" color="primary" onClick={handleRegister}>Register</Button>
                <label>OR</label>
                <Button variant="outlined" color="primary" onClick={goToLogin}>Login</Button>
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