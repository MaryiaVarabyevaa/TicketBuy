import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Reviews = () => {
    return (
        <Stack spacing={3} sx={{mt: 5}} >

            <Typography variant="h5" gutterBottom>
                Сomments
            </Typography>
           <Box>
               <TextField
                   placeholder="Enter a comment"
                   multiline
                   fullWidth
                   rows={2}
                   maxRows={4}
                   // onChange={onChange}
                   // value={value}
                   // error={!!errors.firstName?.message}
                   // helperText={ errors.firstName?.message }
               />
               <Button variant="contained" size='large' sx={{mt: 2}}>Leave a comment</Button>
           </Box>
            <Stack spacing={2}>
                <Typography variant="body1" sx={{bgcolor: 'rgba(0,0,0,0.1)'}}>comment 1</Typography>
                <Typography variant="body1" sx={{bgcolor: 'rgba(0,0,0,0.1)'}}>comment 2</Typography>
            </Stack>
        </Stack>
    );
};

export default Reviews;