import {randomId} from "@mui/x-data-grid-generator";
import {GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer} from "@mui/x-data-grid";
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
        setRows((oldRows) => [...oldRows, {
            id,
            title: '',
            description:'',
            url: '',
            genre: '',
            country: '',
            runtime: '',
            imdbRating: '',
            isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'title' },
        }));
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