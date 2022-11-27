import * as React from "react";
import {SyntheticEvent, useEffect, useState} from "react";
import {
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    MuiEvent
} from "@mui/x-data-grid-pro";
import {blockUser, changeRole, getAllUsers, updateUserInfo} from "../../http/userAPI";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {columns} from "./columns";
import BlockIcon from '@mui/icons-material/Block';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import {Typography} from "@mui/material";

const UserDataTable = () => {
    const [rows, setRows] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);

    const getUsers = async () => {
        const users = await getAllUsers();
        setRows(users);
    }
    useEffect(() => {
        getUsers();

    }, [isClicked])

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
        await updateUserInfo(updatedRow.id, updatedRow.firstName, updatedRow.lastName, updatedRow.email);
        console.log(updatedRow)
        return updatedRow;
    };
    const action =  {
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
                        columns={columns.concat(action)}
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
                    />
                }
                </Box>
        </>
    )
}

export default UserDataTable;