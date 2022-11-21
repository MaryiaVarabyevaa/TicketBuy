const REQUIRED_FIELD = 'Required to fill in';

export const firstNameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/[а-яА-Я]/)) {
            return 'First name cannot contain Cyrillic letters';
        }
        if(value.match(/\d/)) {
            return 'First name cannot contain numbers';
        }

        return true;
    }
}

export const lastNameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/[а-яА-Я]/)) {
            return 'Last name cannot contain Cyrillic letters';
        }
        if(value.match(/\d/)) {
            return 'Last name cannot contain numbers';
        }

        return true;
    }
}

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const bol = re.test(String(value));
        if(!bol) {
            return 'Enter the correct value';
        }

        return true;
    }
}

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
       if(value.length < 6) {
           return 'Password must contain at least 6 characters';
       }

        return true;
    }
}
