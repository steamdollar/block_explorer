import { createAction, handleActions } from "redux-actions";

const initialState = {
    viewblock : [],
    metadata : {
        loading : false,
        error : null
    }
};

const VIEWBLOCK_LOAD = {
    REQUEST:'VIEWBLOCK/REQUEST',
    SUCCESS:'VIEWBLOCK/SUCCESS',
    FAILURE:'VIEWBLOCK/FAILURE',
};

export const viewBlock_request = createAction(VIEWBLOCK_LOAD.REQUEST);
export const viewBlock_success = createAction(VIEWBLOCK_LOAD.SUCCESS);
export const viewBlock_failure = createAction(VIEWBLOCK_LOAD.FAILURE);

const viewblock = (state = initialState, action) => {
    switch (action.type) {
        case VIEWBLOCK_LOAD.REQUEST:
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error: null
                }
            };
        case VIEWBLOCK_LOAD.SUCCESS:
            return {
                ...state,
                viewblock : [...initialState.viewblock, ...action.payload.result],
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null,
                }
            };
        case VIEWBLOCK_LOAD.FAILURE:
            alert('존재하지 않는 블록입니다!')
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

export default viewblock;
