import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {
    Alert,
    AlertTitle,
    BottomNavigation,
    Button,
    Container,
    Fade,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import HistoryIcon from '@mui/icons-material/History';
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../../components/NavBar";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {emailValidation, firstNameValidation, passwordValidation} from "../loginPage/validation";
import Footer from "../../components/Footer";
import {checkUser, getUser, getUserById, updatePassword, updateUserInfo} from "../../http/userAPI";
import {IUpdateUserPassword} from "../../types/user";
import {getOrderById} from "../../http/orderAPI";
import {getSessionInfoById} from "../../http/sessionAPI";
import {getFilmById} from "../../http/filmAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {getHallNumber} from "../../http/hallsAPI";
import {getMonth} from "../../helpers/getMonth";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useReactToPrint} from "react-to-print";


interface IRootState {
    user: any
}

const Profile = () => {
    const currentUserId = useSelector((state: IRootState) => state.user.currentUserId);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [value, setValue] = React.useState(5);
    const [isError, setIsError] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const componentRef = useRef();
    const [alertVisibility, setAlertVisibility] = useState({
        value: false,
        isSucceed: false,
        title: '',
        text: ''
    });

    const getUserInfo = async () => {
        const user = await getUserById(currentUserId);
        console.log(user);
        const { firstName, lastName, email } = user;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        reset(user);
    }

    const handlePrint = useReactToPrint({
        // @ts-ignore
        content: () => componentRef.current,
        documentTitle: 'Purchase history',
    });

    const getOrders = async () => {
        const orders = await getOrderById(currentUserId);
        const fullOrdersInfo = orders.map( async (order: any) => {
            const {createdAt, seats, sessionId} = order;
            const session = await getSessionInfoById(+sessionId);
            const film = await getFilmById(session.filmId);
            const cinema = await getCinemaInfoById([session.cinemaId]);
            const hall = await getHallNumber(session.hallId);

            const info = {
                filmTitle: film[0].title,
                cinemaName: cinema[0].name,
                hallNumber: hall.hallNumber,
                price: session.price,
                date: `${session.date.slice(8)} ${getMonth(+(session.date.slice(5, 7)))} ${session.date.slice(0, 4)}`,
                time: session.time.slice(0, 5),
                seats: seats,
                purchaseDate: `${createdAt.slice(8, 10)} ${getMonth(+(createdAt.slice(5, 7)))} ${createdAt.slice(0, 4)}`,
            }

            return info;
        })
        Promise.all(fullOrdersInfo).then((res) => setOrders(res));
    }

    const { handleSubmit, control, reset } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
        }
    });

    useEffect(()=>{
        if (currentUserId) {
            getUserInfo();
            getOrders();
        }
    }, [])

    useEffect(()=>{
        if (currentUserId) {
            getUserInfo();
        }
    },[isUpdated, currentUserId])

    const {
        handleSubmit: handleSubmitPassword,
        control: passwordControl,
        formState: { errors: passwordErrors },
        reset: resetPassword
    } = useForm({
        mode: "onChange",
        defaultValues: {
            password: '',
            newPassword: '',
            repeatedNewPassword: '',
        }
    });

    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<any> = async (data)=> {
       if (!isError) {
           const updatedUser = await updateUserInfo({...data, id: +currentUserId });
           setIsUpdated(!isUpdated);
           setValue(5);
           setAlertVisibility({
               ...alertVisibility,
               value: true,
               isSucceed: true,
               title: 'Success',
               text: 'Changes saved successfully!'
           })
       }
    }

    const onSubmitPassword: SubmitHandler<IUpdateUserPassword> = async (data)=> {
       try {
           const {password, newPassword, repeatedNewPassword} = data;
           const checkedUser = await checkUser(email, password);
           if (newPassword !== repeatedNewPassword) {
               throw new Error('Passwords don\'t match');
           }
           if (checkedUser && (newPassword === repeatedNewPassword)) {
               const newPassword = await updatePassword(email, repeatedNewPassword);

               if (newPassword.error) {
                   throw new Error(newPassword.error)
               }

               setValue(5);
               setAlertVisibility({
                   ...alertVisibility,
                   value: true,
                   isSucceed: true,
                   title: 'Success',
                   text: 'Changes saved successfully!'
               })
               resetPassword({
                   password: '',
                   newPassword: '',
                   repeatedNewPassword: '',
               })
           }

       } catch (err) {
           setAlertVisibility({
               ...alertVisibility,
               value: true,
               isSucceed: false,
               title: 'Error',
               text: 'Enter the correct password!'
           })
       }
    }

    return (
       <>
           <NavBar isMainPage={false} />
           <CssBaseline />
           <Box sx={{display: 'flex', alignItems: 'center', pt: 15, pb: 5, height: '71vh'}}>
               <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', bgcolor: 'white'}}>
                   <Box sx={{alignSelf: 'center', display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                       <AccountCircleIcon sx={{ fontSize: 140 }} />
                       <Box sx={{ alignSelf: 'center'}}>
                           <Typography variant="h4" gutterBottom>
                               {
                                    firstName + ' ' + lastName
                               }
                           </Typography>
                           <Typography variant="h5" gutterBottom>
                               {
                                   email
                               }
                           </Typography>
                       </Box>
                   </Box>
                   <Box sx={{ width: '100%', mb: 3}}>
                       <BottomNavigation
                           showLabels
                           value={value}
                           onChange={(event, newValue) => {
                               setValue(newValue);
                           }}
                       >
                           <BottomNavigationAction label="Edit personal info" icon={<EditIcon />} />
                           <BottomNavigationAction label="Change password" icon={<PasswordIcon />} />
                           <BottomNavigationAction label="View purchase history" icon={<HistoryIcon />} />
                       </BottomNavigation>
                   </Box>
                   {
                       isError && <Alert severity="error">User with this email already exists in the system!</Alert>
                   }
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
                   {
                       value === 0 && <Box
                           component="form"
                           onSubmit={handleSubmit(onSubmit)}
                           sx={{ mt: 3 }}
                       >
                           <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                               <Grid item xs={12} sm={7}>
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
                                       )}></Controller>
                               </Grid>
                               <Grid item xs={12} sm={7}>
                                   <Controller
                                       control={ control }
                                       name='lastName'
                                       rules={ firstNameValidation }
                                       render={({
                                                    field: {onChange, value}
                                                }) => (
                                           <TextField
                                               fullWidth
                                               id="lastName"
                                               label="Last Name"
                                               autoFocus
                                               onChange={onChange}
                                               value={value}
                                               error={!!errors.lastName?.message}
                                               helperText={ errors.lastName?.message }
                                           />
                                       )}
                                   />
                               </Grid>
                               <Grid item xs={12} sm={7}>
                                   <Controller
                                       control={ control }
                                       name='email'
                                       rules={ emailValidation }
                                       render={({
                                                    field: {onChange, value}
                                                }) => (
                                           <TextField
                                               fullWidth
                                               id="Email"
                                               label="Email"
                                               autoFocus
                                               onChange={async (value) => {
                                                   onChange(value);
                                                   const user = await getUser(value.target.value);
                                                   if (user && currentUserId !== user.id) {
                                                       setIsError(true);
                                                   } else {
                                                       setIsError(false);
                                                   }
                                               }}
                                               value={value}
                                               error={!!errors.email?.message}
                                               helperText={ errors.email?.message }
                                           />
                                       )}
                                   />
                               </Grid>
                               <Grid item xs={12} sm={7}>
                                   <Button
                                       type="submit"
                                       fullWidth
                                       variant="contained"
                                       sx={{ mt: 3, mb: 2 }}
                                   >
                                       save changes
                                   </Button>
                               </Grid>
                           </Grid>
                       </Box>
                   }
                   {
                       value === 1 && <Box component="form"  sx={{ mt: 3 }} onSubmit={handleSubmitPassword(onSubmitPassword)}>
                           <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                               <Grid item xs={12} sm={7}>
                                   <Controller
                                       control={ passwordControl }
                                       name='password'
                                       rules={ passwordValidation }
                                       render={({
                                                    field: {onChange, value}
                                                }) => (
                                           <TextField
                                               fullWidth
                                               id="password"
                                               label="Password"
                                               type="password"
                                               autoFocus
                                               onChange={onChange}
                                               value={value}
                                               error={!!passwordErrors.password?.message}
                                               helperText={ passwordErrors.password?.message }
                                           />
                                       )}
                                   />
                               </Grid>
                               <Grid item xs={12} sm={7}>
                                   <Controller
                                       control={ passwordControl }
                                       name='newPassword'
                                       rules={ passwordValidation }
                                       render={({
                                                    field: {onChange, value}
                                                }) => (
                                           <TextField
                                               fullWidth
                                               id="newPassword"
                                               label="New password"
                                               type="password"
                                               onChange={onChange}
                                               value={value}
                                               error={!!passwordErrors.newPassword?.message}
                                               helperText={ passwordErrors.newPassword?.message }
                                           />
                                       )}
                                   />
                               </Grid>
                               <Grid item xs={12} sm={7}>
                                   <Controller
                                       control={ passwordControl }
                                       name='repeatedNewPassword'
                                       rules={ passwordValidation }
                                       render={({
                                                    field: {onChange, value}
                                                }) => (
                                           <TextField
                                               fullWidth
                                               id="repeatedNewPassword"
                                               label="Repeat new password"
                                               type="password"
                                               onChange={onChange}
                                               value={value}
                                               error={!!passwordErrors.repeatedNewPassword?.message}
                                               helperText={ passwordErrors.repeatedNewPassword?.message }
                                           />
                                       )}
                                   />
                               </Grid>
                               <Grid item xs={12} sm={7}>
                                   <Button
                                       type="submit"
                                       fullWidth
                                       variant="contained"
                                       sx={{ mt: 3, mb: 2 }}
                                   >
                                       update password
                                   </Button>
                               </Grid>
                           </Grid>
                       </Box>
                   }
                   {
                       value === 2 && <Box sx={{maxHeight: '480px', overflowY: 'scroll'}}>
                           {
                               orders.length !== 0 && <TableContainer component={Paper}>
                                   <Table stickyHeader={true} aria-label="sticky table">
                                       <TableHead>
                                           <TableRow>
                                               <TableCell align="center">Date of purchase</TableCell>
                                               <TableCell align="center">Ticket Information</TableCell>
                                               <TableCell align="center">Actions</TableCell>
                                           </TableRow>
                                       </TableHead>
                                       <TableBody>
                                           {
                                               orders.map((order) => {
                                                   const {purchaseDate, filmTitle, cinemaName, date, time, hallNumber, seats, price} = order;
                                                   const {seat, row} = seats;
                                                   // @ts-ignore
                                                   return <TableRow>
                                                       <TableCell align="center" sx={{borderBottom: "none"}}>
                                                           {purchaseDate}
                                                       </TableCell>
                                                       <TableCell sx={{borderBottom: "none"}} ref={componentRef}>
                                                           <Card>
                                                               <Stack>
                                                                   <CardContent>
                                                                       <Typography>{filmTitle}</Typography>
                                                                       <Typography>{`${date}, ${time}`}</Typography>
                                                                       <Typography>{cinemaName}</Typography>
                                                                       <Typography>{`${hallNumber} hall`}</Typography>
                                                                       <Typography>{`${seat} seat, ${row} row`}</Typography>
                                                                       <Typography>{`${price} BYN`}</Typography>
                                                                   </CardContent>
                                                               </Stack>
                                                           </Card>
                                                       </TableCell>
                                                       <TableCell align="center" sx={{borderBottom: "none"}}>
                                                           <Button variant="outlined" onClick={handlePrint}>Print</Button>
                                                       </TableCell>
                                                   </TableRow>
                                               })
                                           }
                                       </TableBody>
                                   </Table>
                               </TableContainer>
                           }
                       </Box>
                   }
               </Container>
           </Box>
           {/*<Footer />*/}
       </>
    );
};

export default Profile;