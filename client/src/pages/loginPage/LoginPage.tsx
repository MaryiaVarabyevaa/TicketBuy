import * as React from 'react';
import {useState} from 'react';
import {useForm, Controller, SubmitHandler, useFormState} from "react-hook-form";
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    Link,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {emailValidation, firstNameValidation, lastNameValidation, passwordValidation} from "./validation";
import {registration} from "../../http/userAPI";

interface IForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const theme = createTheme();

const LoginPage = () => {
    const [isAuth, setIsAuth] = useState(true);
    const { handleSubmit, control } = useForm<IForm>({
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    });
    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<IForm> = async (data)=> {
        const {firstName, lastName, email, password} = data;
        let response;
        if(isAuth) {

        }
        else {
           response = await registration({firstName, lastName, email, password});
           console.log(response);
        }
    }

    const onClick = () => {
        setIsAuth(!isAuth);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {
                            isAuth? 'Sign in' : 'Sign up'
                        }
                    </Typography>
                    <Box component="form"  onSubmit={handleSubmit(onSubmit)}  sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {
                                !isAuth &&  <Grid item xs={12} sm={6}>
                                    <Controller
                                        control={ control }
                                        name='firstName'
                                        rules={ firstNameValidation }
                                        render={({
                                            field: {onChange, value}
                                        }) => (
                                            <TextField
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                onChange={onChange}
                                                value={value}
                                                error={!!errors.firstName?.message}
                                                helperText={ errors.firstName?.message }
                                            />
                                        )}
                                    />
                                </Grid>

                            }
                            {
                                !isAuth &&  <Grid item xs={12} sm={6}>
                                    <Controller
                                        control={ control }
                                        name='lastName'
                                        rules={ lastNameValidation }
                                        render={({
                                             field: {onChange, value}
                                        }) => (
                                            <TextField
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                onChange={onChange}
                                                value={value}
                                                error={!!errors.lastName?.message}
                                                helperText={ errors.lastName?.message }
                                            />
                                        )}
                                    />
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Controller
                                    control={ control }
                                    name='email'
                                    rules={ emailValidation }
                                    render={({
                                        field: {onChange, value}
                                    }) => (
                                        <TextField
                                            autoFocus
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            onChange={onChange}
                                            value={value}
                                            error={!!errors.email?.message}
                                            helperText={ errors.email?.message }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={ control }
                                    name='password'
                                    rules={ passwordValidation }
                                    render={({
                                        field: {onChange, value}
                                    }) => (
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            id="password"
                                            onChange={onChange}
                                            value={value}
                                            error={!!errors.password?.message}
                                            helperText={ errors.password?.message }
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {
                                isAuth? 'Sign in' : 'Sign up'
                            }
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={onClick}>
                                    {
                                        isAuth? "Don't have an account? Sign Up": "Already have an account? Sign in"
                                    }
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default LoginPage;