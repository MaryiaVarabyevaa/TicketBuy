import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {useParams} from "react-router-dom";
import {addComment, deleteComment, getComments} from "../../http/commentsAPI";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {IFullReviewInfo} from "../../types/review";
import {getUserById} from "../../http/userAPI";
import {useSelector} from "react-redux";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
interface IRootState {
    user: any
}


const Reviews = () => {
    const [value, setValue] = useState('');
    const [comments, setComments] = useState<IFullReviewInfo[]>([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const isAuth = useSelector((state: IRootState) => state.user.isAuth);
    const isModerator = useSelector((state: IRootState) => state.user.isModerator);
    const currentUser = useSelector((state: IRootState) => state.user.currentUser);
    const {id} = useParams();

    const getData = async () => {
       if (id) {
           const reviews = await getComments(+id);

           await Promise.all(
               reviews.map(async (review: IFullReviewInfo)  =>{
                   const user = await getUserById(review.userId);
                   const {firstName, lastName} = user;

                   const {createdAt} = review;
                   const date = new Date(createdAt);
                   const year = date.getFullYear();
                   const month= date.getMonth();
                   const day = date.getDate();
                   const hours = date.getHours();
                   const minutes = date.getMinutes();

                   review["fullName"] = `${firstName} ${lastName}`;
                   review["date"] = `${day} ${months[month]} ${year}, ${hours}:${minutes}`;
               })
           )

           setComments(reviews);
       }
    }

    const handleSubmit = async () => {
        if (id && currentUser) {
            const comment = await addComment({
                text: value,
                userId: +currentUser.id,
                filmId: +id
            });
            setIsAdded(!isAdded);
        }
    }

    const handleClick = async (id: number) => {
        const comment = await deleteComment(id);
        setIsDeleted(!isDeleted)
    }

    useEffect(()=>{
        getData();
    },[isAdded, isDeleted])

    return (
        <Stack spacing={3} sx={{mt: 5}}>

            <Typography variant="h5" gutterBottom>
                Сomments
            </Typography>
            {
                isAuth &&
                <Box>
                    <TextField
                        placeholder="Enter a comment"
                        id="review"
                        multiline
                        fullWidth
                        rows={3}
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
            }
            <Stack spacing={2}>
                {
                    (comments.length !== 0) && comments.map((comment: IFullReviewInfo) => {
                        const {text, fullName, date, id} = comment;
                        return <Box sx={{bgcolor: '#f2f2f2', p: 1}} key={id}>
                            <Box sx={{display: "flex", justifyContent: 'space-between'}}>
                                <Box sx={{display: "flex", gap: '10px', alignItems: "center"}}>
                                    <AccountCircleIcon fontSize="large" color="primary"  />
                                    <Typography variant="body2" sx={{fontWeight: '600'}}>{fullName}</Typography>
                                    <Typography variant="body2" sx={{fontWeight: '200', color: 'grey'}} >{date}</Typography>
                                </Box>
                                {
                                    isModerator &&
                                    <Box sx={{alignSelf: 'center'}}>
                                        <IconButton sx={{p: 0}} disableRipple onClick={() => handleClick(id)}>
                                            <DeleteIcon fontSize="small" color="disabled" />
                                        </IconButton>
                                    </Box>
                                }
                            </Box>
                            <Typography variant="body1" sx={{pl: '45px'}}>{text}</Typography>
                        </Box>
                    })
                }
            </Stack>
        </Stack>
    );
};

export default Reviews;