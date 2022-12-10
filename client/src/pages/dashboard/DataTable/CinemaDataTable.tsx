import * as React from "react";
import {useEffect, useState} from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridPreProcessEditCellProps,
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
import {addCinema, deleteCinema, getAllCinema, updateCinemaInfo} from "../../../http/cinemaAPI";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {ICinema, INewCinema} from "../../../types/cinema";
import {EditToolbar, renderEditCell} from "./EditComponents";
import {handleRowEditStart, handleRowEditStop} from "./handleFunctions";
import {validateNumber, validateName, validateStreet} from "./validation";
import {addHalls, deleteHall, getAllHalls, updateHallInfo} from "../../../http/hallsAPI";
import {IHalls} from "../../../types/halls";
import {IFullReviewInfo} from "../../../types/review";
import {getUserById} from "../../../http/userAPI";


const CinemaDataTable = () => {
    const [rows, setRows] = useState<ICinema[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);

    const getCinema = async () => {
        const cinema = await getAllCinema();
        const halls = await getAllHalls();

        halls.map((hall: IHalls) => {
            cinema.map((item: ICinema) => {
                if (item.id === hall.cinemaId) {
                    item['number'] = hall.number;
                    item['type'] = hall.type;
                }
            })
        })

        setRows(cinema);
    }
    useEffect(() => {
        getCinema();

    }, [isClicked])

    const namePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateName(params.props.value!.toString(), 'Cinema name');
        return { ...params.props, error: errorMessage };
    };

    const typePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateName(params.props.value!.toString(), 'Type of halls');
        return { ...params.props, error: errorMessage };
    };

    const streetPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateStreet(params.props.value!.toString());
        return { ...params.props, error: errorMessage };
    };

    const numberPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateNumber(params.props.value!.toString());
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
       await deleteCinema(id);
       await deleteHall(id);
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
        const {  id, name, type, number, city, street, buildingNumber }  = updatedRow;

        if ('isNew' in updatedRow) {
          const cinema = await addCinema({ name, city, street, buildingNumber: +buildingNumber });
          const halls = await addHalls({number: +number, type, cinemaId: +cinema.id })
        } else {
            await updateCinemaInfo({ id, name, city, street, buildingNumber: +buildingNumber });
            // await updateHallInfo({cinemaId : id, number: +number, type});
        }
        setIsClicked(!isClicked);
        return updatedRow;
    };

    const columns: GridColumns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 130,
            editable: true,
            // preProcessEditCellProps: namePreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'number',
            headerName: 'Number of halls',
            width: 130,
            editable: true,
            // preProcessEditCellProps: numberPreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'type',
            headerName: 'Type of halls',
            width: 250,
            editable: true,

            // preProcessEditCellProps: typePreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'city',
            headerName: 'City',
            width: 200,
            editable: true,
            // preProcessEditCellProps: typePreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'street',
            headerName: 'Street',
            width: 250,
            editable: true,
            // preProcessEditCellProps: streetPreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'buildingNumber',
            headerName: 'Number building',
            width: 150,
            editable: true,
            // preProcessEditCellProps: numberPreProcessEditCellProps,
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
                    Manage Cinema
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

export default CinemaDataTable;