import {IUser, IUserAction, IUserState, UserActionTypes} from "../../types/user";

const defaultState: IUserState = {
    isAuth: false,
    isAdmin: false,
    isModerator: false,
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
        case UserActionTypes.LOG_IN:
            const role = action.payload.role;
            if (role === 'admin') {
                localStorage.setItem('isAdmin', 'true');
            }
            if (role === 'moderator') {
                localStorage.setItem('isModerator', 'true');
            }
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('currentUser', JSON.stringify([action.payload]));
            return {
                ...state,
                isAuth: true,
                isAdmin: role === 'admin' ? true : false,
                isModerator: role === 'moderator' ? true : false,
                currentUser: action.payload,
            }
        case UserActionTypes.LOG_OUT:
            localStorage.setItem('isAuth', 'false');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('isModerator', 'false');
            localStorage.setItem('currentUser', JSON.stringify([]));
            return {
                ...state,
                isAuth: false,
                isAdmin: false,
                isModerator: false,
                currentUser: [],
            }
        case UserActionTypes.RESTORE_FROM_STORAGE:
            const isAuth = localStorage.getItem('isAuth') === 'true'? true : false;
            const users = JSON.parse(localStorage.getItem('users') as string);
            const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
            const isAdmin = localStorage.getItem('isAdmin') === 'true'? true : false
            const isModerator = localStorage.getItem('isModerator') === 'true'? true : false;
            return {
                ...state,
                users: users? users : [],
                isAuth,
                isAdmin,
                isModerator,
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

export const logInAction = (payload: IUser): IUserAction=> {
    return {
        type: UserActionTypes.LOG_IN,
        payload: payload
    }
}

export const logOutAction = () => {
    return {
        type: UserActionTypes.LOG_OUT,
    }
}
// localStorage.clear()