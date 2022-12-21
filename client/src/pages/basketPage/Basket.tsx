import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {getSessionInfoById} from "../../http/sessionAPI";
import {getFilmById} from "../../http/filmAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {getHallNumber} from "../../http/hallsAPI";
import {Button, Typography} from "@mui/material";
import {ISession} from "../../types/session";
import {getMonth} from "../../helpers/getMonth";
import {ISeat} from "../../types/order";
import Stack from "@mui/material/Stack";

interface IRootState {
    order: any
}

const Basket = () => {
    const seats = useSelector((state: IRootState) => state.order.seats);
    const sessionId = useSelector((state: IRootState) => state.order.sessionId);
    const [session, setSession] = useState<any>({});
    const [filmTitle, setFilmTitle] = useState('');
    const [cinemaName, setCinemaName] = useState([]);
    const [hallNumber, setHallNumber] = useState([]);

    const getSessionInfo = async () => {
        const session = await getSessionInfoById(+sessionId);
        const film = await getFilmById(session.filmId);
        const cinema = await getCinemaInfoById([session.cinemaId]);
        const hall = await getHallNumber(session.hallId);
        setSession(session);
        setFilmTitle(film[0].title);
        setCinemaName(cinema[0].name);
        setHallNumber(hall.hallNumber);
    }

    useEffect(()=>{
        getSessionInfo()
    },[])


    return (
        <Box sx={{border: '2px solid black', mt: 5, width: '40%'}}>
            <Typography variant='h5'>
                {
                    filmTitle &&
                    `${filmTitle}, 
                     ${session["date"].slice(8)} ${getMonth(+(session["date"].slice(5, 7)))} ${session["date"].slice(0, 4)}, 
                     ${session["time"].slice(0, 5)}`
                }
            </Typography>
            <Typography variant='h5'>
                {
                    cinemaName && `${cinemaName}, ${hallNumber} hall`
                }
            </Typography>
            <Stack>
                {
                    seats && seats[0].map(({seat, row}: ISeat) => {
                        return <Typography variant='h5'>
                            {`${seat} seat, ${row} row`}
                        </Typography>
                    })
                }
            </Stack>
            <Typography variant='h5'>
                {
                    session.length !== 0 && `${session["price"] * seats[0].length} BYN`
                }
            </Typography>
            <Button variant="contained">Buy</Button>
        </Box>
    );
};

export default Basket;