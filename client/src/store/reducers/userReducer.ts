import {IUser, IUserAction, IUserState, UserActionTypes} from "../../types/user";

const defaultState: IUserState = {
    isAuth: false,
    isAdmin: false,
    isModerator: false,
    currentUserId: null,
    users: [],
};

export const userReducer = (state = defaultState, action: IUserAction): IUserState => {
    switch (action.type) {
        case UserActionTypes.ADD_USER:
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('currentUserId', action.payload.id);
            if (state.users.length === 0) {
                localStorage.setItem('users', JSON.stringify([action.payload]));
            } else {
                localStorage.setItem('users', JSON.stringify([...state.users, action.payload]));
            }
            return {...state, isAuth: true, users: [...state.users, action.payload], currentUserId: action.payload.id};
        case UserActionTypes.LOG_IN:
            const role = action.payload.role;
            if (role === 'admin') {
                localStorage.setItem('isAdmin', 'true');
            }
            if (role === 'moderator') {
                localStorage.setItem('isModerator', 'true');
            }
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('currentUserId', action.payload.id);
            return {
                ...state,
                isAuth: true,
                isAdmin: role === 'admin' ? true : false,
                isModerator: role === 'moderator' ? true : false,
                currentUserId: action.payload.id,
            }
        case UserActionTypes.LOG_OUT:
            localStorage.setItem('isAuth', 'false');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('isModerator', 'false');
            localStorage.setItem('currentUserId', JSON.stringify(null));
            return {
                ...state,
                isAuth: false,
                isAdmin: false,
                isModerator: false,
                currentUserId: null,
            }
        case UserActionTypes.RESTORE_FROM_STORAGE:
            const isAuth = localStorage.getItem('isAuth') === 'true'? true : false;
            const users = JSON.parse(localStorage.getItem('users') as string);
            const currentUserId = JSON.parse(localStorage.getItem('currentUserId') as string);
            const isAdmin = localStorage.getItem('isAdmin') === 'true'? true : false
            const isModerator = localStorage.getItem('isModerator') === 'true'? true : false;
            return {
                ...state,
                users: users? users : [],
                isAuth,
                isAdmin,
                isModerator,
                currentUserId: currentUserId? currentUserId : null,
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
