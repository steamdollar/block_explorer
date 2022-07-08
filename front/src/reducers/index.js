import { combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//
import update from "./update.js";

import block from "./blockInfo.js";
import tx from "./txInfo.js";
import viewblock from "./viewBlock.js";
import viewTx from "./viewTx.js";
import viewWallet from "./viewWallet.js";
import viewCoinbase from "./viewCoinbase.js";

//

const persist = {
    key:'sila',
    storage, 
    // whitelist:['user', 'adminLogin']
};

//

const rootReducer = combineReducers({
    update,
    block,
    tx,
    viewblock,
    viewTx,
    viewWallet,
    viewCoinbase
})

export default persistReducer(persist, rootReducer);