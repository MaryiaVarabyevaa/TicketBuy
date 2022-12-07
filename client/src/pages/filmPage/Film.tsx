import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import {CardActions, Chip, Container, Rating, Typography} from "@mui/material";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Footer from "../../components/Footer";
import Divider from "@mui/material/Divider";
import StarIcon from '@mui/icons-material/Star';
import {StarBorder} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {getFilm} from "../../http/filmAPI";

const Film = () => {
    const [film, setFilm] = useState<any>({});
    const [newRating, setNewRating] = useState<number | null>(0);
    const [listOfGenre, setListOfGenre] = useState<string[]>([]);
    const {id} = useParams();

    const getFilmInfo = async () => {
        if (id) {
            const film = await getFilm(+id);
            const {genre} = film;
            setListOfGenre(genre.split(', '));
            setFilm(film);
        }
    }

    useEffect(()=>{
        getFilmInfo();
    },[])

    return (
        <>
            {
                !!(Object.entries(film).length !== 0) &&
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }} >
                    <NavBar dashboard={false}/>
                    <Container maxWidth="lg">
                        <Card sx={{height: '100%', display: 'flex', justifyContent: 'center', gap: '32px', boxShadow: 'none'}} >
                            <CardMedia
                                component="img"
                                height="100%"
                                image={film.url}
                                alt={film.title}
                                sx={{width: "35%"}}
                            />
                            <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                <Typography gutterBottom variant="h4" component="h3">
                                    {film.title}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    {
                                        listOfGenre.map((genre, genreId) => {
                                            return <Chip key={genreId} label={genre} />
                                        })
                                    }
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body1" component="div" sx={{fontWeight: 900}}>
                                        Country:
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        {film.country}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body1" component="div" sx={{fontWeight: 900}}>
                                        Runtime:
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        {film.runtime}
                                    </Typography>
                                </Stack>
                                <Typography variant="body1" component="div">
                                    {film.description}
                                </Typography>
                                <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={2}
                                >
                                    <Box
                                        sx={{display: 'flex', flexDirection: 'column'}}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Film rating
                                        </Typography>
                                        <Box sx={{display: 'flex'}}>
                                            <Rating
                                                name="text-feedback"
                                                value={film.rating/10}
                                                readOnly
                                                max={1}
                                                icon={<StarIcon fontSize="inherit" />}
                                                precision={0.1}
                                                emptyIcon={<StarBorder fontSize="inherit" />}
                                            />
                                            <Box sx={{ ml: 2, alignSelf: 'center' }}>{film.rating}</Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{display: 'flex', flexDirection: 'column'}}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Your rating
                                        </Typography>
                                        <Box sx={{display: 'flex'}}>
                                            <Rating
                                                name="simple-controlled"
                                                value={newRating}
                                                max={10}
                                                onChange={(event, newValue) => {
                                                    setNewRating(newValue);
                                                }}
                                            />
                                            <Box sx={{ ml: 2, alignSelf: 'center' }}>{newRating}</Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{display: 'flex', flexDirection: 'column'}}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            IMDb Rating
                                        </Typography>
                                        <Box sx={{display: 'flex'}}>
                                            <Rating
                                                name="text-feedback"
                                                value={film.imdbRating/10}
                                                readOnly
                                                max={1}
                                                icon={<StarIcon fontSize="inherit" />}
                                                precision={0.1}
                                                emptyIcon={<StarBorder fontSize="inherit" />}
                                            />
                                            <Box sx={{ ml: 2, alignSelf: 'center' }}>{film.imdbRating}</Box>
                                        </Box>
                                    </Box>
                                </Stack>
                                <CardActions>
                                    <Button variant="contained" size='large'>Buy ticket</Button>
                                </CardActions>
                            </Box>
                        </Card>
                        {/*{*/}
                        {/*    reviews && <Reviews {...reviews} />*/}
                        {/*}*/}
                    </Container>
                    <Footer />
                </Box>
            }
        </>
    );
};

export default Film;