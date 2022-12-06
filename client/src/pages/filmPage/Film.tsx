import React, {useState} from 'react';
import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";
import {CardActions, Container, Grid, Paper, Rating, Typography} from "@mui/material";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Footer from "../../components/Footer";
import Divider from "@mui/material/Divider";
import StarIcon from '@mui/icons-material/Star';
import {useSelector} from "react-redux";
import {IUserState} from "../../types/user";
import {IFilmState} from "../../types/film";

interface IRootState {
    film: any
}

const Film = () => {
    const [newRating, setNewRating] = useState<number | null>(0);
    const film = useSelector((state: IRootState) => state.film.currentFilm);

    const { title, description, url, rating} = film;

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
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            English mathematician and logician Alan Turing tries to crack the code of the German Enigma cipher machine during World War II.
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
                                      value={rating}
                                      readOnly
                                      precision={0.5}
                                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                  />
                                  <Box sx={{ ml: 2 }}>{film.rating}</Box>
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
                                        onChange={(event, newValue) => {
                                           setNewRating(newValue);
                                        }}
                                    />
                                    <Box sx={{ ml: 2 }}>{newRating}</Box>
                                </Box>
                            </Box>
                        </Stack>
                        <CardActions>
                            <Button size="small">Buy Ticket</Button>
                        </CardActions>
                    </Box>
                </Card>
            </Container>
            <Footer />
        </Box>
    );
};

export default Film;