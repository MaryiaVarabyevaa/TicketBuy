import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {getSessionInfoById} from "../../http/sessionAPI";
import {getFilmById} from "../../http/filmAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {getHallNumber} from "../../http/hallsAPI";
import {Button, Typography} from "@mui/material";
import {getMonth} from "../../helpers/getMonth";
import {ISeat} from "../../types/order";
import Stack from "@mui/material/Stack";
import CardForm from "./CardForm";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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
        <Stack sx={{border: '2px solid black', mt: 5, width: '40%'}}>

            {
                seats[0].map((seat: ISeat) => {
                    return<Card>
                        <CardContent>

                        </CardContent>
                    </Card>
                })
            }

        </Stack>
    );
};

export default Basket;