import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    findSessionsByCinemaId,
    getCinemaIdByFilmId,
    getSessionsByCinemaId,
    getSessionsByFilmId
} from "../../http/sessionAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


const Sessions = () => {
    const {id} = useParams();
    const [cinema, setCinema] = useState([]);
    const [sessions, setSessions] = useState<any>([]);


    const sortedData: any = {};
    //
    // data.forEach((e) => {
    //     const cinemaId = e.cinemaId;
    //     if (sortedData[e.date]) {
    //         if (sortedData[e.date][cinemaId]) {
    //             sortedData[e.date][cinemaId].push(e);
    //         } else {
    //             sortedData[e.date][cinemaId] = [e];
    //         }
    //     } else {
    //         sortedData[e.date] = {};
    //         sortedData[e.date][cinemaId] = [e];
    //     }
    // })
    //

    const getSessions = async () => {
        if (id) {
            const sessions = await getSessionsByFilmId(+id);
            const sortedData: any = {};

            sessions.forEach((e: any) => {
                const cinemaId = e.cinemaId;
                if (sortedData[e.date]) {
                    if (sortedData[e.date][cinemaId]) {
                        sortedData[e.date][cinemaId].push(e);
                    } else {
                        sortedData[e.date][cinemaId] = [e];
                    }
                } else {
                    sortedData[e.date] = {};
                    sortedData[e.date][cinemaId] = [e];
                }
            })

            const arr = [];
            for (const data in sortedData) {
                arr.push({[data] : sortedData[data]});
            }

            setSessions(arr);
        }
    }

    const handleClick = async (id: number) => {
       const sessions = await getSessionsByCinemaId(id);
       setSessions(sessions);
    }

    useEffect(() => {
        getSessions();
    },[])

    return (
        <>
            {
                sessions && sessions.map((item: any) => {
                    for (const key in item) {
                        for (const itemKey in item[key]) {
                            console.log(itemKey)
                            return <Box key={key}>
                                {/*<Box>{key}</Box>*/}
                                <Box>{itemKey}</Box>
                            </Box>
                            // item[key][itemKey].map((session: any) => {
                            //     const {id, time, price} = session;
                            //     console.log(time);
                            //     // return <Box key={id}>
                            //     //     <Stack direction="row" spacing={2}>
                            //     //         {/*<Box>{key}</Box>*/}
                            //     //         {/*<Box>{itemKey}</Box>*/}
                            //     //         <Box>{time}</Box>
                            //     //     </Stack>
                            //     // </Box>
                            // })
                        }
                    }
                })
            }
        </>
    );
};

export default Sessions;