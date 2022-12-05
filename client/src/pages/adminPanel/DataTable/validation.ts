import {IUserDate} from "./UserDataTable";

export const validateLength = (value: string) => {
    if (value.length === 0) {
        return 'Required to fill in';
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
    if (firstName.length === 0) {
        return 'Required to fill in';
    }
    if(!firstName.match(/^[a-zA-Z ]+$/)) {
        return `${value} can contain only latin alphabet`;
    }
}

export const validateTitle = (title: string) => {
    if (title.length === 0) {
        return 'Required to fill in';
    }
    if(!title.match(/^[a-zA-Z0-9\s:,.]+$/)) {
        return `Title can contain only latin alphabet`;
    }

}

export const validateStreet = (street: string) => {
    if (street.length === 0) {
        return 'Required to fill in';
    }
    if(!street.match(/^[a-zA-Z0-9\s ,.]+$/)) {
        return `Street field can contain only latin alphabet`;
    }
}

export const validateTime = (time: string) => {
    if (time.length === 0) {
        return 'Required to fill in';
    }
    if (!time.match(/^\d\d:\d\d:\d\d+$/g)) {
        return 'Enter the correct value';
    }
    if (+time.substring(0, 2) > 24) {
        return 'Enter the correct value of hours';
    }
    if (+time.substring(3, 5) > 60) {
        return 'Enter the correct value of minutes';
    }
    if (+time.substring(6, 8) > 60) {
        return 'Enter the correct value of seconds';
    }
}

export const validateDate = (date: string) => {
    const currentYear = new Date().getFullYear();
    if (date.length === 0) {
        return 'Required to fill in';
    }
    if (!date.match(/^\d\d\d\d-\d\d-\d\d+$/g)) {
        return 'Enter the correct value';
    }
    if (+date.substring(0, 4) > currentYear + 1) {
        return 'Enter the correct value of years';
    }
    if (+date.substring(5, 7) > 12) {
        return 'Enter the correct value of months';
    }
    if (+date.substring(8, 10) > 31) {
        return 'Enter the correct value of days';
    }

}

export const validatePrice = (price: string) => {
    if (price.length === 0) {
        return 'Required to fill in';
    }
    if (!price.match(/^\d\d.\d\d+$/g)) {
        return 'Enter the correct value';
    }
}

