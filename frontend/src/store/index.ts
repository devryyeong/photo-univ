import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer
})

// root라는 이름으로 local storage에 저장
const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);