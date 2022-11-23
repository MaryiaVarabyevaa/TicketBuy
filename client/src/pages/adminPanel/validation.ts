const REQUIRED_FIELD = 'Required to fill in';

export const cinemaNameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/\d/)) {
            return 'Cinema name can contain only letters';
        }

        return true;
    }
}

export const hallsNumberValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^\d+$/)) {
            return 'Number of halls can contain only numbers';
        }

        return true;
    }
}
