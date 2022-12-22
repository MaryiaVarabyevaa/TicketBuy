import React, {useState} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import Box from "@mui/material/Box";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {Button, Grid, TextField} from "@mui/material";
import {cvcValidation, expiryValidation, nameValidation, numberValidation} from "./validation";
import {addOrder} from "../../http/orderAPI";
import {useSelector} from "react-redux";

interface ICard {
    number: string;
    expiry: string;
    name: string;
    cvc: string;
}

interface IRootState {
    user: any;
    order: any;
}

const CardForm = () => {
    const currentUserId = useSelector((state: IRootState) => state.user.currentUserId);
    const sessionId = useSelector((state: IRootState) => state.order.sessionId);
    const seats = useSelector((state: IRootState) => state.order.seats);
    const [number, setNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [focus, setFocus] = useState('');
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');

    const { handleSubmit, control } = useForm<ICard>({
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
        const order = await addOrder({
            userId: +currentUserId,
            sessionId: +sessionId,
            seats,
            sum: 20,
            status: 'paid'
        })
        console.log(order)
    }
    return (
        <Box id="PaymentForm" sx={{
            display: 'flex',
            flexDirection: 'column',

        }}>
            <Cards
                number={number}
                expiry={expiry}
                name={name}
                cvc={cvc}
                // @ts-ignore
                focused={focus}
            />
          <Box component="form" sx={{alignSelf: 'center'}} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
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
                                      // if (!!errors.number) {
                                      //     setNumber(event.target.value);
                                      // }
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
                                      // if (!!errors.name) {
                                      //     setName(event.target.value);
                                      // }
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
                                      // if (!!errors.expiry) {
                                      //     setExpiry(event.target.value);
                                      // }
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
                                      // if (errors.cvc) {
                                      //     setCvc(event.target.value);
                                      // }
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
                  <Button type='submit'>
                      Buy
                  </Button>
              </Grid>
          </Box>
        </Box>
    );
};

// localStorage.clear()
export default CardForm;