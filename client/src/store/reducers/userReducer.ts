import {IUser, IUserAction, IUserState, UserActionTypes} from "../../types/user";

const defaultState: IUserState = {
    isAuth: false,
    users: [],
};

export const userReducer = (state = defaultState, action: IUserAction): IUserState => {
    switch (action.type) {
        case UserActionTypes.ADD_USER:
            localStorage.setItem('isAuth', 'true');

            if (state.users.length === 0) {
                localStorage.setItem('users', JSON.stringify([action.payload]));
            } else {
                localStorage.setItem('users', JSON.stringify([...state.users, action.payload]));
            }
            return {...state, isAuth: true, users: [...state.users, action.payload]};
        case UserActionTypes.RESTORE_FROM_STORAGE:
            const isAuth = !!localStorage.getItem('isAuth');
            const users = JSON.parse(localStorage.getItem('users') as string);
            return {...state, users: users? users : [], isAuth: isAuth? isAuth : false};
        default:
            return state;
    }
}

export const addUserAction = (payload: IUser): IUserAction => {
    return {
        type: UserActionTypes.ADD_USER,
        payload: payload
    }
}

export const restoreFromStorageAction = () => {
    return {
        type: UserActionTypes.RESTORE_FROM_STORAGE,
    }
}