import * as React from "react";
import {useEffect, useState} from "react";
import {
    DataGrid,
    GridActionsCellItem,
    gridClasses,
    GridColumns,
    GridPreProcessEditCellProps,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams
} from "@mui/x-data-grid";
import {blockUser, changeRole, getAllUsers, updateUserInfo} from "../../../http/userAPI";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import BlockIcon from '@mui/icons-material/Block';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import {Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {handleRowEditStart, handleRowEditStop} from "./handleFunctions";
import {renderEditCell} from "./CellEditInputCell";
import {validateEmail, validateName} from "./validation";

export interface IUserDate {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isBlocked: boolean;
}

const UserDataTable = () => {
    const [rows, setRows] = useState<IUserDate[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);

    const [pageSize, setPageSize] = useState(5);

    const getUsers = async () => {
        const users = await getAllUsers();
        setRows(users);
    }
    useEffect(() => {
        getUsers();

    }, [isClicked])


    const emailPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateEmail(rows ,params.props.value!.toString(), +params.id);
        return { ...params.props, error: errorMessage };
    };


    const firstNamePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateName(params.props.value!.toString(), 'First name');
        return { ...params.props, error: errorMessage };
    };

    const lastNamePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateName(params.props.value!.toString(), 'Last name');
        return { ...params.props, error: errorMessage };
    };


    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View }});
        setClick(!click);
    };

    const handleBlockClick = (id: GridRowId) => async () => {
        setIsClicked(!isClicked)
        await blockUser(+id);
    };

    const handleChangeRole = (id: GridRowId) => async () => {
        setIsClicked(!isClicked);
        await changeRole(+id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow };
        const { id, firstName, lastName, email }  = updatedRow;
        await updateUserInfo({ id, firstName, lastName, email });
        return updatedRow;
    };

    const columns: GridColumns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 210,
            editable: true,
            preProcessEditCellProps: firstNamePreProcessEditCellProps,
            renderEditCell: renderEditCell,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 210,
            editable: true,
            preProcessEditCellProps: lastNamePreProcessEditCellProps,
            renderEditCell: renderEditCell,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: true,
            preProcessEditCellProps: emailPreProcessEditCellProps,
            renderEditCell: renderEditCell,
        },
        {
            field: 'role',
            headerName: 'Role',
            sortable: false,
            width: 130,
        },
        {
            field: 'isBlocked',
            headerName: 'Block',
            type: 'boolean',
            sortable: false,
            width: 130,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 130,
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
                        icon={
                            params.row.role === 'user'? <AddModeratorIcon /> : <RemoveModeratorIcon />
                        }
                        label="Moderator"
                        className="textPrimary"
                        onClick={handleChangeRole(params.row.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<BlockIcon />}
                        label="Block"
                        onClick={handleBlockClick(params.row.id)}
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
                    Manage Users
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
                        experimentalFeatures={{ newEditingApi: true }}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'asc' }],
                            },
                        }}
                        getRowSpacing={params => ({
                            top: params.isFirstVisible ? 0 : 5,
                            bottom: params.isLastVisible ? 0 : 5,

                        })}
                        rowsPerPageOptions={[5, 10, 15]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        sx={{
                            [`& .${gridClasses.row}`] : {
                                bgcolor: theme=>theme.palette.mode === 'light'? grey[200] : grey[900]
                            }
                        }}
                    />
                }
                </Box>
        </>
    )
}

export default UserDataTable;