import { createAction, handleActions } from "redux-actions";

const initialState = {
    block : [],
    metadata : {
        loading : false,
        error : null
    }
};

const BLOCK_LOAD = {
    REQUEST:'BLOCK/REQUEST',
    SUCCESS:'BLOCK/SUCCESS',
    FAILURE:'BLOCK/FAILURE',
};

export const block_request = createAction(BLOCK_LOAD.REQUEST);
export const block_success = createAction(BLOCK_LOAD.SUCCESS);
export const block_failure = createAction(BLOCK_LOAD.FAILURE);

const block = (state = initialState, action) => {
    switch (action.type) {
        case BLOCK_LOAD.REQUEST:
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error: null
                }
            };
        case BLOCK_LOAD.SUCCESS:
            // console.log(action.payload.result_block)
            return {
                ...state,
                block : [...initialState.block, ...action.payload.result_block],
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null,
                }
            };
        case BLOCK_LOAD.FAILURE:
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

export default block;
