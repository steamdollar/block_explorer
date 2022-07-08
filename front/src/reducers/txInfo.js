import { createAction, handleActions } from "redux-actions";

const initialState = {
    tx : [],
    metadata : {
        loading : false,
        error : null
    }
};

const tx_LOAD = {
    REQUEST:'tx/REQUEST',
    SUCCESS:'tx/SUCCESS',
    FAILURE:'tx/FAILURE',
};

export const tx_request = createAction(tx_LOAD.REQUEST);
export const tx_success = createAction(tx_LOAD.SUCCESS);
export const tx_failure = createAction(tx_LOAD.FAILURE);

const tx = (state = initialState, action) => {
    switch (action.type) {
        case tx_LOAD.REQUEST:
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error: null
                }
            };
        case tx_LOAD.SUCCESS:
            return {
                ...state,
                tx : [...initialState.tx, ...action.payload.result_tx],
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null,
                }
            };
        case tx_LOAD.FAILURE:
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

export default tx;
