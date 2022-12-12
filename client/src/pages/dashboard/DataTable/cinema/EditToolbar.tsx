import {useState} from "react";
import * as React from "react";
import {MuiChipsInput, MuiChipsInputChip} from "mui-chips-input";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ICinema} from "../../../../types/cinema";
import {addCinema} from "../../../../http/cinemaAPI";
import {addHalls} from "../../../../http/hallsAPI";
import {GridToolbarContainer} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Box, Grid, Modal, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";

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

export const EditToolbar = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState<MuiChipsInputChip[]>([])


    const { handleSubmit, control } = useForm<any>({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            city: '',
            street: '',
            buildingNumber: 1,
        }
    });
    const {errors} = useFormState({
        control
    });

    const handleClick = () => {
        setIsClicked(!isClicked);
        setOpen(true)
    }

    const onSubmit: SubmitHandler<ICinema> = async (data)=> {
        const {buildingNumber, ...others} = data;
        const cinema = await addCinema({...others, buildingNumber: +buildingNumber});
        const halls = await addHalls({
            type: value,
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
                    // sx={{
                    //     paddingTop: 8,
                    //     paddingBottom: 8,
                    //     paddingLeft: 2,
                    //     paddingRight: 2,
                    //     display: 'flex',
                    //     flexDirection: 'column',
                    //     alignItems: 'center',
                    // }}
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
                                    // rules={ firstNameValidation }
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
                                            // error={!!errors.firstName?.message}
                                            // helperText={ errors.firstName?.message }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiChipsInput label="Type of halls" fullWidth value={value} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={ control }
                                    name='city'
                                    // rules={ firstNameValidation }
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
                                            // error={!!errors.firstName?.message}
                                            // helperText={ errors.firstName?.message }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={ control }
                                    name='street'
                                    // rules={ firstNameValidation }
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
                                            // error={!!errors.firstName?.message}
                                            // helperText={ errors.firstName?.message }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={ control }
                                    name='buildingNumber'
                                    // rules={ firstNameValidation }
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
                                            // error={!!errors.firstName?.message}
                                            // helperText={ errors.firstName?.message }
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