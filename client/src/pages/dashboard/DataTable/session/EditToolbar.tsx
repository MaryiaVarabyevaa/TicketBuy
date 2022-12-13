import {GridRowModesModel, GridRowsProp, GridToolbarContainer} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {Box, Grid, Modal, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {getAllFilms} from "../../../../http/filmAPI";
import {IFilm} from "../../../../types/film";
import {addCinema, getAllCinema} from "../../../../http/cinemaAPI";
import {ICinema} from "../../../../types/cinema";
import MenuItem from "@mui/material/MenuItem";
import {addHalls, GetHallsById} from "../../../../http/hallsAPI";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {validation} from "../cinema/validation";
import {ISession} from "../../../../types/session";


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


export function EditToolbar(props: any) {
    const { isClicked , setIsClicked } = props;
    const [open, setOpen] = React.useState(false);
    const [films, setFilms] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [cinemaValue, setCinemaValue] = useState('');
    const [halls, setHalls] = useState([]);


    const { handleSubmit, control} = useForm<any>({
        mode: 'onChange',
        defaultValues: {
            price: '',
            date: '',
            time: '',
            hall: '',
            film: ''
        }
    });

    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<ISession> = async (data)=> {
        console.log(data);
    }


    const getData = async () => {
        const films = await getAllFilms();
        const cinema = await getAllCinema();

        cinema.map((item: ICinema) => {
            item["fullName"] = `${item.name} (${item.city}, ${item.street}, ${item.buildingNumber})`;
        })

        setFilms(films);
        setCinema(cinema)
    };

    useEffect(()=>{
        getData();
    },[])

    const handleClick = () => {
        setIsClicked(!isClicked);
        setOpen(true);
    };


    const handleClickCinema = async (e: ChangeEvent) => {
        const element = (e.target as HTMLInputElement).value;
        let cinemaId = 0;
        cinema.map(({fullName, id}) => {
            if (element === fullName) {
                cinemaId = id;
            }
        })

        const halls = await GetHallsById(cinemaId);
        setHalls(halls);
        setCinemaValue(element);

    }

    return<GridToolbarContainer>
        <Button color="primary"
                startIcon={<AddIcon />}
                onClick={handleClick}>
            Add record
        </Button>
        {
            open && <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={style}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={2} sx={{width: '100%'}}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Cinema"
                            required
                            value={cinemaValue}
                            onChange={(e) => handleClickCinema(e)}
                        >
                            {cinema && cinema.map((item) => {
                                    const {id, fullName} = item;
                                    return <MenuItem key={id} value={fullName}>
                                        {fullName}
                                    </MenuItem>
                                }
                            )}
                        </TextField>
                        <Controller
                            control={ control }
                            name='film'
                            // rules={validation}
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    fullWidth
                                    label="Film"
                                    required
                                    value={value}
                                    onChange={onChange}
                                >
                                    {films && films.map((film) => {
                                            const {id, title} = film;
                                            return <MenuItem key={id} value={title}>
                                                {title}
                                            </MenuItem>
                                        }
                                    )}
                                </TextField>
                            )}
                        />
                        <Controller
                            control={ control }
                            name='hall'
                            // rules={validation}
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    fullWidth
                                    label="Hall"
                                    required
                                    value={value}
                                    disabled={cinemaValue.length === 0? true : false}
                                    onChange={onChange}
                                >
                                    {halls && halls.map((hall) => {
                                            const {id, hallNumber} = hall;
                                            return <MenuItem key={id} value={hallNumber}>
                                                {hallNumber}
                                            </MenuItem>
                                        }
                                    )}
                                </TextField>
                            )}
                        />

                        <Controller
                            control={ control }
                            name='price'
                            // rules={validation}
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <TextField
                                    id="outlined-basic"
                                    label="Price"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    // error={!!errors.name?.message}
                                    // helperText={ errors.name?.message as string }
                                />
                            )}
                        />
                        <Controller
                            control={ control }
                            name='date'
                            // rules={validation}
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <TextField
                                    label="Date"
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    value={value}
                                    onChange={onChange}
                                    // error={!!errors.name?.message}
                                    // helperText={ errors.name?.message as string }
                                />
                            )}
                        />
                        <Controller
                            control={ control }
                            name='time'
                            // rules={validation}
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <TextField
                                    label="Time"
                                    InputLabelProps={{ shrink: true }}
                                    type="time"
                                    value={value}
                                    onChange={onChange}
                                    // error={!!errors.name?.message}
                                    // helperText={ errors.name?.message as string }
                                />
                            )}
                        />
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
            </Modal>
        }
    </GridToolbarContainer>
}