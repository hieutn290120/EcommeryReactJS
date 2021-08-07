import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST, persistReducer, persistStore,
    PURGE,
    REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import listprd from '../actionredux/Product/index';
import listprdbyname from '../actionredux/Product/Search/searchbyname';
import authen from '../features/AuthenLogin/index';
import authorUser from '../features/Author';
import checkQtyCart from '../features/QuantityListCartById'


// Tao config
const persistConfig = {
    key: 'root', //-> persistlistcart (key ở local)

    storage, // -> import localstore

    //set lưu những item cần lưu bằng whitelist >< backlist
    whitelist: [ 'listprd','checkQtyCart', 'authen', 'author'],
    blacklist: ['_persist']
}

const reducer = combineReducers({
    authen: authen,
    listprd: listprd,
    author: authorUser,
    listprdbyname: listprdbyname,
    checkQtyCart : checkQtyCart,
})


const persistedReducer = persistReducer(persistConfig, reducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)
export default store