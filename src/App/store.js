import {configureStore} from "@reduxjs/toolkit";
import doorsReducer from '../feature/Doors/DoorsSlice'
import orderReducer from '../feature/Orders/OrdersSlice'
import frameReducer from '../feature/Frames/FramesSlice'
import possibleValuesReducer from '../feature/PossibleValues/PossibleValuesSlice'
export const store = configureStore({

reducer:{
orders:orderReducer,
doors:doorsReducer,
frames:frameReducer,
possibleValues:possibleValuesReducer
}
}
);
 
