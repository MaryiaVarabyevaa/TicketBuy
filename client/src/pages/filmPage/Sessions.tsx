import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    findSessionsByCinemaId,
    getCinemaIdByFilmId,
    getSessionsByCinemaId,
    getSessionsByFilmId
} from "../../http/sessionAPI";
import {getCinemaInfoById} from "../../http/cinemaAPI";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {getMonth} from "../../helpers/getMonth";
import {LANDING_PLACE_ROUTE} from "../../constants/routes";

const Sessions = () => {
    const {id} = useParams();
    const [cinema, setCinema] = useState([]);
    const [sessions, setSessions] = useState<any>([]);
    const navigate = useNavigate();

    const getSessions = async () => {
        const sortedData: any = {};
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

    const handleClick = (id: number) => {
        navigate(`/landing-place/${id}`);
    }

    useEffect(() => {
        getSessions();
    },[])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ mixWidth: 800 }} aria-label="simple table">
                <TableBody>
                    {
                        sessions && Object.entries(sessions).map(([key, value]) => {
                            return  <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                key={key}
                            >
                                <TableCell component="th" scope="row" >{key}</TableCell>
                                {
                                    // @ts-ignore
                                    Object.entries(value).map(([keyItem, itemValue]) => {
                                        return  <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th"  >{keyItem}</TableCell>
                                                    <>
                                                        {
                                                            // @ts-ignore
                                                            itemValue.map((item) => {
                                                                const {time, id} = item;
                                                                return   <TableCell align="right" key={id} sx={{m: 0, width: '50px'}}>
                                                                    <Button onClick={() => handleClick(id)}>{time.slice(0, 5)}</Button>
                                                                </TableCell>
                                                            })
                                                        }
                                                    </>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                    })
                                }
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Sessions;