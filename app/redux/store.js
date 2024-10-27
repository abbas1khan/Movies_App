import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PizzaDataSlice from "./PizzaDataSlice";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

let rootReducer = combineReducers({
    pizzaData: PizzaDataSlice
})

let persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})