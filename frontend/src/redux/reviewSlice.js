import { createSlice } from "@reduxjs/toolkit"

const reviewSlice=createSlice({
    name:"review",
    initialState:{
        allReview:null
    },//setUserData("ankush")<={payload}
    reducers:{
        setAllReview:(state,action)=>{
        state.allReview=action.payload
        }
    }
})

export const {setAllReview}=reviewSlice.actions
export default reviewSlice.reducer

