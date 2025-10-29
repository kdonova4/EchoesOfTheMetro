import { Button, styled, TextField } from "@mui/material";

export const fieldProps = {
    inputLabel: {
        sx: {
            color: '#333',
            '&.Mui-focused': { color: '#d31c20' },
        },
    },
}

export const CustomTextField = styled(TextField)({
    backgroundColor: '#cfcfd1',
    borderRadius: '8px',
    '& .MuiFilledInput-underline:after': {
        borderBottomColor: '#d31c20',
    },
})


export const AuthButton = styled(Button)({
    fontFamily: '"Russo One", sans-serif', 
    backgroundColor: '#d31c20', 
    color: "white", 
    borderRadius: 4, 
    padding: '12px'
})

