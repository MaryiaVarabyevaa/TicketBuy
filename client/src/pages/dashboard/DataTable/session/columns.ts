import {GridColumns} from "@mui/x-data-grid";
import {
    datePreProcessEditCellProps,
    hallNumberPreProcessEditCellProps,
    pricePreProcessEditCellProps, timePreProcessEditCellProps
} from "./validation";
import {renderEditCell} from "../CellEditInputCell";

export const columns: GridColumns = [
    {
        field: 'price',
        headerName: 'Price',
        width: 100,
        editable: true,
        preProcessEditCellProps: pricePreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 170,
        editable: true,
        preProcessEditCellProps: datePreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'time',
        headerName: 'Time',
        width: 170,
        editable: true,
        preProcessEditCellProps: timePreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
]