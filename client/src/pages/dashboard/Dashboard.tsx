import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UserDataTable from "./DataTable/user/UserDataTable";
import CinemaDataTable from "./DataTable/cinema/CinemaDataTable";
import FilmDataTable from "./DataTable/film/FilmDataTable";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MovieIcon from '@mui/icons-material/Movie';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import SessionDataTable from "./DataTable/session/SessionDataTable";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NavBar from "../../components/NavBar";
import {Drawer, DrawerHeader} from "./Drawer";


export default function DashBoard() {
    const [open, setOpen] = useState(false);
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


    const handleDrawerClose = () => {
        setOpen(!open);
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
