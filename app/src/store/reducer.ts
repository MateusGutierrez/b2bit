import { Types } from "./types";

const reducer = (state: any, {type, payload}: any) => {
    switch(type) {
        case Types.AUTH_CHANGE_FIELDS:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [payload.key]: payload.value
                }
            }
    }
}

export default reducer