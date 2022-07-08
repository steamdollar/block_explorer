import axios from 'axios'
import { takeLatest, call, put } from "redux-saga/effects";
import { viewTx_failure, viewTx_request, viewTx_success } from '../reducers/viewTx';
import { backend } from '../utils/ip';


async function viewTxAPI(action) {
    const result = await axios.get(`${backend}/viewTx/:${action.payload.idx}`, action)
    return result
}

function* viewTx(action) {

    try {
        const result = yield call(viewTxAPI, action)
        console.log(result.data)

        yield put({
            type: viewTx_success.toString(),
            payload : result.data
        })
    }

    catch (e) {
        console.log(e.message)
        yield put({
            type : viewTx_failure.toString(),
            payload : e.message
        })
    }
}

export default function* viewTxSaga() {
    yield takeLatest(viewTx_request.toString(), viewTx)
}