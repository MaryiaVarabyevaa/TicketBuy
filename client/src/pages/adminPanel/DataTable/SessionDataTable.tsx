import * as React from "react";
import {useEffect, useState} from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridEditInputCell,
    GridPreProcessEditCellProps,
    GridRenderEditCellParams,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    GridRowsProp,
    GridToolbarContainer
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {StyledTooltip} from './StyledTooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {getAllFilms} from "../../../http/filmAPI";
import {IFilm, INewFilm} from "../../../types/film";
import {handleRowEditStart, handleRowEditStop} from "./handleFunctions";
import {validateDescription, validateHallsUrl, validateTitle} from "./validation";
import {getAllCinema} from "../../../http/cinemaAPI";
import {addSession, deleteSession, getAllSessions, updateSessionInfo} from "../../../http/sessionAPI";
import {randomId} from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {INewSession, ISession} from "../../../types/session";

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

export function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, filmTitle: '', cinemaName: "", price: 0, date: '', time: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}



const SessionDataTable = () => {
    const [rows, setRows] = useState<ISession[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);
    const [filmsTitle, setFilmsTitle] = useState<string[]>([]);
    const [cinemaName, setCinemaName] = useState<string[]>([]);
    const [films, setFilms] = useState<any[]>([]);
    const [cinema, setCinema] = useState<any[]>([]);

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
               if (i < films.length) {
                   if (session.filmId === films[i].id) {
                       session['filmTitle'] = films[i].title;
                   }
               }
               if (i < cinema.length) {
                   if (session.cinemaId === cinema[i].id) {
                       session['cinemaName'] = `${cinema[i].name} (${cinema[i].city}, ${cinema[i].street}, ${cinema[i].buildingNumber})`;
                   }
               }
            }
        })
        // @ts-ignore
        cinema.map((cinemaInfo) => {
            cinemaName.push(`${cinemaInfo.name} (${cinemaInfo.city}, ${cinemaInfo.street}, ${cinemaInfo.buildingNumber})`);
        })
        // @ts-ignore
        films.map((film) => {
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

    function EditInputCell(props: GridRenderEditCellParams) {
        const { error } = props;

        return (
            <StyledTooltip open={!!error} title={error}>
                <GridEditInputCell {...props} />
            </ StyledTooltip >
        );
    }

    function renderEditCell(params: GridRenderEditCellParams) {
        return <EditInputCell {...params} />;
    }

    const titlePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateTitle(params.props.value!.toString());
        return { ...params.props, error: errorMessage }
    };


    const descriptionPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateDescription(params.props.value!.toString());
        return { ...params.props, error: errorMessage };
    };

    const urlPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateHallsUrl(params.props.value!.toString());
        return { ...params.props, error: errorMessage };
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View }});
        setClick(!click);
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        setIsClicked(!isClicked);
        await deleteSession(id);
    };

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
        let {id, filmTitle, cinemaName, price, date, time} = updatedRow;

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
            await addSession({ filmId, cinemaId, price: +price, date, time });
        } else {
            await updateSessionInfo({id, filmId, cinemaId, date, time, price: +price});
        }
        setIsClicked(!isClicked);
        return updatedRow;
    };

    const columns: GridColumns = [
        {
            field: 'cinemaName',
            headerName: 'Cinema',
            width: 350,
            editable: true,
            type: 'singleSelect',
            valueOptions: cinemaName,
        },
        { field: 'filmTitle', headerName: 'Film', width: 170, editable: true, type: 'singleSelect', valueOptions: filmsTitle },
        { field: 'price', headerName: 'Price', width: 100, editable: true },
        { field: 'time', headerName: 'Time', width: 170, editable: true },
        { field: 'date', headerName: 'Date', width: 170, editable: true },
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
                        columns={columns}
                        editMode="row"
                        processRowUpdate={processRowUpdate}
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        disableSelectionOnClick
                        componentsProps={{
                            toolbar: { setRows, setRowModesModel },
                        }}
                        components={{
                            Toolbar: EditToolbar,
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                }
            </Box>
        </>
    )
}

export default SessionDataTable;