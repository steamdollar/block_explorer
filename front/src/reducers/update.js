import { createAction, handleActions } from "redux-actions";

const initialState = {
    metadata : {
        loading : false,
        error : null
    }
};

const UPDATE = {
    REQUEST:'UPDATE/REQUEST',
    SUCCESS:'UPDATE/SUCCESS',
    FAILURE:'UPDATE/FAILURE',
};

export const update_request = createAction(UPDATE.REQUEST);
export const update_success = createAction(UPDATE.SUCCESS);
export const update_failure = createAction(UPDATE.FAILURE);

const update = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE.REQUEST:
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error: null
                }
            };
        case UPDATE.SUCCESS:
            console.log('success')
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null,
                }
            };
        case UPDATE.FAILURE:
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error : true
                }
            };
        default:
            return state
    }
};

export default update;
