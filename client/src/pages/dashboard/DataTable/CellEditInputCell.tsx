import {GridEditInputCell, GridRenderEditCellParams} from "@mui/x-data-grid";
import {StyledTooltip} from "./StyledComponents";
import * as React from "react";

export function CellEditInputCell(props: GridRenderEditCellParams) {
    const { error } = props;

    return (
        <StyledTooltip open={!!error} title={error}>
            <GridEditInputCell {...props} />
        </ StyledTooltip >
    );
}
export function renderEditCell(params: GridRenderEditCellParams) {
    return <CellEditInputCell {...params} />;
}
