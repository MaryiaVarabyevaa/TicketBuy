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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useSelector} from "react-redux";
import {StarBorder} from "@mui/icons-material";

interface IRootState {
    film: any
}

const Film = () => {
    const [newRating, setNewRating] = useState<number | null>(0);
    const [listOfGenre, setListOfGenre] = useState<string[]>([]);
    const film = useSelector((state: IRootState) => state.film.currentFilm);

    const { title, description, url, rating, genre, runtime, country, imdbRating, reviews} = film;

    useEffect(()=>{
        setListOfGenre(genre.split(', '));
    },[])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }} >
            <NavBar dashboard={false}/>
            <Container maxWidth="lg">
                <Card sx={{height: '100%', display: 'flex', justifyContent: 'center', gap: '32px', boxShadow: 'none'}} >
                    <CardMedia
                        component="img"
                        height="100%"
                        image={url}
                        alt={title}
                        sx={{width: "35%"}}
                    />
                    <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
                        <Typography gutterBottom variant="h4" component="h3">
                            {title}
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
                                {country}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1" component="div" sx={{fontWeight: 900}}>
                               Runtime:
                            </Typography>
                            <Typography variant="body1" component="div">
                                {runtime}
                            </Typography>
                        </Stack>
                        <Typography variant="body1" component="div">
                            {description}
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
                                      value={rating/10}
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
                                        value={imdbRating/10}
                                        readOnly
                                        max={1}
                                        icon={<StarIcon fontSize="inherit" />}
                                        precision={0.1}
                                        emptyIcon={<StarBorder fontSize="inherit" />}
                                    />
                                    <Box sx={{ ml: 2, alignSelf: 'center' }}>{imdbRating}</Box>
                                </Box>
                            </Box>
                        </Stack>
                        <CardActions>
                            <Button variant="contained" size='large'>Buy ticket</Button>
                        </CardActions>
                    </Box>
                </Card>
            </Container>
            <Footer />
        </Box>
    );
};

export default Film;