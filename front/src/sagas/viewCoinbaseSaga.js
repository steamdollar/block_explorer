import axios from 'axios'
import { takeLatest, call, put } from "redux-saga/effects";
import { viewCoinbase_failure, viewCoinbase_request, viewCoinbase_success } from '../reducers/viewCoinbase';
import { backend } from '../utils/ip';


async function viewCoinbaseAPI(action) {
    const result = await axios.get(`${backend}/viewCoinbase/:${action.payload.idx}`, action)
    return result
}

function* viewCoinbase(action) {

    try {
        const result = yield call(viewCoinbaseAPI, action)
        console.log(result.data)

        yield put({
            type: viewCoinbase_success.toString(),
            payload : result.data
        })
    }

    catch (e) {
        console.log(e.message)
        yield put({
            type : viewCoinbase_failure.toString(),
            payload : e.message
        })
    }
}

export default function* viewCoinbaseSaga() {
    yield takeLatest(viewCoinbase_request.toString(), viewCoinbase)
}