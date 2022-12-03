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
import {EditToolbar} from "./EditToolbar";
import {ICinema, INewCinema} from "../../../types/cinema";
import {renderEditCell} from "./CellEditInputCell";
import {handleRowEditStart, handleRowEditStop} from "./handleFunctions";
import {validate, validateHallsNumber} from "./validation";


const CinemaDataTable = () => {
    const [rows, setRows] = useState<ICinema[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);

    const getCinema = async () => {
        const cinema = await getAllCinema();
        cinema.map((cin: ICinema, cinIndex: number) => {
            cin.number = cinIndex + 1;
        })
        localStorage.setItem('rowsLength', `${cinema.length}`)
        setRows(cinema);
    }

    useEffect(() => {
        getCinema();

    }, [isClicked])


    const firstNamePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validate(params.props.value!.toString(), 'Name');
        return { ...params.props, error: errorMessage };
    };

    const typePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validate(params.props.value!.toString(), 'Type of halls');
        return { ...params.props, error: errorMessage };
    };

    const numberPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateHallsNumber(params.props.value!.toString());
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
        const {  id, name, hallsType, hallsNumber, city, street, buildingNumber }  = updatedRow;

        if ('isNew' in updatedRow) {
            await addCinema({name, hallsNumber, hallsType, city, street, buildingNumber});
        } else {
            await updateCinemaInfo({ id, name, hallsNumber, hallsType, city, street, buildingNumber });
        }
        setIsClicked(!isClicked);
        return updatedRow;
    };

    const columns: GridColumns = [
        // { field: 'number', headerName: 'ID', width: 70 },
        {
            field: 'name',
            headerName: 'Name',
            width: 130,
            editable: true,
            // preProcessEditCellProps: firstNamePreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'hallsNumber',
            headerName: 'Number of halls',
            width: 130,
            editable: true,
            // preProcessEditCellProps: numberPreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'hallsType',
            headerName: 'Type of halls',
            width: 250,
            editable: true,
            // preProcessEditCellProps: numberPreProcessEditCellProps,
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
            // preProcessEditCellProps: numberPreProcessEditCellProps,
            // renderEditCell: renderEditCell,
        },
        {
            field: 'buildingNumber',
            headerName: 'Number building',
            width: 150,
            editable: true,
            // preProcessEditCellProps: typePreProcessEditCellProps,
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