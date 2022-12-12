import {GridPreProcessEditCellProps} from "@mui/x-data-grid";

const REQUIRED_FIELD = 'Required to fill in';
const CORRECT_VALUE = 'Enter the correct value';

const validateText = (title: string) => {
    if (title.length === 0) {
        return REQUIRED_FIELD;
    }

    if(!title.match(/^[a-zA-Z0-9\s:,.()!?-]+$/)) {
        return `Title can contain only latin alphabet`;
    }
}

export const textPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateText(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

const validateUrl = (url: string) => {
    const regExp = /^(ftp|http|https):\/\/[^ "]+$/;
    if (url.length === 0) {
        return REQUIRED_FIELD;
    }
    if (!url.match(regExp)) {
        return CORRECT_VALUE;
    }
}

export const urlPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateUrl(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

const validateGenre = (url: string) => {
    if (url.length === 0) {
        return REQUIRED_FIELD;
    }
}

export const genrePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateGenre(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

const validateCountry = (country: string) => {
    if (country.length === 0) {
        return REQUIRED_FIELD;
    }
}

export const countryPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateCountry(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

const validateRuntime = (runtime: string) => {
    if (runtime.length === 0) {
        return REQUIRED_FIELD;
    }
    if(!runtime.match(/^[a-zA-Z0-9\s]+$/)) {
        return CORRECT_VALUE;
    }
}

export const runtimePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateRuntime(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

const validateIMDbRating = (rating: string) => {
    if (rating.length === 0) {
        return REQUIRED_FIELD;
    }
}

export const imdbRatingPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateIMDbRating(params.props.value!.toString());
    return { ...params.props, error: errorMessage }
};

