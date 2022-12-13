import {GridRowModesModel, GridRowsProp, GridToolbarContainer} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {Box, Grid, Modal, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {getAllFilms} from "../../../../http/filmAPI";
import {IFilm} from "../../../../types/film";
import {getAllCinema} from "../../../../http/cinemaAPI";
import {ICinema} from "../../../../types/cinema";
import MenuItem from "@mui/material/MenuItem";
import {GetHallsById} from "../../../../http/hallsAPI";


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
    const [filmValue, setFilmValue] = useState('');
    const [cinema, setCinema] = useState([]);
    const [cinemaValue, setCinemaValue] = useState('');
    const [halls, setHalls] = useState([]);
    const [hallNumber, setHallNumber] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

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
                >
                    <Stack spacing={2} sx={{width: '100%'}}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Cinema"
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
                        <TextField
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Film"
                            value={filmValue}
                            onChange={(e) => setFilmValue(e.target.value)}
                        >
                            {films && films.map((film) => {
                                    const {id, title} = film;
                                    return <MenuItem key={id} value={title}>
                                        {title}
                                    </MenuItem>
                                }
                            )}
                        </TextField>
                        <TextField
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Hall"
                            value={hallNumber}
                            disabled={cinemaValue.length === 0? true : false}
                            onChange={(e) => setHallNumber(e.target.value)}
                        >
                            {halls && halls.map((hall) => {
                                    const {id, hallNumber} = hall;
                                    return <MenuItem key={id} value={hallNumber}>
                                        {hallNumber}
                                    </MenuItem>
                                }
                            )}
                        </TextField>
                        <TextField
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="Date"
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <TextField
                            label="Time"
                            InputLabelProps={{ shrink: true }}
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
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