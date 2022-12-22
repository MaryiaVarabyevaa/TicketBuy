const REQUIRED_FIELD = 'Required to fill in';
const CORRECT_VALUE = 'Enter the correct value';
const year = String(new Date().getFullYear());

export const numberValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^[0-9 ]+$/)) {
            return CORRECT_VALUE;
        }
        if(!value.match(/^\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d$/g) ) {
            return 'Enter value in the correct format **** **** **** ****'
        }
        return true;
    }
}

export const nameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^[a-zA-Z ]+$/)) {
            return CORRECT_VALUE;
        }
        return true;
    }
}

export const expiryValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^\d\d\/\d\d$/g)) {
            return CORRECT_VALUE;
        }
        if(+value.slice(0, 2) > 12) {
            return CORRECT_VALUE + ' of month';
        }
        if (+value.slice(3) < +year.slice(2)) {
            return CORRECT_VALUE + ' of year'
        }
        return true;
    }
}

export const cvcValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^\d\d\d$/g)) {
            return CORRECT_VALUE;
        }
        return true;
    }
}