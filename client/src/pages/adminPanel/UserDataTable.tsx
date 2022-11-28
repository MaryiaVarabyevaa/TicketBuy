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
import {blockUser, changeRole, getAllUsers, updateUserInfo} from "../../http/userAPI";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import BlockIcon from '@mui/icons-material/Block';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import {Typography} from "@mui/material";
import {StyledTooltip} from './StyledTooltip';
import {IUpdateUserInfo} from "../../types/user";

const UserDataTable = () => {
    const [rows, setRows] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [click, setClick] = useState(false);

    const validateEmail = (email: string, id: number) => {
        // @ts-ignore
        const editedUser = rows.find((user) => user.id === id);
        // @ts-ignore
        const existingUsers = rows.map((row) => row.email.toLowerCase());
        const exists = existingUsers.includes(email.toLowerCase());
        // @ts-ignore
        if (exists && email !== editedUser.email) {
            return `This email is already taken.`
        }
        if (email.length === 0) {
            return 'Required to fill in';
        }
        const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const res = re.test(String(email));
        if (!res) {
            return 'Enter the correct value';
        }
    }

    const emailPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateEmail(params.props.value!.toString(), +params.id);
        return { ...params.props, error: errorMessage };
    };

    function EmailEditInputCell(props: GridRenderEditCellParams) {
        const { error } = props;

        return (
            <StyledTooltip open={!!error} title={error}>
                <GridEditInputCell {...props} />
            </ StyledTooltip >
        );
    }

    function renderEditEmail(params: GridRenderEditCellParams) {
        return <EmailEditInputCell {...params} />;
    }

    const validateFirstName = (firstName: string, value: string) => {
        const valueField = value === 'firstName' ? 'First name' : 'Last name';
        if (firstName.length === 0) {
            return 'Required to fill in';
        }
        if(!firstName.match(/^[a-zA-Z]+$/)) {
            return `${value} can contain only latin alphabet`;
        }

    }
    const firstNamePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateFirstName(params.props.value!.toString(), 'First name');
        return { ...params.props, error: errorMessage };
    };

    const lastNamePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
        const errorMessage = validateFirstName(params.props.value!.toString(), 'Last name');
        return { ...params.props, error: errorMessage };
    };



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
        const { id, firstName, lastName, email }  = updatedRow;
        await updateUserInfo({ id, firstName, lastName, email });
        return updatedRow;
    };

    const columns: GridColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 130,
            editable: true,
            preProcessEditCellProps: firstNamePreProcessEditCellProps,
            renderEditCell: renderEditEmail,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 130,
            editable: true,
            preProcessEditCellProps: lastNamePreProcessEditCellProps,
            renderEditCell: renderEditEmail,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: true,
            preProcessEditCellProps: emailPreProcessEditCellProps,
            renderEditCell: renderEditEmail,
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
            sortable: false,
            width: 130,
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
                    />
                }
                </Box>
        </>
    )
}

export default UserDataTable;