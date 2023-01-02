import * as React from "react";
import {useEffect, useState} from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import {Button, Modal, Typography} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {getAllFilms} from "../../../../http/filmAPI";
import {handleRowEditStart} from "../handleFunctions";
import {getAllCinema} from "../../../../http/cinemaAPI";
import {addSession, deleteSession, getAllSessions, updateSessionInfo} from "../../../../http/sessionAPI";
import {ISession} from "../../../../types/session";
import {ICinema} from "../../../../types/cinema";
import {IFilm} from "../../../../types/film";
import {getAllHalls} from "../../../../http/hallsAPI";
import {columns} from "./columns";
import {EditToolbar} from "./EditToolbar";
import {pricePreProcessEditCellProps} from "./validation";
import {renderEditCell} from "../CellEditInputCell";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SessionDataTable = () => {
    const [rows, setRows] = useState<ISession[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);
    const [filmsTitle, setFilmsTitle] = useState<string[]>([]);
    const [cinemaName, setCinemaName] = useState<string[]>([]);
    const [films, setFilms] = useState<any[]>([]);
    const [cinema, setCinema] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [sessionId, setSessionId] = useState<number | null>(null);

    const getData = async () => {
        const films = await getAllFilms();
        const cinema = await getAllCinema();
        const sessions = await getAllSessions();
        const halls = await getAllHalls();
        const cinemaName: string[] = [];
        const filmsTitle: string[] = [];


        sessions.map((session: ISession) => {
            films.map((film: IFilm) => {
                if (session.filmId === film.id) {
                    session['filmTitle'] = film.title;
                }
            })

            cinema.map((item: ICinema) => {
                if (session.cinemaId === item.id) {
                    session['cinemaName'] = `${item.name} (${item.city}, ${item.street}, ${item.buildingNumber})`;
                }
            })
        })

        cinema.map((cinemaInfo: ICinema) => {
            cinemaName.push(`${cinemaInfo.name} (${cinemaInfo.city}, ${cinemaInfo.street}, ${cinemaInfo.buildingNumber})`);
        })
        films.map((film: IFilm) => {
            filmsTitle.push(film.title);
        })

        setRows(sessions);
        setCinemaName(cinemaName);
        setCinema(cinema);
        setFilmsTitle(filmsTitle);
        setFilms(films);

    };

    useEffect(() => {
        getData();
    }, [isClicked])

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View }});
        setClick(!click);
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        setOpenModal(true);
        setSessionId(+id);
    };
    const handleModalDeleteClick = async () => {
        if (sessionId) {
            await deleteSession(sessionId);
            setIsClicked(!isClicked);
            setOpenModal(false);
        }
    }

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });
        const editedRow = rows.find((row) => row.id === id) as unknown as ISession;
        if ("isNew" in editedRow) {
            setRows(rows.filter((row) => row.id !== id));
        }
    }

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow };
        let cinemaId: number = 0;
        let filmId: number = 0;
        let { id, filmTitle, cinemaName, price, date, time, hallId, currency } = updatedRow;
        cinema.map((item) => {
            const name = `${item.name} (${item.city}, ${item.street}, ${item.buildingNumber})`
            if (name === cinemaName) {
                cinemaId = item.id;
            }
        });
        films.map((film) => {
            if (film.title === filmTitle) {
                filmId = film.id;
            }
        })

        if ('isNew' in updatedRow) {
            await addSession({ filmId, cinemaId, price, date, time, hallId: +hallId, currency });
        } else {
            await updateSessionInfo({ id, filmId, cinemaId, date, time, price, hallId: +hallId, currency });
        }
        setIsClicked(!isClicked);
        return updatedRow;
    };

    const otherColumns: GridColumns = [
        {
            field: 'cinemaName',
            headerName: 'Cinema',
            width: 350,
            editable: true,
            type: 'singleSelect',
            valueOptions: cinemaName
        },
        {
            field: 'filmTitle',
            headerName: 'Film',
            width: 170,
            editable: true,
            type: 'singleSelect',
            valueOptions: filmsTitle,
        },
        {
            field: 'hallId',
            headerName: 'Number of hall',
            width: 170,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 110,
            cellClassName: 'actions',
            getActions: (params: GridRowParams) => {
                const isInEditMode = rowModesModel[params.row.id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(params.row.id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(params.row.id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(params.row.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteOutlineIcon />}
                        label="Block"
                        onClick={handleDeleteClick(params.row.id)}
                        color="inherit"
                    />,
                ];
            },
        }
    ];

    return (
        <>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete this film?
                    </Typography>
                    <Button onClick={handleModalDeleteClick}>Delete</Button>
                </Box>
            </Modal>
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
                <Typography
                    variant="h3"
                    component="h3"
                    sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                >
                    Manage sessions
                </Typography>
                {
                    rows && <DataGrid
                        rows={rows}
                        columns={otherColumns.slice(0, 3).concat(columns, otherColumns[3])}
                        editMode="row"
                        processRowUpdate={processRowUpdate}
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        disableSelectionOnClick
                        components={{
                            Toolbar: EditToolbar,
                        }}
                        componentsProps={{
                            toolbar: { isClicked , setIsClicked },
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                }
            </Box>
        </>
    )
}

export default SessionDataTable;