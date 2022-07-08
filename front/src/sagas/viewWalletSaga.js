import axios from 'axios'
import { takeLatest, call, put } from "redux-saga/effects";
import { viewWallet_failure, viewWallet_request, viewWallet_success } from '../reducers/viewWallet';
import { backend } from '../utils/ip';


async function viewWalletAPI(action) {
    const result = await axios.get(`${backend}/viewWallet/:${action.payload.idx}`, action)
    return result
}

function* viewWallet(action) {

    try {
        const result = yield call(viewWalletAPI, action)
        console.log(result.data)

        yield put({
            type: viewWallet_success.toString(),
            payload : result.data
        })
    }

    catch (e) {
        console.log(e.message)
        yield put({
            type : viewWallet_failure.toString(),
            payload : e.message
        })
    }
}

export default function* viewWalletSaga() {
    yield takeLatest(viewWallet_request.toString(), viewWallet)
}