import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {BottomNavigation, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import HistoryIcon from '@mui/icons-material/History';
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../../components/NavBar";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ILoginForm} from "../../types/form";
import {emailValidation, firstNameValidation, lastNameValidation, passwordValidation} from "../loginPage/validation";
import Footer from "../../components/Footer";
import {getUser, login, registration} from "../../http/userAPI";
import {addUserAction, logInAction} from "../../store/reducers/userReducer";
import {MAIN_ROUTE} from "../../constants/routes";
import {IEditPersonInfo, IUpdateUserPassword} from "../../types/user";

interface IRootState {
    user: any
}

const Profile = () => {
    // const currentUser = useSelector((state: IRootState) => state.user.currentUser);
    // const {firstName, lastName, email} = currentUser[0];
    const [firstName, setFirstName] = useState('Maryia');
    const [lastName, setLastName] = useState('Varabyova');
    const [email, setEmail] = useState('masha@mail.ru');
    const [value, setValue] = React.useState(5);

    const { handleSubmit, control } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
        }
    });

    const {
        handleSubmit: handleSubmitPassword,
        control: passwordControl,
        formState: { errors: passwordErrors }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            password: '',
            repeatedPassword: '',
        }
    });

    const {errors} = useFormState({
        control
    });
    const onSubmit: SubmitHandler<IEditPersonInfo> = async (data)=> {
       console.log(data);
    }

    const onSubmitPassword: SubmitHandler<IUpdateUserPassword> = async (data)=> {
        console.log(data);
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
                                   `${firstName} ${lastName}`
                               }
                           </Typography>
                           <Typography variant="h5" gutterBottom>
                               {email}
                           </Typography>
                       </Box>
                   </Box>
                   <Box sx={{ width: '100%'}}>
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
                                       )}
                                   />
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
                                               onChange={onChange}
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
                                      name='repeatedPassword'
                                      rules={ passwordValidation }
                                      render={({
                                                   field: {onChange, value}
                                               }) => (
                                          <TextField
                                              fullWidth
                                              id="repeatedPassword"
                                              label="Repeat password"
                                              onChange={onChange}
                                              value={value}
                                              error={!!passwordErrors.repeatedPassword?.message}
                                              helperText={ passwordErrors.repeatedPassword?.message }
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