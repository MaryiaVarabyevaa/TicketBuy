import {
    buildingNumberPreProcessEditCellProps,
    cityPreProcessEditCellProps,
    namePreProcessEditCellProps,
    streetPreProcessEditCellProps
} from "./validation";
import {renderEditCell} from "../CellEditInputCell";
import {GridColumns} from "@mui/x-data-grid";

export const columns: GridColumns = [
    {
        field: 'name',
        headerName: 'Name',
        width: 130,
        editable: true,
        preProcessEditCellProps: namePreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 200,
        editable: true,
        preProcessEditCellProps: cityPreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'street',
        headerName: 'Street',
        width: 250,
        editable: true,
        preProcessEditCellProps: streetPreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'buildingNumber',
        headerName: 'Number building',
        width: 150,
        editable: true,
        preProcessEditCellProps: buildingNumberPreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
];