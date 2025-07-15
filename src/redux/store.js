import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducer/userReducer';


export const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['userReducer/userBackendImage'], // ✅ Correct action type
        ignoredPaths: ['userReducer.backendImage'],       // ✅ Correct path
      },
    }),
});

