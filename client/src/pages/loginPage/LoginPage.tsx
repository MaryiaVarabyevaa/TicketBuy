import * as React from 'react';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {
    Alert, AlertTitle,
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline, Fade,
    Grid,
    Link,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {emailValidation, firstNameValidation, lastNameValidation, passwordValidation} from "./validation";
import {getUser, login, registration} from "../../http/userAPI";
import {useDispatch} from "react-redux";
import {logInAction, addUserAction} from "../../store/reducers/userReducer";
import {ILoginForm} from "../../types/form";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../constants/routes";


const theme = createTheme();

const LoginPage = () => {
    const [isAuth, setIsAuth] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alertVisibility, setAlertVisibility] = useState({
        value: false,
        isSucceed: false,
        title: '',
        text: ''
    });

    const { handleSubmit, control, reset } = useForm<ILoginForm>({
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

    const onSubmit: SubmitHandler<ILoginForm> = async (data)=> {
        try {
            let response;
            if(isAuth) {
                response = await login(data);
                const user = await getUser(data.email);
                dispatch(logInAction(user))
            }
            else {
                response = await registration(data);
                // @ts-ignore
                dispatch(addUserAction({...data, id: +response.sub}));
            }
            navigate(MAIN_ROUTE);
        } catch (err) {
            // @ts-ignore
            const message = err.response.data.error;
            setAlertVisibility({
                ...alertVisibility,
                value: true,
                isSucceed: false,
                title: 'Error',
                text: message
            });

            if (message !== 'Invalid email or password') {
                setIsAuth(false);

            }
            reset({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });
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
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 2,
                        paddingRight: 2,
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
                    { alertVisibility.value &&
                        <Fade
                            in={alertVisibility.value}
                            timeout={{ enter: 1000, exit: 1000 }}
                            addEndListener={() => {
                                setTimeout(() => {
                                    setAlertVisibility({...alertVisibility, value: false})
                                }, 2000);
                            }}
                        >
                            <Alert severity={alertVisibility.isSucceed ?  "success" : "error"} variant="standard" className="alert" sx={{ mb: 3 }}>
                                <AlertTitle>{alertVisibility.title}</AlertTitle>
                                {alertVisibility.text}
                            </Alert>
                        </Fade>
                    }
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
