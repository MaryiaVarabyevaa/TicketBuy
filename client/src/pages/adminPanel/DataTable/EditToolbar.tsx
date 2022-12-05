import {GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer} from "@mui/x-data-grid";
import {randomId} from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

export function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        const number = Number(localStorage.getItem('rowsLength') as string);
        setRows((oldRows) => [...oldRows, { id ,name: '', number: 1, type:'', city: '', street: '', buildingNumber: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
        localStorage.setItem('rowsLength', `${number + 1}`);
    };

    return (
        <GridToolbarContainer>
            <Button color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}