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
    GridRowParams
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {StyledTooltip} from './StyledComponents';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {addFilm, deleteFilm, getAllFilms, updateFilmInfo} from "../../../http/filmAPI";
import {IFilm, INewFilm} from "../../../types/film";
import {handleRowEditStart, handleRowEditStop} from "./handleFunctions";
import {validateLength, validateTitle} from "./validation";
import {EditToolbar} from "./EditComponents";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '610bfd8990msh4a20ec81aeccd75p190756jsn2eba0fe43d1e',
        'X-RapidAPI-Host': 'moviesdb5.p.rapidapi.com'
    }
};

const FilmDataTable = () => {
    const [rows, setRows] = useState<IFilm[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);

    const [films, setFilms] = useState<any[]>([]);

    const getFilms = async () => {
        const films = await getAllFilms();
        setRows(films);
    }



    // useEffect(() => {
    //     fetch('https://moviesdb5.p.rapidapi.com/om?t=Girls%20', options)
    //         .then(response => response.json())
    //         .then(response => {
    //           const { Title, Country, Genre, Plot, Poster, Runtime, imdbRating } = response;
    //           addFilm({
    //               title: Title,
    //               description: Plot,
    //               url: Poster,
    //               genre: Genre,
    //               country: Country,
    //               runtime: Runtime,
    //               imdbRating
    //           })
    //         })
    //         .catch(err => console.error(err));
    // },[])

    useEffect(() => {
        getFilms()
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
        const errorMessage = validateLength(params.props.value!.toString());
        return { ...params.props, error: errorMessage };
    };

    const urlPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateLength(params.props.value!.toString());
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

    const columns: GridColumns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
            editable: true,
            preProcessEditCellProps: titlePreProcessEditCellProps,
            renderEditCell: renderEditCell,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            editable: true,
            preProcessEditCellProps: descriptionPreProcessEditCellProps,
            renderEditCell: renderEditCell,
        },
        {
            field: 'url',
            headerName: 'Url',
            width: 200,
            editable: true,
            preProcessEditCellProps: urlPreProcessEditCellProps,
            renderEditCell: renderEditCell,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            width: 200,
            editable: true,
            // preProcessEditCellProps: urlPreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 150,
            editable: true,
            // preProcessEditCellProps: urlPreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'runtime',
            headerName: 'Runtime',
            width: 100,
            editable: true,
            // preProcessEditCellProps: urlPreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'imdbRating',
            headerName: 'IMDb Rating',
            width: 100,
            editable: true,
            // preProcessEditCellProps: urlPreProcessEditCellProps,
            // renderEditCell: renderEditCell,
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