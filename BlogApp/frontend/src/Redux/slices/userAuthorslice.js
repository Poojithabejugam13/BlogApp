import { createSlice,createAsyncThunk, isPending } from "@reduxjs/toolkit";
import axios from "axios";
export let userAuthorThunk=createAsyncThunk('user-author',async(userCredObj,thunkApi)=>{
    try {

    if(userCredObj.userType==='user'){
       let res= await axios.post('http://localhost:4000/user-api/login',userCredObj)
       if(res.data.message==="Login success"){
            localStorage.setItem("token",res.data.token)
       }else{
        return thunkApi.rejectWithValue(res.data.message)
       }
       console.log(res.data);
       return res.data
    }
    if(userCredObj.userType==='author'){
       let res= await axios.post('http://localhost:4000/author-api/login',userCredObj)
       if(res.data.message==="Login success"){
            localStorage.setItem("token",res.data.token)

       }else{
        return thunkApi.rejectWithValue(res.data.message)
       }
       return res.data
    }
    } catch (error) {
            return thunkApi.rejectWithValue(error)
    }

})

export let userAuthorslice=createSlice(
    {
        name:'user_author',
        initialState:{
            isPending:false,
            isLogin:false,
            currentUser:{},
            errOccurred:false,
            errMes:''

        },
        reducers:{
            resetSate:(state,action)=>{
            state.isPending=false
            state.isLogin=false
            state.currentUser={}
            state.errOccurred=false
            state.errMes=''
        }
    },
        extraReducers:builder=>{
            builder
            .addCase(userAuthorThunk.pending,(state,action)=>{
                state.isPending=true;
               
            })
            .addCase(userAuthorThunk.fulfilled,(state,action)=>{
                state.isPending=false
                state.isLogin=true
                state.currentUser=action.payload.user
                state.errOccurred=false
                state.errMes=''
            })
            .addCase(userAuthorThunk.rejected,(state,action)=>{
                state.isPending=false
                state.isLogin=false
                state.currentUser={}
                state.errOccurred=true
                state.errMes=action.payload
            })
        }
    }
)
export default userAuthorslice.reducer
export let {resetSate} =userAuthorslice.actions