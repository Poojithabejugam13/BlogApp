import {configureStore} from '@reduxjs/toolkit'
import userAuthorslice from './slices/userAuthorslice'
export let Store=configureStore(
    {
        reducer:{
            userAuthorLoginSlice:userAuthorslice
        }
    }
)