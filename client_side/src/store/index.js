// befor redux toolkit 

// import {createStore} from 'redux';

// const counterState = { value: 0 ,showCounter: false} 

// const counterReducer = (state = counterState , action) =>{

//     if(action.type === "increase"){
//         return {...store , value:counterState.value + action.payload } ;
//     }else if(action.type === "decrease"){
//         return {...store , value:counterState.value - action.payload } ;
//     }
//     return state;}

// const counterStore = createStore(counterReducer);
// export default counterStore;


// after redux toolkit

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./UserSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
    }
});