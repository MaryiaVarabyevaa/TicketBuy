import {GridToolbarContainer} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import {Box, Modal, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import {getAllFilms} from "../../../../http/filmAPI";
import {getAllCinema} from "../../../../http/cinemaAPI";
import {ICinema} from "../../../../types/cinema";
import MenuItem from "@mui/material/MenuItem";
import {GetHallsById} from "../../../../http/hallsAPI";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {validationFields, validationPrice} from "./validation";
import {IHalls} from "../../../../types/halls";
import {addSession, getCurrentFilmsFromSessions} from "../../../../http/sessionAPI";
import {IFilm} from "../../../../types/film";


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


const currency = ['BYN', 'USD', 'RUB', 'EUR', 'CHY'];

export function EditToolbar(props: any) {
    const { isClicked , setIsClicked } = props;
    const [open, setOpen] = React.useState(false);
    const [films, setFilms] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [cinemaValue, setCinemaValue] = useState('');
    const [halls, setHalls] = useState([]);


    const { handleSubmit, control} = useForm<any>({
        mode: 'onChange',
        defaultValues: {
            price: '',
            currency: '',
            date: '',
            time: '',
            hall: '',
            film: '',
            cinema: ''
        }
    });

    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<any> = async (data)=> {
        const {cinema, hall, film, price, time, date, currency} = data;
        let cinemaId = 0;
        let hallId = 0;
        let filmId = 0;
        cinemas.map((item: ICinema) => {
            if (item.fullName === cinema) {
                cinemaId = item.id as number;
            }
        })

        halls.map((item: IHalls) => {
            if (hall === item.hallNumber) {
                hallId = item.id as number;
            }
        })

        films.map((item: IFilm) => {
            if (item.title === film) {
                filmId = item.id as number;
            }
        })

        await addSession({ filmId, cinemaId, price, date, time, hallId, currency });
        setIsClicked(!isClicked);
        setOpen(false);
    }


    const getData = async () => {
        const films = await getAllFilms();
        const cinema = await getAllCinema();


        cinema.map((item: ICinema) => {
            item["fullName"] = `${item.name} (${item.city}, ${item.street}, ${item.buildingNumber})`;
        })

        setFilms(films);
        setCinemas(cinema)
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
        cinemas.map(({fullName, id}) => {
            if (element === fullName) {
                cinemaId = id;
            }
        })

        const halls = await GetHallsById(cinemaId);
        setHalls(halls);
        setCinemaValue(element);

    }

    return <GridToolbarContainer>
        <Button color="primary"
                startIcon={<AddIcon />}
                onClick={handleClick}>
            Add record
        </Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box
                sx={style}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack spacing={2} sx={{width: '100%'}}>
                    <Controller
                        control={ control }
                        name='cinema'
                        rules={validationFields}
                        render={({
                                     field: {onChange, value}
                                 }) => (
                            <TextField
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Cinema"
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                    handleClickCinema(value)
                                } }
                                error={!!errors.cinema?.message}
                                helperText={ errors.cinema?.message as string }
                            >
                                {cinemas && cinemas.map((item) => {
                                        const {id, fullName} = item;
                                        return <MenuItem key={id} value={fullName}>
                                            {fullName}
                                        </MenuItem>
                                    }
                                )}
                            </TextField>
                        )}
                    />
                    <Controller
                        control={ control }
                        name='film'
                        rules={validationFields}
                        render={({
                                     field: {onChange, value}
                                 }) => (
                            <TextField
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Film"
                                value={value}
                                onChange={onChange}
                                error={!!errors.film?.message}
                                helperText={ errors.film?.message as string }
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
                        rules={validationFields}
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
                                error={!!errors.hall?.message}
                                helperText={ errors.hall?.message as string }
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
                        rules={validationPrice}
                        render={({
                                     field: {onChange, value}
                                 }) => (
                            <TextField
                                id="outlined-basic"
                                label="Price"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!errors.price?.message}
                                helperText={ errors.price?.message as string }
                            />
                        )}
                    />
                    <Controller
                        control={ control }
                        name='currency'
                        rules={validationFields}
                        render={({
                                     field: {onChange, value}
                                 }) => (
                            <TextField
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Currency"
                                required
                                value={value}
                                onChange={onChange}
                                error={!!errors.currency?.message}
                                helperText={ errors.currency?.message as string }
                            >
                                {currency.map((cur, index) => {
                                        return <MenuItem key={index} value={cur}>
                                            {cur}
                                        </MenuItem>
                                    }
                                )}
                            </TextField>
                        )}
                    />
                    <Controller
                        control={ control }
                        name='date'
                        rules={validationFields}
                        render={({
                                     field: {onChange, value}
                                 }) => (
                            <TextField
                                label="Date"
                                InputLabelProps={{ shrink: true }}
                                type="date"
                                value={value}
                                onChange={onChange}
                                error={!!errors.date?.message}
                                helperText={ errors.date?.message as string }
                            />
                        )}
                    />
                    <Controller
                        control={ control }
                        name='time'
                        rules={validationFields}
                        render={({
                                     field: {onChange, value}
                                 }) => (
                            <TextField
                                label="Time"
                                InputLabelProps={{ shrink: true }}
                                type="time"
                                value={value}
                                onChange={onChange}
                                error={!!errors.time?.message}
                                helperText={ errors.time?.message as string }
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
    </GridToolbarContainer>
}