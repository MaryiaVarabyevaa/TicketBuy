import {GridPreProcessEditCellProps} from "@mui/x-data-grid";

const REQUIRED_FIELD = 'Required to fill in';
const CORRECT_VALUE = 'Enter the correct value';

const validateHallNumber = (hallNumber: string) => {
    if (hallNumber.length === 0) {
        return REQUIRED_FIELD;
    }
    if (!hallNumber.match(/^[0-9]+$/)) {
        return 'Number of halls can contain only numbers'
    }
}

export const hallNumberPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateHallNumber(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

const validatePrice = (price: string) => {
    if (price.length === 0) {
        return REQUIRED_FIELD;
    }
    if (!price.match(/^\d\d.\d\d+$/g)) {
        return CORRECT_VALUE;
    }
    return true;
}

export const pricePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validatePrice(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

const validateDate = (date: string) => {
    const currentYear = new Date().getFullYear();
    if (date.length === 0) {
        return REQUIRED_FIELD;
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

export const datePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateDate(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

const validateTime = (time: string) => {
    if (time.length === 0) {
        return REQUIRED_FIELD;
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


export const timePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateTime(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

export const validationFields = {
    required: REQUIRED_FIELD
}

export const validationPrice = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        // const str = String(value);
        //
        // if(!str.match(/^[a-zA-Z0-9 ]+$/)) {
        //     return CORRECT_VALUE;
        // }

        return validatePrice(value);

        // return true;
    }
}