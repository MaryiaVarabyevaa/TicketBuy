import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {useDispatch, useSelector} from "react-redux";
import {toggleBasketAction} from "../store/reducers/basketReducer";
import Basket from "../pages/paymentPage/Basket";

interface IRootState {
    user: any,
    order: any,
    basket: any
}


const DrawerComponent = () => {
    const toggle = useSelector((state: IRootState) => state.basket.toggle);
    const dispatch = useDispatch();
    return (
        <Drawer
            anchor="right"
            open={toggle}
            onClose={() => dispatch(toggleBasketAction(false))}
        >
           <Basket />
        </Drawer>
    );
}

export default DrawerComponent;