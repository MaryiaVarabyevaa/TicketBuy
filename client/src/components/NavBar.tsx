import * as React from 'react';
import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useDispatch, useSelector} from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import {ADMIN_PANEL_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../constants/routes";
import {useNavigate} from "react-router-dom";
import {logOutAction} from "../store/reducers/userReducer";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Badge, {BadgeProps} from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {toggleBasketAction} from "../store/reducers/basketReducer";
import DrawerComponent from "./DrawerComponent";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -4,
        top: 18,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '6px',
        borderRadius: '10px'
    },
}));

interface IRootState {
    user: any,
    order: any,
    basket: any
}

interface IProps {
    dashboard: boolean
}

const NavBar = ({dashboard} : IProps) => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [variant, setVariant] = useState<"dot" | "standard">("standard");
    const isAuth = useSelector((state: IRootState) => state.user.isAuth);
    const isAdmin = useSelector((state: IRootState) => state.user.isAdmin);
    const toggle = useSelector((state: IRootState) => state.basket.toggle);
    const seats = useSelector((state: IRootState) => state.order.seats);
    const continueVal = useSelector((state: IRootState) => state.order.continue);
    const payment = useSelector((state: IRootState) => state.order.payment);
    const isModerator = useSelector((state: IRootState) => state.user.isModerator);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>{
       if (seats.length !== 0) {
            setVariant('dot');
       } else {
           setVariant('standard');
       }
    },[continueVal])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleCloseProfile = () => {
        navigate(PROFILE_ROUTE);
    };

    const handleCloseDashboard = () => {
        navigate(ADMIN_PANEL_ROUTE)
        setAnchorEl(null);
    };

    const handleCloseLogOut = () => {
        dispatch(logOutAction());
        navigate(MAIN_ROUTE);
        setAnchorEl(null);
    };

    const handleClick = () => {
        navigate(LOGIN_ROUTE);
    }
    const handleClickBasket = () => {
       dispatch(toggleBasketAction(!toggle))
    }

    const handleNavigateToMainPage = () => {
        navigate(MAIN_ROUTE)
        setAnchorEl(null);
    };

    return (
       <>
           <AppBar position={`${dashboard? "fixed" : "static"}`}>
               <Toolbar>
                   <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center', pl: '48px'}}>
                       <Typography
                           variant="h5"
                           component="h3"
                           sx={{
                               display: 'inline-flex',
                               cursor: 'pointer',
                           }}
                           onClick={() => navigate(MAIN_ROUTE)}
                       >
                           TicketBuy
                       </Typography>
                   </Box>
                   {
                       !isAuth? <IconButton onClick={handleClick}>
                           <LoginIcon />
                       </IconButton> :  (
                           <>
                               <IconButton aria-label="cart" color="inherit" onClick={handleClickBasket}>
                                   <StyledBadge color="secondary" variant={variant} >
                                       <ShoppingCartIcon />
                                   </StyledBadge>
                               </IconButton>
                               <Box>
                                   <Tooltip title='Open settings'>
                                       <IconButton
                                           size="large"
                                           aria-label="account of current user"
                                           aria-controls="menu-appbar"
                                           aria-haspopup="true"
                                           onClick={handleMenu}
                                           color="inherit"
                                       >
                                           <AccountCircle />
                                       </IconButton>
                                   </Tooltip>
                                   <Menu
                                       sx={{ mt: '35px'}}
                                       id="menu-appbar"
                                       anchorEl={anchorEl}
                                       anchorOrigin={{
                                           vertical: 'top',
                                           horizontal: 'right',
                                       }}
                                       keepMounted
                                       transformOrigin={{
                                           vertical: 'top',
                                           horizontal: 'right',
                                       }}
                                       open={Boolean(anchorEl)}
                                       onClose={handleClose}
                                   >
                                       {
                                           ((isAdmin || isModerator) && !dashboard) &&  <MenuItem onClick={handleCloseDashboard}>Dashboard</MenuItem>
                                       }
                                       {
                                           dashboard &&  <MenuItem onClick={handleNavigateToMainPage}>Main page</MenuItem>
                                       }
                                       <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
                                       <MenuItem onClick={handleCloseLogOut}>Log out</MenuItem>
                                   </Menu>
                               </Box>
                           </>
                       )}
               </Toolbar>
           </AppBar>
           {
               toggle && <DrawerComponent />
           }
       </>
    );
}
// localStorage.clear()
export default NavBar;