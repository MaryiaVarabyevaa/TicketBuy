import * as React from "react";
import {useEffect, useState} from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns, GridRenderCellParams,
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
import {Chip, Typography} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {addFilm, deleteFilm, getAllFilms, updateFilmInfo} from "../../../../http/filmAPI";
import {IFilm, INewFilm} from "../../../../types/film";
import {handleRowEditStart, handleRowEditStop} from "../handleFunctions";
import {columns} from "./columns";
import {EditToolbar} from "./EditToolbar";
import {genrePreProcessEditCellProps} from "./validation";
import {renderEditCell} from "../CellEditInputCell";

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '49e76c8e6fmsh57449ef1bca92a0p109cc5jsn45794d463839',
//         'X-RapidAPI-Host': 'movie-details1.p.rapidapi.com'
//     }
// };

const FilmDataTable = () => {
    const [rows, setRows] = useState<IFilm[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);

    const getFilms = async () => {
        const films = await getAllFilms();
        setRows(films);
    }



    // useEffect(() => {
    //     fetch('https://movie-details1.p.rapidapi.com/imdb_api/movie?id=tt1375670', options)
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log(response)
    //             const { title, rating,countries,description, runtime, image, genres } = response;
    //             addFilm({
    //                 title,
    //                 description,
    //                 url: image,
    //                 genre: genres.join(', '),
    //                 country: countries[0],
    //                 runtime,
    //                 imdbRating: String(rating)
    //             })
    //         })
    //         .catch(err => console.error(err));
    // },[])

    useEffect(() => {
        getFilms()
    }, [isClicked])


    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View }});
        setClick(!click);
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        setIsClicked(!isClicked);
        await deleteFilm(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });
        const editedRow = rows.find((row) => row.id === id) as unknown as INewFilm;
        if ("isNew" in editedRow) {
            setRows(rows.filter((row) => row.id !== id));
        }
    }

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow };
        const {  id, title, description, url, genre, runtime, country, imdbRating }  = updatedRow;

        if ('isNew' in updatedRow) {
            await addFilm({title, description, url, genre, runtime, country, imdbRating });
        } else {
            await updateFilmInfo({ id, title, description, url, genre, runtime, country, imdbRating });
        }
        setIsClicked(!isClicked);
        return updatedRow;
    };

    const actionColumn: GridColumns = [
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
                    Manage films
                </Typography>
                {
                    rows && <DataGrid
                        rows={rows}
                        columns={columns.concat(actionColumn)}
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
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'asc' }],
                            },
                        }}
                    />
                }
            </Box>
        </>
    )
}

export default FilmDataTable;