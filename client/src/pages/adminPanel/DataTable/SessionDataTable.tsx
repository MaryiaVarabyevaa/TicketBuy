import * as React from "react";
import {useEffect, useState} from "react";
import {getAllFilms} from "../../../http/filmAPI";
import {getAllCinema} from "../../../http/cinemaAPI";
import {getAllSessions} from "../../../http/sessionAPI";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";


interface IFilm {
    filmId: number;
    filmTitle: string;
}

const SessionDataTable = () => {
    const [rowId, setRowId] = useState(null);
    const [filmsTitle, setFilmsTitle] = useState<string[]>([]);
    const [cinemaName, setCinemaName] = useState<string[]>([]);
    const [rows, setRows] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    // @ts-ignore
    const getData = async () => {
        const films = await getAllFilms();
        const cinema = await getAllCinema();
        const sessions = await getAllSessions();
        const cinemaName: string[] = [];
        const filmsTitle: string[] = [];
        // @ts-ignore
        sessions.map((session) => {
            const lenValue = cinema.length > films.length ? cinema : films;
            for (let i = 0; i < lenValue.length; i++) {
                if (session.filmId === films[i].id) {
                    session['filmTitle'] = films[i].title;
                }
                if (session.cinemaId === cinema[i].id) {
                    session['cinemaName'] = cinema[i].name;
                }
            }
        })
        // @ts-ignore
        cinema.map((cinemaInfo) => {
            cinemaName.push(cinemaInfo.name);
        })
        // @ts-ignore
        films.map((film) => {
            filmsTitle.push(film.title);
        })
        setRows(sessions);
        setCinemaName(cinemaName);
        setFilmsTitle(filmsTitle);
    };

    useEffect(() => {
        getData();
    }, [isClicked])

    const columns = [
        {
            field: 'cinemaName',
            headerName: 'Cinema',
            width: 170,
            editable: true,
            type: 'singleSelect',
            valueOptions: cinemaName,
        },
        { field: 'filmTitle', headerName: 'Film', width: 170, editable: true, type: 'singleSelect', valueOptions: filmsTitle },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'time', headerName: 'Time', width: 170 },
        { field: 'date', headerName: 'Date', width: 170 },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     type: 'actions',
        //     renderCell: (params: GridRowParams) => <></>
        // },
    ];

    return (
        <Box
            sx={{
                height: 422,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
            />
        </Box>
    );
};

export default SessionDataTable;