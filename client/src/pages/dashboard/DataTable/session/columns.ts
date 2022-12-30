import {GridColumns} from "@mui/x-data-grid";
import {datePreProcessEditCellProps, pricePreProcessEditCellProps, timePreProcessEditCellProps} from "./validation";
import {renderEditCell} from "../CellEditInputCell";

const currency = ['BYN', 'USD', 'RUB', 'EUR', 'CHY'];

export const columns: GridColumns = [
    {
        field: 'price',
        headerName: 'Price',
        width: 100,
        editable: true,
        // preProcessEditCellProps: pricePreProcessEditCellProps,
        // renderEditCell: renderEditCell,
    },
    {
        field: 'currency',
        headerName: 'Currency',
        width: 100,
        editable: true,
        type: 'singleSelect',
        valueOptions: currency
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