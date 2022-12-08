import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tooltip, {tooltipClasses, TooltipProps} from "@mui/material/Tooltip";
import * as React from "react";

export const StyledBox = styled(Box)(({ theme }) => ({
    height: 400,
    width: '100%',
    '& .MuiDataGrid-cell--editable': {
        backgroundColor: theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
        '& .MuiInputBase-root': {
            height: '100%',
        },
    },
    '& .Mui-error': {
        backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
        color: theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f',
    },
}));



export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
    },
}));
