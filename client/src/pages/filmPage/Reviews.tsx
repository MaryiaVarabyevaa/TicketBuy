import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

const Reviews = (reviews: string[]) => {
    const [value, setValue] = useState('');
    const [listOfReviews, setListOfReviews] = useState<string[]>([]);

   useEffect(() => {
       const arr = [];
       for (const review in reviews) {
           arr.push(reviews[review]);
       }
       setListOfReviews(arr);
   },[])
    console.log(listOfReviews);
    const handleSubmit = () => {
        console.log(value);
    }

    return (
        <Stack spacing={3} sx={{mt: 5}}>

            <Typography variant="h5" gutterBottom>
                Сomments
            </Typography>
           <Box>
               <TextField
                   placeholder="Enter a comment"
                   id="review"
                   multiline
                   fullWidth
                   rows={2}
                   maxRows={4}
                   onChange={(event) => setValue(event.target.value)}
                   value={value}
               />
               <Button
                   variant="contained"
                   size='large'
                   sx={{mt: 2}}
                   onClick={handleSubmit}
               >
                   Leave a comment
               </Button>
           </Box>
            <Stack spacing={2}>
                {
                    listOfReviews && listOfReviews.map((review) => {
                        return <Box sx={{bgcolor: '#f2f2f2', p: 1}}>
                            <Box sx={{display: "flex", justifyContent: 'space-between'}}>
                                <Box  sx={{display: "flex", gap: '10px', alignItems: "center"}}>
                                    <AccountCircleIcon fontSize="large" color="primary"  />
                                    <Typography variant="body2" sx={{fontWeight: '600'}}>Maryia Varabyova</Typography>
                                    <Typography variant="body2" sx={{fontWeight: '200', color: 'grey'}} >27 ноября 2022 в 20:26</Typography>
                                </Box>
                                <Box sx={{alignSelf: 'center'}}>
                                   <IconButton sx={{p: 0}} disableRipple>
                                       <EditIcon fontSize="small" color="disabled" />
                                   </IconButton>
                                    <IconButton sx={{p: 0}} disableRipple>
                                        <DeleteIcon fontSize="small" color="disabled" />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="body1" sx={{pl: '45px'}}>{review}</Typography>
                        </Box>
                    })
                }
            </Stack>
        </Stack>
    );
};

export default Reviews;