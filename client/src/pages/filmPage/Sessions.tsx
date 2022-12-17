import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {findSessionsByCinemaId, getCinemaIdByFilmId, getSessionsByCinemaId} from "../../http/sessionAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Sessions = () => {
    const {id} = useParams();
    const [cinema, setCinema] = useState([]);
    const [sessions, setSessions] = useState([]);

    const getCinemaId = async () => {
        if (id) {
            const cinemaId = await getCinemaIdByFilmId(+id);
            const cinema = await getCinemaInfoById(cinemaId);
            setCinema(cinema);
        }
    }

    const handleClick = async (id: number) => {
       const sessions = await getSessionsByCinemaId(id);
       setSessions(sessions);
    }

    useEffect(() => {
        getCinemaId();
    },[])

    return (
        <>
            {
                cinema.length !== 0 && <Box sx={{mt: 5}}>
                    <Typography variant="h5" gutterBottom>
                        Choose a cinema
                    </Typography>
                    {
                        cinema.map(({name, id}) => {
                            return <Button key={id} variant="contained" sx={{mr: 2}} onClick={() => handleClick(id)}>
                                {name}
                            </Button>
                         })
                    }
                    {
                        sessions.map(({date, time, price, id}) => {
                            return <Box key={id} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography>{date}</Typography>
                                <Typography>{time}</Typography>
                            </Box>
                        })
                    }
                </Box>
            }
        </>
    );
};

export default Sessions;