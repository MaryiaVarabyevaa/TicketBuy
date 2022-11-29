import * as React from "react";
import {SyntheticEvent, useEffect, useState} from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridEditInputCell,
    GridEventListener,
    GridPreProcessEditCellProps,
    GridRenderEditCellParams,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    MuiEvent
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {StyledTooltip} from './StyledTooltip';
import {addCinema, deleteCinema, getAllCinema, updateCinemaInfo} from "../../http/cinemaAPI";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {EditToolbar} from "./EditToolbar";
import {ICinema, INewCinema} from "../../types/cinema";


const FilmDataTable = () => {
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

    const validateName = (firstName: string, value: string) => {
        const valueField = value === 'firstName' ? 'First name' : 'Last name';
        if (firstName.length === 0) {
            return 'Required to fill in';
        }
        if(!firstName.match(/^[a-zA-Z]+$/)) {
            return `${value} can contain only latin alphabet`;
        }

    }
    const firstNamePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateName(params.props.value!.toString(), 'Name');
        return { ...params.props, error: errorMessage };
    };

    const typePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateName(params.props.value!.toString(), 'Type of halls');
        return { ...params.props, error: errorMessage };
    };

    const validateHallsNumber = (hallsNumber: string) => {
        if (hallsNumber.length === 0) {
            return 'Required to fill in';
        }
        if (!hallsNumber.match(/^[0-9]+$/)) {
            return 'Number of halls can contain only numbers'
        }
    }
    const numberPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateHallsNumber(params.props.value!.toString());
        return { ...params.props, error: errorMessage };
    };
    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<SyntheticEvent>,
    ) => {
        event.defaultMuiPrevented = true;
    };

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
        const {  id, name, hallsType, hallsNumber }  = updatedRow;

        if ('isNew' in updatedRow) {
            await addCinema({name, hallsNumber, hallsType});
        } else {
            await updateCinemaInfo({ id, name, hallsNumber, hallsType });
        }
        setIsClicked(!isClicked);
        return updatedRow;
    };

    const columns: GridColumns = [
        { field: 'number', headerName: 'Sequence number', width: 70 },
        {
            field: 'name',
            headerName: 'Name',
            width: 130,
            editable: true,
            preProcessEditCellProps: firstNamePreProcessEditCellProps,
            renderEditCell: renderEditCell,
        },
        {
            field: 'hallsNumber',
            headerName: 'Number of halls',
            width: 130,
            editable: true,
            preProcessEditCellProps: numberPreProcessEditCellProps,
            renderEditCell: renderEditCell,
        },
        {
            field: 'hallsType',
            headerName: 'Type of halls',
            width: 250,
            editable: true,
            preProcessEditCellProps: typePreProcessEditCellProps,
            renderEditCell: renderEditCell,
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
                    Film Cinema
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