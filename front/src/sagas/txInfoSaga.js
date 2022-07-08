import axios from 'axios'
import { takeLatest, call, put } from "redux-saga/effects";
import { tx_failure, tx_request, tx_success } from '../reducers/txInfo';
import { backend } from '../utils/ip';

async function txAPI(action) {
    const result = await axios.get(`${backend}/txinfo`, action)
    return result
}

function* txInfo(action) {
    try {
        let message = ''

        const result = yield call(txAPI, action)

        yield put ({
            type : tx_success.toString(),
            payload : result.data
        })
    }

    catch (e) {
        console.log(e.message)
        yield put({
            type : tx_failure.toString(),
            payload : e.message
        })
    }
}

export default function* txInfoSaga() {
    yield takeLatest(tx_request.toString(), txInfo)
}