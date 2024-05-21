import { configureStore } from "@reduxjs/toolkit";
import authreducer from './features/AuthSlice'
 const store=configureStore({
    reducer: {
        auth: authreducer,
        // Add other reducers here if needed
      },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;