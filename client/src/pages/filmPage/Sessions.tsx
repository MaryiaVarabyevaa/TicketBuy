import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getSessionsByFilmId} from "../../http/sessionAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {getMonth} from "../../helpers/getMonth";
import {useDispatch, useSelector} from "react-redux";
import {addSessionAction, clearContinueOrPaymentValues} from "../../store/reducers/orderReducer";
import {Button, Grid, Modal, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LandingPage from "./LandingPage";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    pt: 3,
    pb: 3,
};

interface IRootState {
    order: any;
}

const Sessions = ({setIsClicked, isClicked}: any) => {
    const {id} = useParams();
    const [sessions, setSessions] = useState<any>([]);
    const [price, setPrice] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const continueVal = useSelector((state: IRootState) => state.order.continue);
    const payment = useSelector((state: IRootState) => state.order.payment);
    const dispatch = useDispatch();

    const getSessions = async () => {
        if (id) {
            const sessions = await getSessionsByFilmId(+id);
            const sortedData: any = {};

            for (const e of sessions) {
                const cinemaId: number = e.cinemaId;
                const cinemaInfo = await getCinemaInfoById([cinemaId]);
                const {name: cinemaName} = cinemaInfo[0];

                const date = e.date
                const fullDate = `${date.slice(8)} ${getMonth(+(date.slice(5, 7)))} ${date.slice(0, 4)}`;

                if (sortedData[fullDate]) {
                    if (sortedData[fullDate][cinemaName]) {
                        sortedData[fullDate][cinemaName].push(e);
                    } else {
                        sortedData[fullDate][cinemaName] = [e];
                    }
                } else {
                    sortedData[fullDate] = {};
                    sortedData[fullDate][cinemaName] = [e];
                }
            }
            setSessions(sortedData);
        }
    }

    const handleClose = () => {
        dispatch(clearContinueOrPaymentValues({
            continue: false,
            payment: false
        }));
        setOpen(false);
    };

    const handleClick = (id: number, price: number) => {
        setIsClicked(!isClicked);
        setPrice(price);
        setOpen(true)
        dispatch(addSessionAction(id));
    }

    useEffect(() => {
        getSessions();
    },[])

    useEffect(()=>{
        handleClose()
    },[continueVal, payment])

    return (
        <Box component={Paper} sx={{minWidth: '600px'}}>
            {
                sessions && Object.entries(sessions).map(([key, value], index) => {
                    return  <Grid
                        container
                        spacing={2}
                        sx={{
                            marginLeft: '0px',
                        }}
                        key={index}
                    >
                        <Grid
                            xs={3}
                            sx={{alignSelf: 'center'}}
                        >
                            {key}
                        </Grid>
                        <Grid xs={8} sx={{p: 2}}>
                            {
                                // @ts-ignore
                                Object.entries(value).map(([keyItem, itemValue], index) => {
                                    return <Stack
                                        direction="row"
                                        sx={{
                                            '&:hover': {
                                                background: "#F4F6F6",
                                            },
                                        }}
                                        key={index}
                                    >
                                        <Grid xs={7} sx={{alignSelf: 'center'}}>{keyItem}</Grid>
                                        {
                                            // @ts-ignore
                                            itemValue.map((item) => {
                                                const {time, id, price, filmId} = item;
                                                return <Button onClick={() => handleClick(id, price)} key={id}>{time.slice(0, 5)}</Button>
                                            })
                                        }
                                    </Stack>

                                })
                            }
                        </Grid>
                    </Grid>
                })
            }
            {
                price &&  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style }}>
                        <LandingPage price={price}/>
                    </Box>
                </Modal>
            }
        </Box>
    );
};

export default Sessions;