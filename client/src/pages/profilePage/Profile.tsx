import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {Alert, AlertTitle, BottomNavigation, Button, Container, Fade, Grid, TextField, Typography} from "@mui/material";
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
import {IEditPersonInfo, IUpdateUserPassword} from "../../types/user";

interface IRootState {
    user: any
}

const Profile = () => {
    const currentUserId = useSelector((state: IRootState) => state.user.currentUserId);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [value, setValue] = React.useState(5);
    const [isError, setIsError] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [alertVisibilitySuccess, setAlertVisibilitySuccess] = useState(false);
    const [alertVisibilityError, setAlertVisibilityError] = useState(false);
    const [alertVisibility, setAlertVisibility] = useState({
        value: false,
        isSucceed: false,
        title: '',
        text: ''
    });

    const getUserInfo = async () => {
       const user = await getUserById(currentUserId);
       const { firstName, lastName, email } = user;
       setFirstName(firstName);
       setLastName(lastName);
       setEmail(email);

       reset(user);
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
        getUserInfo();
    },[])

    useEffect(()=>{
        getUserInfo();
    },[isUpdated])

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
           const updatedUser = await updateUserInfo({...data, id: currentUserId });
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
           <Box sx={{ height: '85vh',  display: 'flex', alignItems: 'center', bgcolor: 'grey'}}>
               <CssBaseline />
               <NavBar dashboard={true} />
               <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', bgcolor: 'white'}}>
                   <Box sx={{alignSelf: 'center', display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
                       <AccountCircleIcon sx={{ fontSize: 140 }} />
                       <Box sx={{ alignSelf: 'center'}}>
                           <Typography variant="h4" gutterBottom>
                               {
                                firstName && firstName + ' ' + lastName
                               }
                           </Typography>
                           <Typography variant="h5" gutterBottom>
                               {
                                   email && email
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
               </Container>
           </Box>
           <Footer />
       </>
    );
};

export default Profile;