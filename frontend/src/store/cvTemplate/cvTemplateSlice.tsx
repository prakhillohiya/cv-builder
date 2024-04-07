import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICVTemplate } from "../../CVTemplate/CVTemplate";
import { ICV } from "../../shared/components/CV";

  
const initialState: ICV[] = []
  

export const cvTemplateSlice = createSlice({
  name: "cvTemplate",
  initialState: initialState,
  reducers: {
    updateCVTemplateState:(state,action:PayloadAction<ICV[]>)=>{
        return action.payload
    }
  },
 
});

export const { updateCVTemplateState } = cvTemplateSlice.actions;

export default cvTemplateSlice;
