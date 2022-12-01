import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses, TooltipProps} from "@mui/material/Tooltip";
import * as React from "react";

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
    },
}));
