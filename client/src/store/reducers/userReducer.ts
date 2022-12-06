import {IUser, IUserAction, IUserState, UserActionTypes} from "../../types/user";

const defaultState: IUserState = {
    isAuth: false,
    currentUser: [],
    users: [],
};

export const userReducer = (state = defaultState, action: IUserAction): IUserState => {
    switch (action.type) {
        case UserActionTypes.ADD_USER:
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('currentUser', JSON.stringify([action.payload]));
            if (state.users.length === 0) {
                localStorage.setItem('users', JSON.stringify([action.payload]));
            } else {
                localStorage.setItem('users', JSON.stringify([...state.users, action.payload]));
            }
            return {...state, isAuth: true, users: [...state.users, action.payload], currentUser: action.payload};
        case UserActionTypes.ADD_CURRENT_USER:
            localStorage.setItem('currentUser', JSON.stringify([action.payload]));
            return {...state, currentUser: action.payload, isAuth: true}
        case UserActionTypes.LOG_OUT:
            localStorage.setItem('isAuth', 'false');
            localStorage.setItem('currentUser', JSON.stringify([]));
            return {...state, isAuth: false, currentUser: []}
        case UserActionTypes.RESTORE_FROM_STORAGE:
            const isAuth = !!localStorage.getItem('isAuth');
            const users = JSON.parse(localStorage.getItem('users') as string);
            const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
            return {
                ...state,
                users: users? users : [],
                isAuth: isAuth? isAuth : false,
                currentUser: currentUser? currentUser : [],
            };
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

export const addCurrentUserStorageAction = (payload: IUser): IUserAction=> {
    return {
        type: UserActionTypes.ADD_CURRENT_USER,
        payload: payload
    }
}

export const logOutAction = () => {
    return {
        type: UserActionTypes.LOG_OUT,
    }
}