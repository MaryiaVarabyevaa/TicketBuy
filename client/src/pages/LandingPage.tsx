import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Chip, Container, createTheme, CssBaseline, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import {getSeats} from "../http/sessionAPI";
import {useNavigate, useParams} from "react-router-dom";
import {BASKET_ROUTE} from "../constants/routes";
import {ISeat} from "../types/order";
import {useDispatch, useSelector} from "react-redux";
import {addOrderAction} from "../store/reducers/orderReducer";

const theme = createTheme();

interface IRootState {
    user: any
}

const LandingPage = () => {
    const [seatsInfo, setSeatsInfo] = useState<ISeat[]>([]);
    const [isError, setIsError] = useState(false);
    const [seats, setSeats] = useState<any[]>([]);
    const currentUserId = useSelector((state: IRootState) => state.user.currentUserId);
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const getLandingPlace = async () => {
        if (id) {
            const {seats} = await getSeats(+id);
            setSeats(seats);
        }
    };

    useEffect(()=>{
        getLandingPlace();
    },[])

    const handleClick = (event: any, obj: ISeat) => {
        try {
            const elem = event.target;
            if (elem.classList.contains('taken-place')) {
                throw Error('This place is taken')
            }

            if (seatsInfo.length >= 5 && !elem.classList.contains('clicked')) {
                throw Error('lala')
            }
            if (seatsInfo.length >= 5 && elem.classList.contains('clicked')) {
                const values = seatsInfo.filter(({seat, row}) => {
                    if (!(seat === obj.seat && row === obj.row)) {
                        return {seat, row};
                    }

                })
                setSeatsInfo(values as ISeat[]);
            }

            if ( seatsInfo.length < 5 && !elem.classList.contains('clicked')) {
                elem.style.background = 'white';
                elem.style.color = '#34495E';
                setSeatsInfo([...seatsInfo, obj]);
            } else {
                elem.style.background = '#34495E';
                const values = seatsInfo.filter(({seat, row}) => {
                    if (!(seat === obj.seat && row === obj.row)) {
                        return {seat, row};
                    }

                })
                setSeatsInfo(values as ISeat[]);
            }
            elem.classList.toggle('clicked');
            setIsError(false);
        } catch (err) {
            setIsError(true)
        }
    };
    const handleContinue = () => {
        dispatch(addOrderAction({
            [currentUserId] : seatsInfo
        }))
        // navigate(BASKET_ROUTE);
    }

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
                    {
                        isError &&  <Alert severity="error">The maximum number of seats is selected!</Alert>
                    }
                    <Stack spacing={2} sx={{bgcolor: 'grey', p: 5, borderRadius: '40px'}}>
                        {
                            seats.map((seat, index) => {
                                return <Stack direction="row" spacing={3} key={index} >
                                    <Typography variant="h4" sx={{color: 'white', display: 'flex', width: '50px', justifyContent: 'center'}}>{index + 1}</Typography>
                                    <Stack direction="row" spacing={3}>
                                        {
                                            seat.map((item: any, indexNum: number) => {
                                                return <Box
                                                    key={indexNum}
                                                    className={`${item? 'taken-place': 'free-place'}`}
                                                    onClick={(event) => handleClick(event, {seat: indexNum + 1, row: index + 1})}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        bgcolor: `${item? '#332f2c' : '#34495E'}`,
                                                        color: `${item? '#332f2c' : '#34495E'}`,
                                                        width: '35px',
                                                        height: '35px',
                                                        borderRadius: '40px',
                                                        cursor: `${item? 'auto' : 'pointer'}`,
                                                        '&:hover': {
                                                            background: `${item? '#332f2c' : 'white'}`,
                                                            border: `${item? 'none' : '3px solid #34495E'}`,
                                                            color: `${item? '#332f2c' : '#34495E'}`,
                                                        }
                                                    }}
                                                >
                                                    {indexNum + 1}
                                                </Box>;
                                            })
                                        }
                                    </Stack>
                                    <Typography variant="h4"  sx={{color: 'white', display: 'flex', width: '50px', justifyContent: 'center'}}>{index + 1}</Typography>
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
                        <Button
                            variant="contained"
                            sx={{height: '60px'}}
                            onClick={handleContinue}
                        >
                            Continue
                        </Button>
                    </Box>
                </AppBar>
            }
        </>
    );
};
// localStorage.clear();
export default LandingPage;