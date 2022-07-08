import { createAction, handleActions } from "redux-actions";

const initialState = {
    viewCoinbase : [],
    metadata : {
        loading : false,
        error : null
    }
};

const VIEW_COINBASE = {
    REQUEST:'VIEWCOINBASE/REQUEST',
    SUCCESS:'VIEWCOINBASE/SUCCESS',
    FAILURE:'VIEWCOINBASE/FAILURE',
};

export const viewCoinbase_request = createAction(VIEW_COINBASE.REQUEST);
export const viewCoinbase_success = createAction(VIEW_COINBASE.SUCCESS);
export const viewCoinbase_failure = createAction(VIEW_COINBASE.FAILURE);

const viewCoinbase = (state = initialState, action) => {
    switch (action.type) {
        case VIEW_COINBASE.REQUEST:
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error: null
                }
            };
        case VIEW_COINBASE.SUCCESS:
            return {
                ...state,
                viewCoinbase : [...initialState.viewCoinbase, ...action.payload.result],
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null,
                }
            };
        case VIEW_COINBASE.FAILURE:
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

export default viewCoinbase;
