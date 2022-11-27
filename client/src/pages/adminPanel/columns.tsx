import {GridColumns} from "@mui/x-data-grid";
import * as React from 'react';

export const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 130,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 130,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: true,

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
];


