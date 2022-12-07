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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Chip, Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../constants/routes";
import NavBar from "../../components/NavBar";
import {IFilm} from "../../types/film";
import {getAllFilms, getFilm} from "../../http/filmAPI";
import Footer from "../../components/Footer";
import {useDispatch} from "react-redux";
import {addFilmAction} from "../../store/reducers/filmReducer";


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const MainPage = () => {
    const [sortValue, setSortValue] = useState('');
    const [ratingValue, setRatingValue] = useState<number | null>(2);
    const [films, setFilms] = useState<IFilm[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getFilms = async() => {
        const allFilms = await getAllFilms();
        setFilms(allFilms);
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
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Sort by</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={sortValue}
                                    label="sort by"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Rating</MenuItem>
                                    <MenuItem value={20}>Cinema</MenuItem>
                                    <MenuItem value={30}>Date</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {films && films.map((film: IFilm) => {
                            const {id, title, genre, url, rating} = film;
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
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'  }}
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
                                            listOfGenre.map((genre, genreId) => {
                                                return <Chip key={genreId} label={genre} />
                                            })
                                        }
                                    </Stack>
                                    <Rating
                                        name="read-only"
                                        value={rating}
                                        readOnly
                                        sx={{pb: '20%',}}
                                    />
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