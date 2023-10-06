import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PersonSlice } from "./features/personsSlice";


export const store = configureStore({
    reducer:{
        persons:PersonSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type AppDispatch = typeof store.dispatch

export const useAppDispatch:()=> typeof store.dispatch=useDispatch; 

export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
