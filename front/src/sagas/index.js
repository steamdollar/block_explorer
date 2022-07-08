import { all } from 'redux-saga/effects';
//
import blockInfoSaga from './blockInfoSaga.js';
import txInfoSaga from './txInfoSaga.js';
import viewBlockSaga from './viewBlockSaga.js';
import viewTxSaga from './viewTxSaga.js';
import viewWalletSaga from './viewWalletSaga.js';
import viewCoinbaseSaga from './viewCoinbaseSaga.js';
import updateSaga from './updateSaga.js';

export default function* rootSaga() {

    yield all([
        blockInfoSaga(),
        txInfoSaga(),
        viewBlockSaga(),
        viewTxSaga(),
        viewWalletSaga(),
        viewCoinbaseSaga(),
        updateSaga()
    ]);
    
}