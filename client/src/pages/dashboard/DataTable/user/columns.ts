import {GridColumns} from "@mui/x-data-grid";
import {namePreProcessEditCellProps} from "./validation";
import {renderEditCell} from "../CellEditInputCell";

export const columns: GridColumns = [
    {
        field: 'firstName',
        headerName: 'First name',
        width: 210,
        editable: true,
        preProcessEditCellProps: namePreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 210,
        editable: true,
        preProcessEditCellProps: namePreProcessEditCellProps,
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
]