import React, {useState} from 'react';
import {Box, Button, Chip, Container, createTheme, CssBaseline, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";

const theme = createTheme();

interface ISeat {
    seat: number;
    row: number;
}

const LandingPage = () => {
    const [seatsNumber, setSeatsNumber] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const [rows, setRows] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [seatsInfo, setSeatsInfo] = useState<ISeat[]>([]);

    const handleClick = (obj: ISeat) => {
        setSeatsInfo([...seatsInfo, obj]);
    };

    return (
        <>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px'
                    }}
                >
                    <Typography variant="h3">Screen</Typography>
                    <Stack spacing={2} sx={{bgcolor: 'grey', p: 5, borderRadius: '40px'}}>

                        {
                            rows.map((row) => {
                                return <Stack direction="row" spacing={3} key={row} >
                                    <Typography variant="h4" sx={{color: 'white', display: 'flex', width: '50px', justifyContent: 'center'}}>{row}</Typography>
                                    <Stack direction="row" spacing={3}>
                                        {
                                            seatsNumber.map((seat) => {
                                                return  <Chip
                                                    label={seat}
                                                    onClick={() => handleClick({seat, row})}
                                                    key={seat}
                                                    sx={{
                                                        bgcolor: '#34495E ',
                                                        color: '#34495E ',
                                                        width: '45px',
                                                        height: '45px',
                                                        borderRadius: '40px',
                                                        '&:hover': {
                                                            background: "white",
                                                            border: '3px solid #34495E ',
                                                            color: '#34495E'
                                                        },
                                                        '&:focus': {
                                                            background: "white",
                                                            color: '#34495E'
                                                        }
                                                    }}
                                                />
                                            })
                                        }
                                    </Stack>
                                    <Typography variant="h4"  sx={{color: 'white', display: 'flex', width: '50px', justifyContent: 'center'}}>{row}</Typography>
                                </Stack>
                            })
                        }
                    </Stack>
                </Box>
            </Container>
            {
                seatsInfo.length !== 0 && <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0, bgcolor: 'white', color: 'black', mt: 5}}>
                    <Box sx={{pl: 6, pr: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Stack direction="row" spacing={2}>
                            {
                                seatsInfo.map(({ seat, row }, index) => {
                                    return <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',width: '150px', height: '90px', border: '3px solid grey', borderRadius: '5px'}} key={index}>
                                        <Typography variant="h6">
                                            {`${row} row, ${seat} place`}
                                        </Typography>
                                    </Box>
                                })
                            }
                        </Stack>
                        <Button variant="contained" sx={{height: '60px'}}>Choose a place</Button>
                    </Box>
                </AppBar>
            }
        </>
    );
};

export default LandingPage;