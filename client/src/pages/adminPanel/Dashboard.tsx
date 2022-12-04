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
import {ADMIN_PANEL_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../../constants/routes";
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "../../components/NavBar";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface IRootState {
    currentUser: any[];
    isAuth: boolean;
}

const drawerWidth = 240;

export const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

export const closedMixin = (theme: Theme): CSSObject => ({
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

export const DrawerHeader = styled('div')(({ theme }) => ({
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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

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
        setOpen(!open);
    };

    const handleProfileClick = () => {
        navigate(PROFILE_ROUTE);
    };

    const handleCloseLogOut = () => {
        dispatch(logOutAction());
        navigate(MAIN_ROUTE);
        setAnchorEl(null);
    };
    const handleCloseProfile = () => {
        navigate(PROFILE_ROUTE);
    };

    const handleNavigateToMainPage = () => {
        navigate(MAIN_ROUTE)
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <NavBar dashboard={true} />
            <Drawer variant="permanent" open={open} >
                <DrawerHeader >
                    <IconButton onClick={handleDrawerClose}>
                        {
                            open? <ChevronLeftIcon /> : <ChevronRightIcon />
                        }
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {list.map(item  => (
                        <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: 'center',
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
