import {GridPreProcessEditCellProps} from "@mui/x-data-grid";
import {IUserDate} from "../../../../types/user";

const REQUIRED_FIELD = 'Required to fill in';
const CORRECT_VALUE = 'Enter the correct value';

export const validateName = (name: string) => {
    if (name.length === 0) {
        return REQUIRED_FIELD;
    }
    if(!name.match(/^[a-zA-Z ]+$/)) {
        return `Name can contain only latin alphabet`;
    }
}

export const namePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateName(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

export const validateEmail = (rows: IUserDate[], email: string, id: number)=> {
    const editedUser = rows.find((user) => user.id === id) as IUserDate;
    const existingUsers = rows!.map((row) => row.email.toLowerCase());
    const exists = existingUsers.includes(email.toLowerCase());
    if (exists && email !== editedUser.email) {
        return `This email is already taken.`
    }
    if (email.length === 0) {
        return REQUIRED_FIELD;
    }
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const res = re.test(String(email));
    if (!res) {
        return CORRECT_VALUE;
    }
}
