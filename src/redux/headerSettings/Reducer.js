
import { ACTIVE_BRAND, BRAND_LIST } from "../constants";

const INIT_STATE = {
    activeBrandId: '0',
    brandList: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTIVE_BRAND:
            return {
                ...state,
                activeBrandId: action.payload,
            };
        case BRAND_LIST:
            return {
                ...state,
                brandList: action.payload
            };

        default:
            return state;
    }
};