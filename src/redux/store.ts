import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import cartReducer from "./cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  // dodaj inne slice, np. auth, ale nie zapisuj ich jeśli zawierają wrażliwe dane
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // tylko 'cart' ma być zapisywany
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // konieczne dla redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
