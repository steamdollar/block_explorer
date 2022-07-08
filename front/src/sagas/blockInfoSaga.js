import axios from 'axios'
import { takeLatest, call, put } from "redux-saga/effects";
import { block_failure, block_request, block_success } from '../reducers/blockInfo';
import { backend } from '../utils/ip';


async function blockAPI(action) {
    const result = await axios.get(`${backend}/blockinfo`, action)
    return result
}

function* blockInfo(action) {
    try {
        let message = ''
        
        const result = yield call(blockAPI, action)

        yield put ({
            type : block_success.toString(),
            payload : result.data
        })
    }

    catch (e) {
        console.log(e.message)
        yield put({
            type : block_failure.toString(),
            payload : e.message
        })
    }
}

export default function* blockInfoSaga() {
    yield takeLatest(block_request.toString(), blockInfo)
}