import React, {useEffect, useState} from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Chip,
    Container,
    createTheme,
    CssBaseline,
    Fade, Modal,
    Typography
} from "@mui/material";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import {getSeats} from "../../http/sessionAPI";
import {useNavigate} from "react-router-dom";
import {BASKET_ROUTE} from "../../constants/routes";
import {ISeat} from "../../types/order";
import {useDispatch, useSelector} from "react-redux";
import {addSeatsAction} from "../../store/reducers/orderReducer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
};

interface IRootState {
    order: any
}

const theme = createTheme();

const LandingPage = ({price}: {price: number}) => {

    const [seatsInfo, setSeatsInfo] = useState<ISeat[]>([]);
    const [seats, setSeats] = useState<any[]>([]);
    const sessionId = useSelector((state: IRootState) => state.order.sessionId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [alertVisibility, setAlertVisibility] = useState({
        value: false,
        isSucceed: false,
        title: '',
        text: ''
    });

    const getLandingPlace = async () => {
        if (sessionId) {
            const {seats} = await getSeats(+sessionId);
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

            if (seatsInfo.length >= 4 && !elem.classList.contains('clicked')) {
                throw Error('The maximum number of seats is selected!')
            }
            if (seatsInfo.length >= 4 && elem.classList.contains('clicked')) {
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
        } catch (err) {
            const message = (err as Error).message;
            setAlertVisibility({
                ...alertVisibility,
                value: true,
                isSucceed: false,
                title: 'Error',
                text: message

            })
        }
    };

    const handleContinue = () => {
        dispatch(addSeatsAction({
            seats: seatsInfo,
            continue: true,
            payment: false,
        }))
    }



    return (
        <>
            <Container component="main" sx={{padding: '0px'}}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '0px'
                    }}
                >
                    <Typography variant="h3">Screen</Typography>
                    { alertVisibility.value &&
                        <Modal
                            open={alertVisibility.value}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <Fade
                                in={alertVisibility.value}
                                timeout={{ enter: 1000, exit: 1000 }}
                                addEndListener={() => {
                                    setTimeout(() => {
                                        setAlertVisibility({...alertVisibility, value: false});
                                    }, 1500);
                                }}
                            >
                                <Alert severity={alertVisibility.isSucceed ?  "success" : "error"} variant="standard" className="alert" sx={{ mb: 3, ...style }}>
                                    <AlertTitle>{alertVisibility.title}</AlertTitle>
                                    {alertVisibility.text}
                                </Alert>
                            </Fade>
                        </Modal>
                    }
                    <Stack sx={{bgcolor: 'grey', p: 1.5, borderRadius: '40px'}}>
                        {
                            seats.map((seat, index) => {
                                return <Stack direction="row" spacing={1} key={index} >
                                    <Typography variant="h5" sx={{color: 'white', display: 'flex', width: '50px', justifyContent: 'center'}}>{index + 1}</Typography>
                                    <Stack direction="row" spacing={1.5} sx={{alignItems: 'center'}}>
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
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '10px',
                                                        cursor: `${item? 'auto' : 'pointer'}`,
                                                        fontSize: '0.5rem',
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
                                    <Typography variant="h5"  sx={{color: 'white', display: 'flex', width: '50px', justifyContent: 'center'}}>{index + 1}</Typography>
                                </Stack>
                            })
                        }
                    </Stack>
                    {
                        seatsInfo.length !== 0 && <Stack spacing={1} sx={{alignItems: 'center'}}>
                            <Stack direction="row" spacing={1}>
                                {
                                    seatsInfo.map(({seat, row}) => {
                                        return <Card>
                                            <CardContent>
                                                <Typography sx={{textAlign: 'center'}}>
                                                    {`${seat} seat, ${row} row`}
                                                </Typography>
                                                <Typography sx={{textAlign: 'center'}}>{price} BYN</Typography>
                                            </CardContent>
                                        </Card>
                                    })
                                }
                            </Stack>
                           <Stack direction='row' spacing={2}>
                               <Button size="small" variant="contained" sx={{width: '150px'}} onClick={handleContinue}>Continue</Button>
                               <Button size="small" variant="contained" sx={{width: '150px'}}>Pay now</Button>
                           </Stack>
                        </Stack>
                    }
                </Box>
            </Container>
        </>
    );
};
// localStorage.clear()
export default LandingPage;