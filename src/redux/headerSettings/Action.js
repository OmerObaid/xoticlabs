import { ACTIVE_BRAND, BRAND_LIST } from "../constants"


export const setActiveBrandId = (payload) => {
    return {
        type: ACTIVE_BRAND,
        payload
    }
}

export const setBrandList = (payload) => {
    return {
        type: BRAND_LIST,
        payload
    }
}