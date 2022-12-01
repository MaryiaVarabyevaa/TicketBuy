import {IUserDate} from "./UserDataTable";

export   const validate = (firstName: string, value: string) => {
    const valueField = value === 'firstName' ? 'First name' : 'Last name';
    if (firstName.length === 0) {
        return 'Required to fill in';
    }
    if(!firstName.match(/^[a-zA-Z]+$/)) {
        return `${value} can contain only latin alphabet`;
    }
}

export const validateHallsNumber = (hallsNumber: string) => {
    if (hallsNumber.length === 0) {
        return 'Required to fill in';
    }
    if (!hallsNumber.match(/^[0-9]+$/)) {
        return 'Number of halls can contain only numbers'
    }
}

export const validateDescription= (title: string) => {
    if (title.length === 0) {
        return 'Required to fill in';
    }
}

export const validateHallsUrl = (hallsNumber: string) => {
    if (hallsNumber.length === 0) {
        return 'Required to fill in';
    }
}


export const validateEmail = (rows: IUserDate[], email: string, id: number)=> {
    const editedUser = rows.find((user) => user.id === id) as IUserDate;
    const existingUsers = rows!.map((row) => row.email.toLowerCase());
    const exists = existingUsers.includes(email.toLowerCase());
    if (exists && email !== editedUser.email) {
        return `This email is already taken.`
    }
    if (email.length === 0) {
        return 'Required to fill in';
    }
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const res = re.test(String(email));
    if (!res) {
        return 'Enter the correct value';
    }
}

export const validateName = (firstName: string, value: string) => {
    const valueField = value === 'firstName' ? 'First name' : 'Last name';
    if (firstName.length === 0) {
        return 'Required to fill in';
    }
    if(!firstName.match(/^[a-zA-Z]+$/)) {
        return `${value} can contain only latin alphabet`;
    }
}