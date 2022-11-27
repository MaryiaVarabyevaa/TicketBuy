import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {cinemaNameValidation, hallsNumberValidation} from "./validation";
import {ICinemaForm} from "../../types/form";


const theme = createTheme();

const CinemaFrom = () => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const { handleSubmit, control } = useForm<ICinemaForm>({
        mode: 'onChange',
        defaultValues: {
           cinemaName: '',
           hallsNumber: ''
        }
    });
    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<ICinemaForm> = async (data)=> {
        console.log(data);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                maxWidth="xs"
            >
                <Button variant="text" onClick={() => setIsOpenForm(!isOpenForm)}>
                    {
                        isOpenForm? 'Hide the form for adding cinemas' :' Show the form for adding cinemas'
                    }
                </Button>
                {
                    isOpenForm &&  <Box component="form" onSubmit={handleSubmit(onSubmit)}  noValidate sx={{ mt: 1 }}>
                        <Controller
                            control={ control }
                            name='cinemaName'
                            rules={ cinemaNameValidation }
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="cinema"
                                    label="Cinema name"
                                    autoComplete="cinema"
                                    autoFocus
                                    onChange={onChange}
                                    value={value}
                                    error={!!errors.cinemaName?.message}
                                    helperText={ errors.cinemaName?.message }
                                />
                            )}
                        />
                        <Controller
                            control={ control }
                            name='hallsNumber'
                            rules={ hallsNumberValidation }
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="cinema"
                                    label="Cinema name"
                                    autoComplete="cinema"
                                    autoFocus
                                    onChange={onChange}
                                    value={value}
                                    error={!!errors.hallsNumber?.message}
                                    helperText={ errors.hallsNumber?.message }
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add cinema
                        </Button>
                    </Box>
                }
            </Container>
        </ThemeProvider>
    );
}

export default CinemaFrom;