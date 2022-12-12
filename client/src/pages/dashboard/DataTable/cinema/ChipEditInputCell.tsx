import {GridColDef, GridRenderCellParams, useGridApiContext} from "@mui/x-data-grid";
import * as React from "react";
import {getCinemaId} from "../../../../http/cinemaAPI";
import {addHalls, deleteHall, updateHallInfo} from "../../../../http/hallsAPI";
import {MuiChipsInput} from "mui-chips-input";

function ChipEditInputCell(props: GridRenderCellParams) {
    const { id, value, field, row } = props;
    const apiRef = useGridApiContext();
    const [chips, setChips] = React.useState([...value])
    const {types, ...others} = row;

    const handleChange = async (newChip: string[]) => {
        setChips(newChip);
        await apiRef.current.setEditCellValue({ id, field, value: newChip });
        apiRef.current.stopCellEditMode({ id, field });
    }

    const handleAddChip = async (chipValue: string, chipIndex: number) => {
        const cinemaId = await getCinemaId({...others});
        const addHall = await addHalls({
            cinemaId,
            type: [chipValue]
        })
    }

    const handleDeleteChip = async (chipValue: string, chipIndex: number) => {
        const cinemaId = await getCinemaId({...others});
        const deletedHall = await deleteHall(cinemaId, chipIndex + 1);
    }
    const handleEditChip = async (chipValue: string, chipIndex: number) => {
        const cinemaId = await getCinemaId({...others});
        const updatedHall = await updateHallInfo({
            cinemaId,
            hallNumber: chipIndex + 1,
            type: chipValue
        })
    }

    return (
        <MuiChipsInput
            sx={{width: '100%'}}
            value={chips}
            hideClearAll
            onChange={handleChange}
            onAddChip={handleAddChip}
            onEditChip={handleEditChip}
            onDeleteChip={handleDeleteChip}
        />
    );
}


export const renderChipEditInputCell: GridColDef['renderCell'] = (params) => {
    return <ChipEditInputCell {...params} />;
};
