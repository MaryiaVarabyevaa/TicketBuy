import {GridEventListener, GridRowParams, MuiEvent} from "@mui/x-data-grid";
import {SyntheticEvent} from "react";

export const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<SyntheticEvent>,
) => {
    event.defaultMuiPrevented = true;
};

export const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
};