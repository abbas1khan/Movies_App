import { createSlice } from "@reduxjs/toolkit";

const PizzaDataSlice = createSlice({
    name: 'pizzaData',
    initialState: null,
    reducers: {
        addDataToStore(state, action) {
            state.push(action.payload)
            // state.splice(0, 0, action.payload);
        },
        deletePhoneNum(state, action) {
            return (state = state.filter(item => item.id !== action.payload.id))
        },
        deleteAllData(state, action) {
            return state = []
        },
        likePress(state, action) {
            let myIndex = -1;
            state[0].map((item, index) => {
                if (item.id == action.payload.id) {
                    myIndex = index;
                }
            });
            if (myIndex != -1) {
                state[0][myIndex].iLiked = !state[0][myIndex].iLiked;
            }
        },
    }
})

export const { addDataToStore, deletePhoneNum, deleteAllData, likePress } = PizzaDataSlice.actions;
export default PizzaDataSlice.reducer;