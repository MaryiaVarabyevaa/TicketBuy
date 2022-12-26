import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSessionInfoById} from "../../http/sessionAPI";
import {getFilmById} from "../../http/filmAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {getHallNumber} from "../../http/hallsAPI";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Button, Typography} from "@mui/material";
import {getMonth} from "../../helpers/getMonth";
import {openPaymentAction, toggleBasketAction} from "../../store/reducers/basketReducer";

interface IRootState {
    order: any;
    basket: any;
}


const Basket = () => {
    const orders = useSelector((state: IRootState) => state.order.orders);
    const [allOrders, setAllOrders] = useState<any[]>([]);
    const dispatch = useDispatch();

    const getSessionInfo = async() => {
        let arr = orders.map(async ({sessionId, seats}: any, index: number) => {
            const session = await getSessionInfoById(+sessionId);
            const film = await getFilmById(session.filmId);
            const cinema = await getCinemaInfoById([session.cinemaId]);
            const hall = await getHallNumber(session.hallId);

            const info = {
                sessionId,
                filmTitle: film[0].title,
                cinemaName: cinema[0].name,
                hallNumber: hall.hallNumber,
                price: session.price,
                date: `${session.date.slice(8)} ${getMonth(+(session.date.slice(5, 7)))} ${session.date.slice(0, 4)}`,
                time: session.time.slice(0, 5),
                seats: Object.values(seats),
            }
           return info;
        });

      Promise.all(arr).then((res) => setAllOrders(res));
    }
    useEffect(() =>{
        setAllOrders([]);
        getSessionInfo();
    }, [])

    const handleClick = () => {
        dispatch(toggleBasketAction(false));
        dispatch(openPaymentAction(true));
    }

    return (
        <Stack sx={{ bgcolor: 'grey', padding: 5}} spacing={2}>
            {
                allOrders.length !== 0 && allOrders.map((order) => {
                    const {sessionId, filmTitle, cinemaName, hallNumber, date, time, seats, price} = order;
                    return <Stack key={sessionId} spacing={2}>
                        {
                            seats[0].map((item: any, index: any) => {
                                const {seat, row} = item;
                                return <Card key={index}>
                                    <CardContent>
                                        <Typography>
                                            {filmTitle}
                                        </Typography>
                                        {`${date}, ${time}`}
                                        <Typography>
                                            {cinemaName}
                                        </Typography>
                                        <Typography>
                                            {`${hallNumber} hall`}
                                        </Typography>
                                        <Typography>
                                            {`${seat} seat, ${row} row`}
                                        </Typography>
                                        <Typography>
                                            {`${price} BYN`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            })
                        }
                    </Stack>

                })
            }
            <Button variant="contained" onClick={handleClick}>Pay now</Button>
        </Stack>
    );
};
// localStorage.clear()
export default Basket;