import {GridPreProcessEditCellProps} from "@mui/x-data-grid";

const REQUIRED_FIELD = 'Required to fill in';
const CORRECT_VALUE = 'Enter the correct value';

const validateName = (name: string) => {
    if (name.length === 0) {
        return REQUIRED_FIELD;
    }

    if(!name.match(/^[a-zA-Z ]+$/)) {
        return `Cinema name can contain only latin alphabet`;
    }
}

export const namePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateName(params.props.value!.toString());
    return { ...params.props, error: errorMessage };
};


const validateType = (type: string) => {
    if (type.length === 0) {
        return REQUIRED_FIELD;
    }
}

export const typePreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateType(params.props.value!.toString());
    return { ...params.props, error: errorMessage };
};

const validateCity = (city: string) => {
    if (city.length === 0) {
        return REQUIRED_FIELD;
    }
    if(!city.match(/^[a-zA-Z ]+$/)) {
        return `City name can contain only latin alphabet`;
    }
}

export const cityPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateCity(params.props.value!.toString());
    return { ...params.props, error: errorMessage };
};

const validateStreet = (street: string) => {
    if (street.length === 0) {
        return REQUIRED_FIELD;
    }
    if(!street.match(/^[a-zA-Z .,]+$/)) {
        return CORRECT_VALUE;
    }
}

export const streetPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateStreet(params.props.value!.toString());
    return { ...params.props, error: errorMessage };
};

const validateBuildingNumber = (buildingNumber: string) => {
    if (buildingNumber.length === 0) {
        return REQUIRED_FIELD;
    }
    if(!buildingNumber.match(/^[a-zA-Z0-9 /]+$/)) {
        return CORRECT_VALUE;
    }
}

export const buildingNumberPreProcessEditCellProps =  (params: GridPreProcessEditCellProps) => {
    const errorMessage = validateBuildingNumber(params.props.value!.toString());
    return { ...params.props, error: errorMessage };
};