import React, {useState} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import Box from "@mui/material/Box";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {Button, Grid, Modal, TextField} from "@mui/material";
import {cvcValidation, expiryValidation, nameValidation, numberValidation} from "./validation";
import {useDispatch, useSelector} from "react-redux";
import {getStatus} from "../../helpers/getStatus";
import {OrderStatus} from "../../types/order";
import {addOrder} from "../../http/orderAPI";
import {clearOrderAction} from "../../store/reducers/orderReducer";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../constants/routes";
import {openPaymentAction} from "../../store/reducers/basketReducer";

interface ICard {
    number: string;
    expiry: string;
    name: string;
    cvc: string;
}

interface IRootState {
    user: any;
    order: any;
    basket: any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    pt: 3,
    pb: 3
};

const CardForm = () => {
    const payment = useSelector((state: IRootState) => state.basket.payment);
    const [number, setNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [focus, setFocus] = useState('');
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSubmit, control, reset } = useForm<ICard>({
        mode: 'onSubmit',
        defaultValues: {
            number: '',
            expiry: '',
            name: '',
            cvc: '',
        }
    });
    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<ICard> = async (data)=> {
       try {
           const status = getStatus();

           if (status) {
               // const newOrder = await addOrder({
               //     userId: +currentUserId,
               //     sessionId: +order.sessionId,
               //     seats: [],
               //     sum: 30,
               //     status: OrderStatus.paid
               // })
               dispatch(clearOrderAction())
               navigate(MAIN_ROUTE)
           } else {
               reset({
                   number: '',
                   expiry: '',
                   name: '',
                   cvc: ''
               });
               setNumber('');
               setName('');
               setExpiry('');
               setCvc('');
                throw Error('Payment refused')
           }
       } catch (err) {
           console.log(err)
       }
    }

    const handleClose = () => {
        dispatch(openPaymentAction(false));
    }

    return (
        <Modal
            open={payment}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style }}>
                <Box id="PaymentForm" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    p: 4
                }}>
                    <Cards
                        number={number}
                        expiry={expiry}
                        name={name}
                        cvc={cvc}
                        // @ts-ignore
                        focused={focus}
                    />
                    <Box component="form" sx={{alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} sx={{flexDirection: 'column', alignItems: 'center'}}>
                            <Grid item xs={12} sm={8} sx={{width: '100%'}}>
                                <Controller
                                    control={ control }
                                    name='number'
                                    rules={ numberValidation }
                                    render={({
                                                 field: {onChange, value}
                                             }) => (
                                        <TextField
                                            type='tel'
                                            name='number'
                                            label='Card number'
                                            value={value}
                                            onChange={(event) => {
                                                setNumber(event.target.value);
                                                onChange(event);

                                            }}
                                            onFocus={(e)=>setFocus(e.target.name)}
                                            error={!!errors.number?.message}
                                            helperText={ errors.number?.message as string}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Controller
                                    control={ control }
                                    name='name'
                                    rules={ nameValidation }
                                    render={({
                                                 field: {onChange, value}
                                             }) => (
                                        <TextField
                                            type='text'
                                            name='name'
                                            label='Name'
                                            value={name}
                                            onChange={(event) => {
                                                setName(event.target.value);
                                                onChange(event);
                                            }}
                                            onFocus={(e)=>setFocus(e.target.name)}
                                            error={!!errors.name?.message}
                                            helperText={ errors.name?.message as string}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Controller
                                    control={ control }
                                    name='expiry'
                                    rules={ expiryValidation }
                                    render={({
                                                 field: {onChange, value}
                                             }) => (
                                        <TextField
                                            type='tel'
                                            name='expiry'
                                            label='MM/YY Expiry'
                                            value={expiry}
                                            onChange={(event) => {
                                                setExpiry(event.target.value);
                                                onChange(event);
                                            }}
                                            onFocus={(e)=>setFocus(e.target.name)}
                                            error={!!errors.expiry?.message}
                                            helperText={ errors.expiry?.message as string }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Controller
                                    control={ control }
                                    name='cvc'
                                    rules={ cvcValidation }
                                    render={({
                                                 field: {onChange, value}
                                             }) => (
                                        <TextField
                                            type='tel'
                                            name='cvc'
                                            label='CVC'
                                            value={cvc}
                                            onChange={(event) => {
                                                setCvc(event.target.value);
                                                onChange(event);
                                            }}
                                            onFocus={(e)=>setFocus(e.target.name)}
                                            error={!!errors.cvc?.message}
                                            helperText={ errors.cvc?.message as string}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Button type='submit' sx={{width: '150px', alignSelf: 'center'}} variant="contained">
                            pay
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
//
// localStorage.clear()
export default CardForm;