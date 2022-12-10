import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {SelectChangeEvent} from '@mui/material/Select';
import {BottomNavigation, Chip, Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../constants/routes";
import NavBar from "../../components/NavBar";
import {IFilm} from "../../types/film";
import {
    getAllFilmsByCountryASC,
    getAllFilmsByCountryDESC,
    getAllFilmsByRatingASC,
    getAllFilmsByRatingDESC, getAllFilmsByTitleASC, getAllFilmsByTitleDESC,
    getFilm
} from "../../http/filmAPI";
import Footer from "../../components/Footer";
import {useDispatch} from "react-redux";
import {addFilmAction} from "../../store/reducers/filmReducer";
import StarIcon from "@mui/icons-material/Star";
import {StarBorder} from "@mui/icons-material";

import BottomNavigationAction from '@mui/material/BottomNavigationAction';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const MainPage = () => {
    const [sortValue, setSortValue] = useState('');
    const [ratingValue, setRatingValue] = useState<number | null>(2);
    const [value, setValue] = useState(0);
    const [isClickedRating, setIsClickedRating] = useState(true);
    const [isClickedCountry, setIsClickedCountry] = useState(false);
    const [isClickedTitle, setIsClickedTitle] = useState(false);
    const [isClickedDate, setIsClickedDate] = useState(false);

    const [films, setFilms] = useState<IFilm[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const setIsClickedValue = (rating: boolean, country: boolean, title: boolean, date: boolean) => {
        setIsClickedRating(rating);
        setIsClickedCountry(country);
        setIsClickedTitle(title)
        setIsClickedDate(date);
    }

    const getFilms = async() => {
        const sortedFilms = await getAllFilmsByRatingDESC();
        setFilms(sortedFilms);
    };


    useEffect(() => {
        getFilms();
    }, [])
    const handleChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
    };

    const handleClick = () => {
        navigate(LOGIN_ROUTE);
    }

    const handleSortByRating = async () => {
        let sortedFilms;
        let isClickedRatingValue;
        if (isClickedRating) {
            sortedFilms =  await getAllFilmsByRatingASC();
            isClickedRatingValue = false;
        } else {
            sortedFilms =  await getAllFilmsByRatingDESC();
            isClickedRatingValue = true;
        }
        setFilms(sortedFilms);
        setIsClickedValue(isClickedRatingValue, false, false, false);
    }

    const handleSortByCountry = async () => {
        let sortedFilms;
        let isClickedCountryValue;
        if (isClickedCountry) {
            sortedFilms = await getAllFilmsByCountryDESC();
            isClickedCountryValue = false;
        } else {

            sortedFilms =  await getAllFilmsByCountryASC();
            isClickedCountryValue = true;
        }
        setFilms(sortedFilms);
        setIsClickedValue(false, isClickedCountryValue, false, false);
    }

    const handleSortByTitle = async () => {
        let sortedFilms;
        let isClickedTitleValue;
        if (isClickedTitle) {
            sortedFilms = await getAllFilmsByTitleDESC();
            isClickedTitleValue = false;
        } else {

            sortedFilms =  await getAllFilmsByTitleASC();
            isClickedTitleValue = true;
        }
        setFilms(sortedFilms);
        setIsClickedValue(false, false, isClickedTitleValue, false);
    }


    const handleClickOnFilm = async (id: number) => {
        const film = await getFilm(id);
        dispatch(addFilmAction(film));
        navigate(`/films/${id}`);
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
              <NavBar dashboard={false}/>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h3"
                            variant="h3"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Upcoming film premieres
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '& > *': {
                                    m: 1,
                                },
                            }}
                        >
                            <Box sx={{ width: 500 }}>
                                <BottomNavigation
                                    showLabels
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                >
                                    <BottomNavigationAction label="Rating" onClick={handleSortByRating}/>
                                    <BottomNavigationAction label="Country" onClick={handleSortByCountry}/>
                                    <BottomNavigationAction label="Title" onClick={handleSortByTitle}/>
                                    <BottomNavigationAction label="Date"/>
                                </BottomNavigation>
                            </Box>

                        </Box>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {films && films.map((film: IFilm) => {
                            const {id, title, genre, url, rating, imdbRating} = film;
                            const listOfGenre = genre!.split(', ');
                            return  <Grid
                                item
                                key={id}
                                xs={12}
                                sm={6}
                                md={4}
                                onClick={() => handleClickOnFilm(id as number)}
                            >
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px'  }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            pt: '20%',
                                        }}
                                        image={url}
                                        alt={title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, mb: 0, pb: 0}}>
                                        <Typography variant="h5" component="h3">
                                            { title }
                                        </Typography>
                                    </CardContent>
                                    <Stack direction="row" spacing={1}>
                                        {
                                            listOfGenre.slice(0, 3).map((genre, genreId) => {
                                                return <Chip key={genreId} label={genre} />
                                            })
                                        }
                                    </Stack>
                                   <Box sx={{display: 'flex', pb: '20%'}}>
                                       <Rating
                                           name="read-only"
                                           value={imdbRating? +imdbRating/10 : null}
                                           readOnly
                                           max={1}
                                           icon={<StarIcon sx={{ fontSize: 40 }}/>}
                                           precision={0.1}
                                           emptyIcon={<StarBorder sx={{ fontSize: 40 }}/>}
                                       />
                                       <Typography variant="h6" sx={{ ml: 1, alignSelf: 'center' }}>{imdbRating}</Typography>
                                   </Box>
                                </Card>
                            </Grid>
                        })}
                    </Grid>
                </Container>
            </main>
            <Footer />
        </ThemeProvider>
    )
}

export default MainPage;