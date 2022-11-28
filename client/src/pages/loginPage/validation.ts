const REQUIRED_FIELD = 'Required to fill in';

export const firstNameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^[a-zA-Z]+$/)) {
            return 'First name can contain latin alphabet';
        }

        return true;
    }
}

export const lastNameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^[a-zA-Z]+$/)) {
            return 'Last name can contain latin alphabet';
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
        if(!value.match(/^[a-zA-Z0-9]+$/)) {
            return 'Password can contain latin alphabet and numbers';
        }
       if(value.length < 6) {
           return 'Password must contain at least 6 characters';
       }
        return true;
    }
}
