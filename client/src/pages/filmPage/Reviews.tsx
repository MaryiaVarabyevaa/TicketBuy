import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {useParams} from "react-router-dom";
import {addComment, checkComment, deleteComment, getComments, updateComment} from "../../http/commentsAPI";
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
    const currentUserId = useSelector((state: IRootState) => state.user.currentUserId);
    const [hasComment, setHasComment] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [commentText, setCommentText] = useState('');
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
        if (id && currentUserId) {
            const comment = await addComment({
                text: value,
                userId: +currentUserId,
                filmId: +id
            });
            setIsAdded(!isAdded);
        }
    }

    const handleClick = async (id: number) => {
        const comment = await deleteComment(id);
        setIsDeleted(!isDeleted)
    }

    const checkCommentInfo = async () => {
        if (id && currentUserId) {
            const hasComment = await checkComment(currentUserId, +id);
            setHasComment(hasComment);
        }
    }

    useEffect(()=>{
        getData();
        checkCommentInfo();
    },[isAdded, isDeleted])

    const handleEdit = (text: string) => {
        setIsEdited(!isEdited);
        setCommentText(text);

    }
    const handleUpdateComment = async () => {
        if (id) {
            const newComment = await updateComment(+id, currentUserId, commentText);
            setIsAdded(!isAdded);
            setIsEdited(!isEdited);
        }
    }
    return (
        <Stack spacing={3} sx={{mt: 5}}>

            <Typography variant="h4" gutterBottom>
                Сomments
            </Typography>
            {
                (comments.length === 0 && !isAuth) && <Typography variant='h5' sx={{pl: '83px', color: '#D7DBDD'}}>There are no comments here yet</Typography>

            }
            {
               ( (isAuth && !hasComment) || isEdited) &&
                <Box>
                    <TextField
                        placeholder="Enter a comment"
                        id="review"
                        multiline
                        fullWidth
                        rows={3}
                        onChange={(event) => isEdited? setCommentText(event.target.value) : setValue(event.target.value)}
                        value={isEdited? commentText : value}
                    />
                    <Button
                        variant="contained"
                        size='large'
                        sx={{mt: 2}}
                        onClick={isEdited? handleUpdateComment : handleSubmit}
                    >
                        {
                            isEdited? 'Edit a comment' : 'Leave a comment'
                        }
                    </Button>
                </Box>
            }
            <Stack spacing={2}>
                {
                    (comments.length !== 0) && comments.map((comment: IFullReviewInfo) => {
                        const {text, fullName, date, id, userId} = comment;
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
                                {
                                    (hasComment && userId === currentUserId && !isEdited) &&
                                    <Box sx={{alignSelf: 'center'}}>
                                        <IconButton sx={{p: 0}} disableRipple  onClick={() => handleEdit(text)}>
                                            <EditIcon fontSize="small" color="disabled"/>
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