import {GridColumns} from "@mui/x-data-grid";
import {
    countryPreProcessEditCellProps,
    genrePreProcessEditCellProps, imdbRatingPreProcessEditCellProps, runtimePreProcessEditCellProps,
    textPreProcessEditCellProps,
    urlPreProcessEditCellProps
} from "./validation";
import {renderEditCell} from "../CellEditInputCell";

export const columns: GridColumns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 200,
        editable: true,
        preProcessEditCellProps: textPreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 300,
        editable: true,
        preProcessEditCellProps: textPreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'url',
        headerName: 'Url',
        width: 200,
        editable: true,
        preProcessEditCellProps: urlPreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    //todo: сделать поле chipField
    {
        field: 'genre',
        headerName: 'Genre',
        width: 200,
        editable: true,
        preProcessEditCellProps:  genrePreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    //todo: сделать поле chipField
    {
        field: 'country',
        headerName: 'Country',
        width: 150,
        editable: true,
        preProcessEditCellProps: countryPreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    {
        field: 'runtime',
        headerName: 'Runtime',
        width: 100,
        editable: true,
        preProcessEditCellProps: runtimePreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
    //todo: закончить валидацию
    {
        field: 'imdbRating',
        headerName: 'IMDb Rating',
        width: 100,
        editable: true,
        preProcessEditCellProps: imdbRatingPreProcessEditCellProps,
        renderEditCell: renderEditCell,
    },
]