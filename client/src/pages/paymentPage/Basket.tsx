import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSessionInfoById} from "../../http/sessionAPI";
import {getFilmById} from "../../http/filmAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {getHallNumber} from "../../http/hallsAPI";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Alert, Button, CardActions, Container, Typography} from "@mui/material";
import {getMonth} from "../../helpers/getMonth";
import NavBar from "../../components/NavBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../components/Footer";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../constants/routes";
import CardForm from "./CardForm";
import {getResultOfPayment, openPaymentAction, updateOrdersInfo} from "../../store/reducers/orderReducer";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";

interface IRootState {
    order: any;
    basket: any;
}


const Basket = () => {
    const orders = useSelector((state: IRootState) => state.order.orders);
    const payment = useSelector((state: IRootState) => state.order.payment);
    const isSucceedPayment = useSelector((state: IRootState) => state.order.isSucceedPayment);
    const [allOrders, setAllOrders] = useState<any[]>([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getSessionInfo = async() => {

        if (orders.length !== 0) {
            let arr = orders.map(async ({sessionId, seats}: any) => {
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
                    seats: seats
                };
                return info;
            });
            Promise.all(arr).then((res) => setAllOrders(res));
        }
    }


    useEffect(() =>{
        getSessionInfo();
    }, [])

    useEffect(() => {
        getSessionInfo();
    }, [orders])

    useEffect(() => {
        setAllOrders([]);
    }, [isSucceedPayment])

    useEffect(()=>{
        getSessionInfo();
    }, [isDeleted]);

    const handleClick = () => {
       dispatch(openPaymentAction(true));
    }

    const handleClickBack = () => {
        dispatch(getResultOfPayment(false));
        navigate(MAIN_ROUTE);
    }

    const handleClickDelete = (index: number) => {
        dispatch(updateOrdersInfo(index));
        setIsDeleted(!isDeleted);
    }

    return (
      <>
          <CssBaseline />
          <NavBar isMainPage={false}/>
          <Box sx={{ height: '85vh',  display: 'flex', alignItems: 'center', flexDirection: 'column', pt: 8, gap: '20px', justifyContent: 'center'}}>
              <Container maxWidth='xl' sx={{display: 'flex', flexDirection: 'column',}}>
                  <Stack sx={{ padding: 5, flexWrap: 'wrap', gap: '20px', alignSelf: 'center'}} direction="row">
                      {
                          allOrders.length === 0?
                              <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                                  {
                                      !isSucceedPayment &&  <ErrorOutlineIcon sx={{ fontSize: 140, color: '#D7DBDD' }}/>
                                  }
                                  {
                                      isSucceedPayment && <Alert severity="success">The payment was successful!!</Alert>
                                  }
                                  <Typography variant='h3'>
                                      {
                                          isSucceedPayment? 'Would you like to continue?' : 'First select sessions'
                                      }
                                  </Typography>
                                  <Button
                                      variant="contained"
                                      sx={{
                                          bgcolor: '#D7DBDD',
                                          '&:hover': {
                                              bgcolor: '#A6ACAF',
                                          }
                                      }}
                                      onClick={handleClickBack}
                                  >
                                      Go back to the selection
                                  </Button>
                              </Box> :
                              allOrders.length !== 0 && allOrders.map((order, index) => {
                                  const {sessionId, filmTitle, cinemaName, hallNumber, date, time, seats, price} = order;
                                  const {seat, row} = seats;
                                  return  <Card key={sessionId} sx={{width: '300px'}}>
                                      <Stack direction="row" sx={{justifyContent: 'space-between'}}>
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
                                          <CardActions>
                                              <IconButton sx={{alignSelf: 'flex-start'}} onClick={() => handleClickDelete(index)}>
                                                  <ClearIcon />
                                              </IconButton>
                                          </CardActions>

                                      </Stack>
                                  </Card>
                              })
                      }
                  </Stack>
              </Container>
              {
                  allOrders.length !== 0 &&  <Button variant="contained"
                      onClick={handleClick}
                  >
                      Pay now
                  </Button>
              }
          </Box>
          <Footer />
          {
                payment && <CardForm />
          }
      </>
    );
};
// localStorage.clear()
export default Basket;