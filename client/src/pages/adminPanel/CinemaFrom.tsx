import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {registration} from "../../http/userAPI";
import {firstNameValidation} from "../loginPage/validation";
import {cinemaNameValidation, hallsNumberValidation} from "./validation";

interface IForm {
    cinemaName: string;
    hallsNumber: string;
}

const theme = createTheme();

const CinemaFrom = () => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const { handleSubmit, control } = useForm<IForm>({
        mode: 'onChange',
        defaultValues: {
           cinemaName: '',
           hallsNumber: ''
        }
    });
    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<IForm> = async (data)=> {
        console.log(data);
    }

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

                            {/*<TextField*/}
                            {/*    margin="normal"*/}
                            {/*    required*/}
                            {/*    fullWidth*/}
                            {/*    id="number-halls"*/}
                            {/*    label="Number of halls"*/}
                            {/*    onChange={onChange}*/}
                            {/*    value={value}*/}
                            {/*    error={!!errors.hallsNumber?.message}*/}
                            {/*    helperText={ errors.hallsNumber?.message }*/}
                            {/*/>*/}
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