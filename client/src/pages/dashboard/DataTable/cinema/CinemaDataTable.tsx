import * as React from "react";
import {useEffect, useState} from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridRenderCellParams,
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
import {deleteCinema, getAllCinema, updateCinemaInfo} from "../../../../http/cinemaAPI";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {ICinema, INewCinema} from "../../../../types/cinema";
import {handleRowEditStart, handleRowEditStop} from "../handleFunctions";
import {deleteAllHalls, getAllHalls} from "../../../../http/hallsAPI";
import {IHalls} from "../../../../types/halls";
import {renderChipEditInputCell} from "./ChipEditInputCell";
import {typePreProcessEditCellProps} from "./validation";
import {columns} from "./columns";
import {EditToolbar} from "./EditToolbar";


const CinemaDataTable = () => {
    const [rows, setRows] = useState<ICinema[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);

    const getCinema = async () => {
        const cinema = await getAllCinema();
        const halls = await getAllHalls();

        cinema.map((item: ICinema) => {
            halls.map((hall: IHalls) => {
                const {cinemaId, type} = hall;
                if (item.id === cinemaId) {
                    if ('types' in item) {
                        const arr= item["types"];
                        // @ts-ignore
                        item['types'] = [...arr, type]
                    } else {
                        // @ts-ignore
                        item['types'] = [type];
                    }
                }
            })
        })
        setRows(cinema);
    }
    useEffect(() => {
        getCinema();

    }, [isClicked])

    useEffect(() => {
        getCinema();

    }, [])


    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View }});
        setClick(!click);
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
       setIsClicked(!isClicked);
       await deleteCinema(id);
       await deleteAllHalls(id);
    };


    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });
        const editedRow = rows.find((row) => row.id === id) as INewCinema;
        if ("isNew" in editedRow) {
            setRows(rows.filter((row) => row.id !== id));
        }
    }

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow };
        const {  id, name, city, street, buildingNumber }  = updatedRow;

        await updateCinemaInfo({ id, name, city, street, buildingNumber: +buildingNumber });

        setIsClicked(!isClicked);
        return updatedRow;
    };

    const otherColumns: GridColumns = [
        {
            field: 'types',
            headerName: 'Type of halls',
            width: 500,
            editable: true,
            renderCell: (params: GridRenderCellParams) => {
                const types = params.value;
                return types.map((type: string, index: number) => {
                    return <Chip
                        key={index}
                        label={type}
                        variant="outlined"
                    />
                })
            },
            preProcessEditCellProps: typePreProcessEditCellProps,
            //todo: добавить поле с эффектом
            renderEditCell: renderChipEditInputCell,
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
                    Manage Cinema
                </Typography>
                {
                    rows && <DataGrid
                        rows={rows}
                        columns={columns.concat(otherColumns)}
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
                                sortModel: [{ field: 'name', sort: 'asc' }],
                            },
                        }}
                    />
                }
            </Box>
        </>
    )
}

export default CinemaDataTable;