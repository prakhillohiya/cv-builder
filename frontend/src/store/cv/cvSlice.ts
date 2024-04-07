import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICV } from "../../shared/components/CV";

  
const initialState: ICV[] = []
  

export const cvSlice = createSlice({
  name: "cv",
  initialState: initialState,
  reducers: {
    updateCVState:(state,action:PayloadAction<ICV[]>)=>{
        return action.payload
    }
  },
 
});

export const { updateCVState } = cvSlice.actions;

export default cvSlice;
