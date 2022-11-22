import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState} from "react";
import {Rating} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const MainPage = () => {
    const [sortValue, setSortValue] = useState('');
    const [ratingValue, setRatingValue] = useState<number | null>(2);

    const handleChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative" sx={{alignItems: 'center'}}>
                <Toolbar>
                    <Typography variant="h2" color="inherit" noWrap>
                        TicketBuy
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
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
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'  }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '20%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography>
                                    </CardContent>
                                    <Rating
                                        name="read-only"
                                        value={ratingValue}
                                        readOnly
                                        sx={{pb: '20%',}}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6, display: 'flex', justifyContent: 'center', gap: '3%', borderTop: '1px solid #1976d2'}} component="footer">
                <Link href="https://www.instagram.com/m_vorobyovaa" target='_blank'><InstagramIcon /></Link>
                <Link href="https://t.me/m_vorobyovaa" target='_blank'><TelegramIcon /></Link>
                <Link href="https://github.com/MaryiaVarabyevaa" target='_blank'><GitHubIcon /></Link>
                <Link href="https://www.linkedin.com/in/maryia-varabyeva-b6612a21b/" target='_blank'><LinkedInIcon /></Link>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    )
}

export default MainPage;