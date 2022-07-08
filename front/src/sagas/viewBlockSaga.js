import axios from 'axios'
import { takeLatest, call, put } from "redux-saga/effects";
import { viewBlock_failure, viewBlock_request, viewBlock_success } from '../reducers/viewBlock';
import { backend } from '../utils/ip';


async function viewblockAPI(action) {
    const result = await axios.get(`${backend}/viewBlock/:${action.payload.idx}`, action)
    return result
}

function* viewblock(action) {

    try {
        const result = yield call(viewblockAPI, action)
        console.log(result)
        if(result.data.result.length == 0) {
            throw new Error('존재하지 않는 블럭입니다')
        }
        yield put({
            type: viewBlock_success.toString(),
            payload : result.data
        })
    }

    catch (e) {
        console.log(e.message)
        yield put({
            type : viewBlock_failure.toString(),
            payload : e.message
        })
    }
}

export default function* viewBlockSaga() {
    yield takeLatest(viewBlock_request.toString(), viewblock)
}