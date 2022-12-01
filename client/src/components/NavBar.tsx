import * as React from 'react';
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

interface IRootState {
    isAuth: boolean;
}

const NavBar = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isAuth = useSelector((state: IRootState)=> state.isAuth);
    const navigate = useNavigate();
    const  dispatch = useDispatch();


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

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" component="h3" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    TicketBuy
                </Typography>
                {
                    !isAuth? <IconButton><LoginIcon onClick={handleClick} /></IconButton> :  (
                        <div>
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
                                <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleCloseDashboard}>Dashboard</MenuItem>
                                <MenuItem onClick={handleCloseLogOut}>Log out</MenuItem>
                            </Menu>
                        </div>
                    )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;