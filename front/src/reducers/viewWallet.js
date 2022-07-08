import { createAction, handleActions } from "redux-actions";

const initialState = {
    viewWallet : [],
    metadata : {
        loading : false,
        error : null
    }
};

const VIEWWALLET_LOAD = {
    REQUEST:'VIEWWALLET/REQUEST',
    SUCCESS:'VIEWWALLET/SUCCESS',
    FAILURE:'VIEWWALLET/FAILURE',
};

export const viewWallet_request = createAction(VIEWWALLET_LOAD.REQUEST);
export const viewWallet_success = createAction(VIEWWALLET_LOAD.SUCCESS);
export const viewWallet_failure = createAction(VIEWWALLET_LOAD.FAILURE);

const viewWallet = (state = initialState, action) => {
    switch (action.type) {
        case VIEWWALLET_LOAD.REQUEST:
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error: null
                }
            };
        case VIEWWALLET_LOAD.SUCCESS:
            return {
                ...state,
                viewWallet : [...initialState.viewWallet, ...action.payload.result.reverse()],
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null,
                }
            };
        case VIEWWALLET_LOAD.FAILURE:
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

export default viewWallet;
