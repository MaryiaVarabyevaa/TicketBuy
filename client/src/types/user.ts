export enum UserActionTypes {
    ADD_USER= 'ADD_USER',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
    ADD_CURRENT_USER = 'ADD_CURRENT_USER',
    LOG_OUT = 'LOG_OUT'
}

export interface IUserState {
    isAuth: boolean;
    currentUser: any[];
    users: any[];
}

export interface IAddUserAction {
    type: UserActionTypes.ADD_USER;
    payload: any[];
}

export interface IUserAction {
    type: string;
    payload?: any;
}

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUpdateUserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}