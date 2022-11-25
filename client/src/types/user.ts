export enum UserActionTypes {
    ADD_USER= 'ADD_USER',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
}

export interface IUserState {
    isAuth: boolean;
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