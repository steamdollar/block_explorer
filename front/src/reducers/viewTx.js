import { createAction, handleActions } from "redux-actions";

const initialState = {
    viewtx : [],
    metadata : {
        loading : false,
        error : null
    }
};

const VIEWTX_LOAD = {
    REQUEST:'VIEWTX/REQUEST',
    SUCCESS:'VIEWTX/SUCCESS',
    FAILURE:'VIEWTX/FAILURE',
};

export const viewTx_request = createAction(VIEWTX_LOAD.REQUEST);
export const viewTx_success = createAction(VIEWTX_LOAD.SUCCESS);
export const viewTx_failure = createAction(VIEWTX_LOAD.FAILURE);

const viewTx = (state = initialState, action) => {
    switch (action.type) {
        case VIEWTX_LOAD.REQUEST:
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error: null
                }
            };
        case VIEWTX_LOAD.SUCCESS:
            return {
                ...state,
                viewtx : [...initialState.viewtx, ...action.payload.result],
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null,
                }
            };
        case VIEWTX_LOAD.FAILURE:
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

export default viewTx;
