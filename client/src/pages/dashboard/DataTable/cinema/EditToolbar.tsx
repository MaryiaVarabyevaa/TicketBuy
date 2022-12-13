import * as React from "react";
import {useState} from "react";
import {MuiChipsInput, MuiChipsInputChip} from "mui-chips-input";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ICinema} from "../../../../types/cinema";
import {addCinema} from "../../../../http/cinemaAPI";
import {addHalls} from "../../../../http/hallsAPI";
import {GridRowModesModel, GridRowsProp, GridToolbarContainer} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Box, Grid, Modal, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import {validation, validationChip, validationNumber, validationStreet} from "./validation";

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

export const EditToolbar = (props: EditToolbarProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<MuiChipsInputChip[]>([])

    const { handleSubmit, control } = useForm<any>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            city: '',
            street: '',
            type: [],
            buildingNumber: 1,
        }
    });

    const {errors} = useFormState({
        control
    });
    const handleClose = () => setOpen(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        setOpen(true)
    }

    const onSubmit: SubmitHandler<ICinema> = async (data)=> {
        const {buildingNumber, type,...others} = data;

        const cinema = await addCinema({...others, buildingNumber: +buildingNumber});
        const halls = await addHalls({
            type: type as string[],
            cinemaId: cinema.id
        });
        setOpen(false)
    }

    const handleChange = (newValue: MuiChipsInputChip[]) => {
        setValue(newValue)
    }


    // @ts-ignore
    return <GridToolbarContainer>
        <Button color="primary"
                startIcon={<AddIcon />}
                onClick={handleClick}
        >
            Add record
        </Button>
        {
            isClicked &&
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                >
                    <Box component="form"
                         onSubmit={handleSubmit(onSubmit)}
                         sx={{ mt: 3 }}
                    >
                        <Stack spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={ control }
                                    name='name'
                                    rules={validation}
                                    render={({
                                                 field: {onChange, value}
                                             }) => (
                                        <TextField
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            autoFocus
                                            onChange={onChange}
                                            value={value}
                                            error={!!errors.name?.message}
                                            helperText={ errors.name?.message as string }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="type"
                                    control={ control }
                                    rules={ validationChip }
                                    render={({
                                                 field: {onChange, value},
                                             }) =>  (
                                        <MuiChipsInput
                                            label="Type of halls"
                                            id='type'
                                            fullWidth
                                            value={value}
                                            hideClearAll
                                            onChange={onChange}
                                            error={!!errors.type?.message}
                                            helperText={ errors.type?.message as string }
                                            validate={(chipValue) => {
                                                return {
                                                    isError: !(chipValue.match(/^[a-zA-Z ]+$/)),
                                                    textError: 'The value can contain only latin alphabet'
                                                }
                                            }}
                                        />
                                    )}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={ control }
                                    name='city'
                                    rules={ validation }
                                    render={({
                                                 field: {onChange, value}
                                             }) => (
                                        <TextField
                                            fullWidth
                                            id="city"
                                            label="City"
                                            autoFocus
                                            onChange={onChange}
                                            value={value}
                                            error={!!errors.city?.message}
                                            helperText={ errors.city?.message as string }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={ control }
                                    name='street'
                                    rules={ validationStreet }
                                    render={({
                                                 field: {onChange, value}
                                             }) => (
                                        <TextField
                                            fullWidth
                                            id="street"
                                            label="Street"
                                            autoFocus
                                            onChange={onChange}
                                            value={value}
                                            error={!!errors.street?.message}
                                            helperText={ errors.street?.message as string}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={ control }
                                    name='buildingNumber'
                                    rules={ validationNumber }
                                    render={({
                                                 field: {onChange, value}
                                             }) => (
                                        <TextField
                                            fullWidth
                                            id="buildingNumber"
                                            label="Number of building"
                                            autoFocus
                                            onChange={onChange}
                                            value={value}
                                            error={!!errors.buildingNumber?.message}
                                            helperText={ errors.buildingNumber?.message as string }
                                        />
                                    )}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                add
                            </Button>

                        </Stack>
                    </Box>
                </Box>
            </Modal>
        }
    </GridToolbarContainer>
}