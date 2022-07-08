import axios from 'axios'
import { takeLatest, call, put } from "redux-saga/effects";
import { update_failure, update_request, update_success } from '../reducers/update';
import { backend } from '../utils/ip';


async function updateAPI(action) {
    console.log('qweqwe')
    const result = await axios.post(`${backend}/addBlock`, action)
    return result
}

function* update(action) {

    try {
        const result = yield call(updateAPI, action)
        console.log(result)

        yield put({
            type: update_success.toString(),
            payload : result.data
        })
    }

    catch (e) {
        console.log(e.message)
        yield put({
            type : update_failure.toString(),
            payload : e.message
        })
    }
}

export default function* updateSaga() {
    yield takeLatest(update_request.toString(), update)
}