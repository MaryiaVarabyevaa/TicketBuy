import {GridColDef, GridRenderCellParams, useGridApiContext} from "@mui/x-data-grid";
import * as React from "react";
import {useEffect, useState} from "react";
import {getCinemaId} from "../../../../http/cinemaAPI";
import {addHalls, deleteHall, getCertainHall, updateHallInfo} from "../../../../http/hallsAPI";
import {MuiChipsInput} from "mui-chips-input";
import Box from "@mui/material/Box";
import {Button, Modal, Typography} from "@mui/material";
import {getSessionsByHallId} from "../../../../http/sessionAPI";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ChipEditInputCell(props: GridRenderCellParams) {
    const { id, value, field, row } = props;
    const apiRef = useGridApiContext();
    const [chips, setChips] = React.useState([...value]);
    const [newChips, setNewChips] = useState<string[]>([]);
    const [sessionsInfo, setSessionsInfo] = useState<number | null>(null);
    const [chipIndex, setChipIndex] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const {types, ...others} = row;

    const handleChange = async (newChip: string[]) => {
        if (newChip.length < chips.length) {
            setOpen(true);
            setNewChips(newChip);
        } else {
            setChips(newChip);
            await apiRef.current.setEditCellValue({ id, field, value: newChip });
            apiRef.current.stopCellEditMode({ id, field });
        }
    }

    const getHallInfo = async () => {
        if (typeof chipIndex === "number") {
            const hallId = await getCertainHall(+id, chipIndex + 1);
            const sessionsInfo = await getSessionsByHallId(hallId);
            if (sessionsInfo.length !== 0) {
                setSessionsInfo(sessionsInfo.length);
            }
        }
    }

    useEffect(()=>{
        if (typeof chipIndex === "number") {
            getHallInfo();
        }
    },[chipIndex])

    const handleAddChip = async (chipValue: string, chipIndex: number) => {
        const cinemaId = await getCinemaId({...others});
        const addHall = await addHalls({
            cinemaId,
            type: [chipValue]
        })
    }

    const handleEditChip = async (chipValue: string, chipIndex: number) => {
        const cinemaId = await getCinemaId({...others});
        const updatedHall = await updateHallInfo({
            cinemaId,
            hallNumber: chipIndex + 1,
            type: chipValue
        })
    }

    const handleModalDeleteClick = async () => {
        if (chipIndex) {
            const cinemaId = await getCinemaId({...others});
            const deletedHall = await deleteHall(cinemaId, chipIndex + 1);
        }

        setOpen(false);
        setChips(newChips);

        await apiRef.current.setEditCellValue({ id, field, value: newChips });
        apiRef.current.stopCellEditMode({ id, field });
    }

    return (
       <>
           <MuiChipsInput
               sx={{width: '100%'}}
               value={chips}
               hideClearAll
               onChange={handleChange}
               onAddChip={handleAddChip}
               onEditChip={handleEditChip}
               onDeleteChip={(chipValue, chipIndex) => setChipIndex(chipIndex)}
           />
           {
               <Modal
                   open={open}
                   onClose={() => setOpen(false)}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
               >
                   <Box sx={style}>
                       {
                           sessionsInfo && <Typography variant="h6" component="h2">
                               {
                                   `In the near future, ${sessionsInfo} ${sessionsInfo >= 2? "sessions" : "session"} will be held in this hall`
                               }
                           </Typography>
                       }
                       <Typography id="modal-modal-title" variant="h6" component="h2">
                           Are you sure you want to delete this hall?
                       </Typography>
                       <Button onClick={handleModalDeleteClick}>Delete</Button>
                   </Box>
               </Modal>
           }
       </>
    );
}


export const renderChipEditInputCell: GridColDef['renderCell'] = (params) => {
    return <ChipEditInputCell {...params} />;
};
