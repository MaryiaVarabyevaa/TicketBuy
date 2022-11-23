import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";

const theme = createTheme();

const CinemaFrom = () => {
    const [isOpenForm, setIsOpenForm] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Button variant="text" onClick={() => setIsOpenForm(!isOpenForm)}>
                        {
                            isOpenForm? 'Hide the form' :' Add cinema to the list'
                        }
                    </Button>
                    {
                        isOpenForm &&  <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="cinema"
                                label="Cinema name"
                                name="cinema"
                                autoComplete="cinema"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="number-halls"
                                label="Number of halls"
                                name="halls"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add
                            </Button>
                        </Box>
                    }
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CinemaFrom;