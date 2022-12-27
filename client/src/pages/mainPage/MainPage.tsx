import * as React from 'react';
import {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {SelectChangeEvent} from '@mui/material/Select';
import {
    BottomNavigation,
    Button,
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    OutlinedInput,
    Rating,
    Select,
    TextField
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/NavBar";
import {IFilm} from "../../types/film";
import {getSortedFilms} from "../../http/filmAPI";
import Footer from "../../components/Footer";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from "@mui/icons-material/Star";
import {StarBorder} from "@mui/icons-material";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuItem from "@mui/material/MenuItem";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ListItemText from "@mui/material/ListItemText";
import {getAllCinema} from "../../http/cinemaAPI";
import {findSessionsByCinemaId, getSessionsByDate} from "../../http/sessionAPI";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'action',
    'adventure',
    'comedy',
    'drama',
    'crime',
    'horror',
    'fantasy',
    'romance',
    'thriller',
    'animation',
    'family',
    'war',
    'documentary',
    'musical',
    'biography',
    'science fiction',
    'western',
    'post-apocalyptic',
    'melodrama'
];

const findDuplicates = (arr: number[]) => arr.filter((item: number, index: number) => arr.indexOf(item) !== index);

export const theme = createTheme({});

interface IRootState {
    user: any,
    order: any,
    basket: any
}

const MainPage = () => {
    const [sortValue, setSortValue] = useState('');
    const [value, setValue] = useState(0);
    const [cinema, setCinema] = useState([]);
    const [cinemaValue, setCinemaValue] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
    const [isError, setIsError] = useState(false);
    const [genre, setGenre] = useState<string[]>([]);
    const [sortRatingBy, setSortRatingBy] = useState('DESC');
    const [idFromDate, setIdFromDate] = useState<number[]>([]);
    const [idFromCinema, setIdFromCinema] = useState<number[]>([]);
    const [id, setId] = useState<number[]>([]);
    const [films, setFilms] = useState<IFilm[]>([]);
    const navigate = useNavigate();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const getFilms = async() => {
        const sortedFilms = await getSortedFilms(genre, id, sortRatingBy) as unknown as IFilm[];
        setFilms(sortedFilms);
    };

    const getCinema = async () => {
        const cinema = await getAllCinema();
        setCinema(cinema);
    };

    useEffect(() => {
        getFilms();
        getCinema();
    }, [])

    useEffect(() => {
        getFilms();
        getCinema();
    }, [isError])

    const handleChangeDate = async (newValue: any) => {
        try {
            const {$D, $y, $M} = newValue;
            setSelectedDate(newValue);
            const filmsId = await getSessionsByDate(`${$y}-${$M + 1}-${$D}`);

            if (filmsId.length === 0) {
                throw Error('There were no suitable events');
            }

            let id: number[] = [];
            let duplicates;

            filmsId.map((item: any) => {
                const {filmId} = item;
                id.push(filmId);
            })

            if (idFromCinema.length !== 0) {
                duplicates = findDuplicates(id.concat(idFromCinema));
            } else {
                duplicates = id;
            }

            const films = await getSortedFilms(genre, duplicates, sortRatingBy) as unknown as IFilm[];

            if (films.length === 0) {
                throw Error('There were no suitable events');
            }

            setIsError(false);
            setId(duplicates);
            setFilms(films);
        } catch (err) {
           setIsError(true);
        }
    };

    const handleChangeCinemaField = async (event: SelectChangeEvent<typeof personName>) => {
       try {
           const {
               target: { value },
           } = event;

           setCinemaValue(
               typeof value === 'string' ? value.split(',') : value,
           );

           let cinemaId: number[] = [];
           let duplicates;
           cinema.map((item, index) => {
               const {name, id} = item;

               if (typeof value !== "string") {
                   value.map((val) => {
                       if (val === name) {
                           cinemaId.push(id);
                       }
                   })
               }

           })
           const filmsId = await findSessionsByCinemaId(cinemaId);
           let id: number[] = [];
           filmsId.map((item: any) => {
               const {filmId} = item;
               id.push(filmId);
           })

           if (idFromDate.length !== 0) {
               duplicates = findDuplicates(id.concat(idFromCinema));
           } else {
               duplicates = id;
           }

           const films = await getSortedFilms(genre, duplicates, sortRatingBy) as unknown as IFilm[];

           if (films.length === 0) {
               throw Error('There were no suitable events');
           }

           setIsError(false);
           setFilms(films);
           setIdFromCinema(id);
           setId(duplicates);
       } catch (err) {
           setIsError(true);
       }
    };

    const handleSortByGenre = async (event: SelectChangeEvent<typeof personName>) => {
      try {
          const {
              target: { value },
          } = event;
          setGenre(
              typeof value === 'string' ? value.split(',') : value,
          );

          const films = await getSortedFilms(value as string[], id, sortRatingBy) as unknown as IFilm[];

          if (films.length === 0) {
              throw Error('There were no suitable events');
          }
          setIsError(false);
          setFilms(films);
      } catch (err) {
          setIsError(true);
      }
    };

    const handleSortByRating = async () => {
        const value = ( sortRatingBy === 'DESC')? 'ASC' : 'DESC';
        const films = await getSortedFilms(genre, id, value) as unknown as IFilm[];
        setSortRatingBy(value);
        setFilms(films);
    }

    const handleReset = () => {
        setSelectedDate(null);
        setCinemaValue([]);
        setGenre([]);
        setSortRatingBy('DESC');
        setId([])
        setIsError(false);
    }

    const handleClickOnFilm = async (id: number) => {
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
                          <Box sx={{display: 'flex'}}>
                              <Stack direction="row" spacing={2}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                          label="Select a date"
                                          value={selectedDate}
                                          disablePast
                                          orientation='portrait'
                                          onChange={(newValue) => handleChangeDate(newValue)}
                                          renderInput={(params) => <TextField {...params} />}
                                      />
                                  </LocalizationProvider>
                                  <FormControl sx={{ width: 300 }}>
                                      <InputLabel id="demo-multiple-checkbox-label">Cinema</InputLabel>
                                      <Select
                                          labelId="demo-multiple-checkbox-label"
                                          id="demo-multiple-checkbox"
                                          multiple
                                          value={cinemaValue}
                                          onChange={handleChangeCinemaField}
                                          input={<OutlinedInput label="Cinema" />}
                                          renderValue={(selected) => selected.join(', ')}
                                          MenuProps={MenuProps}
                                      >
                                          {cinema && cinema.sort().map((item) => {
                                              const {name, id} = item;
                                              return <MenuItem key={id} value={name}>
                                                  <Checkbox checked={cinemaValue.indexOf(name) > -1} />
                                                  <ListItemText primary={name} />
                                              </MenuItem>
                                          })}
                                      </Select>
                                  </FormControl>
                                  <FormControl sx={{ width: 300 }}>
                                      <InputLabel id="demo-multiple-checkbox-label">Genre</InputLabel>
                                      <Select
                                          labelId="demo-multiple-checkbox-label"
                                          id="demo-multiple-checkbox"
                                          multiple
                                          value={genre}
                                          onChange={handleSortByGenre}
                                          input={<OutlinedInput label="Genre" />}
                                          renderValue={(selected) => selected.join(', ')}
                                          MenuProps={MenuProps}
                                      >
                                          {names.sort().map((name) => (
                                              <MenuItem key={name} value={name}>
                                                  <Checkbox checked={genre.indexOf(name) > -1} />
                                                  <ListItemText primary={name} />
                                              </MenuItem>
                                          ))}
                                      </Select>
                                  </FormControl>
                              </Stack>
                              <BottomNavigation
                                  showLabels
                                  value={value}
                                  onChange={(event, newValue) => {
                                      setValue(newValue);
                                  }}
                              >
                                  <BottomNavigationAction
                                      onClick={handleSortByRating}
                                      icon={sortRatingBy === 'DESC'? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
                                      label="Rating"
                                      sx={{display: 'flex', flexDirection: 'row-reverse'}}
                                  />
                              </BottomNavigation>
                          </Box>
                            <Box>
                                {
                                    personName.length !== 0 && personName.map((name) => {
                                        return <Chip label={name} key={name} variant="outlined"/>
                                    })
                                }
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {
                        isError && <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                          <ErrorOutlineIcon sx={{ fontSize: 140, color: '#D7DBDD' }}/>
                          <Typography variant='h3'>There were no suitable events</Typography>
                          <Typography variant='h4' sx={{color: '#8c2041'}}>Try changing the search parameters</Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: '#D7DBDD',
                                    '&:hover': {
                                        bgcolor: '#A6ACAF',
                                    }
                                }}
                                onClick={handleReset}
                            >
                                Reset search parameters
                            </Button>
                        </Box>
                    }
                    {
                        !isError && <Grid container spacing={4}>
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
                    }
                </Container>
            </main>
            <Footer />
        </ThemeProvider>
    )
}

export default MainPage;