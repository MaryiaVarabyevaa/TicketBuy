import * as React from 'react';
import {useMemo, useState} from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Route, Routes, useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {Dashboard, Home, Logout} from "@mui/icons-material";
import { MAIN_ROUTE, PROFILE_ROUTE} from "../../constants/routes";
import {useDispatch, useSelector} from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {logOutAction} from "../../store/reducers/userReducer";
import Stack from "@mui/material/Stack";
import UserDataTable from "./DataTable/UserDataTable";
import CinemaDataTable from "./DataTable/CinemaDataTable";
import FilmDataTable from "./DataTable/FilmDataTable";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MovieIcon from '@mui/icons-material/Movie';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import SessionDataTable from "./DataTable/SessionDataTable";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface IRootState {
    currentUser: any[];
    isAuth: boolean;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function DashBoard() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const currentUser = useSelector((state: IRootState) => state.currentUser);
    const isAuth = useSelector((state: IRootState) => state.isAuth);
    const dispatch = useDispatch();
    const [isClickedUsers, setIsClickedUsers] = useState(true);
    const [isClickedCinema, setIsClickedCinema] = useState(false);
    const [isClickedFilms, setIsClickedFilms] = useState(false);
    const [isClickedSession, setIsClickedSession] = useState(false);


    const setIsClicked = (user: boolean, cinema: boolean, films: boolean, session: boolean) => {
        setIsClickedUsers(user);
        setIsClickedCinema(cinema);
        setIsClickedFilms(films);
        setIsClickedSession(session);
    }

    const list =  [
        {
            title: 'List of users',
            icon: <PeopleAltIcon />,
            component: <UserDataTable />
        },
        {
            title: 'List of cinema',
            icon: <CameraOutdoorIcon />,
            component: <CinemaDataTable/>
        },
        {
            title: 'List of films',
            icon: <MovieIcon />,
            component: <FilmDataTable />
        },
        {
            title: 'List of session',
            icon: <AccessTimeIcon />,
            component: <SessionDataTable />
        }
    ];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLogOut = () => {
        navigate(MAIN_ROUTE);
        dispatch(logOutAction());
    }

    const handleProfileClick = () => {
        navigate(PROFILE_ROUTE);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Tooltip title='Go back to home page'>
                        <IconButton sx={{mr: 1}} onClick={() => navigate(MAIN_ROUTE)}>
                            <Home />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {list.map(item  => (
                        <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => {
                                    item.title === 'List of users' ? setIsClicked(true, false, false, false) :
                                        item.title === 'List of cinema' ? setIsClicked(false, true, false, false) : item.title === 'List of films'?
                                            setIsClicked(false, false, true, false) : setIsClicked(false, false, false, true)
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {
                                        item.icon
                                    }
                                </ListItemIcon>
                                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {
                    isAuth &&  <Box sx={{mx: "auto", mt: 3, mb: 1}}>
                        <AccountCircleIcon sx={{ fontSize: 30 }}  color="primary"/>
                    </Box>
                }
                {
                    isAuth &&  <Box sx={{textAlign: 'center'}}>

                        {
                            open && <Stack spacing={1}>
                                <Typography>
                                    {
                                        `${currentUser[0].firstName} ${currentUser[0].lastName}`
                                    }
                                </Typography>
                                <Typography variant='body2'>
                                    {
                                        currentUser[0].role
                                    }
                                </Typography>
                                <Typography variant='body2'>
                                    {
                                        currentUser[0].email
                                    }
                                </Typography>
                            </Stack>
                        }
                        <Tooltip title='Logout' sx={{mt: 1}}>
                            <IconButton onClick={handleLogOut}>
                                <Logout sx={{ fontSize: 30 }}  />
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {
                    isClickedUsers? <UserDataTable /> : isClickedCinema?
                        <CinemaDataTable /> : isClickedFilms? <FilmDataTable /> : <SessionDataTable />
                }
            </Box>
        </Box>
    );
}

// localStorage.clear()