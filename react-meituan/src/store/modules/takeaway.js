import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name: 'foods',
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: []
    },
    reducers: {
        setFoodList(state, action) {
            state.foodsList = action.payload
        },

        setActiveIndex(state, action) {
            state.activeIndex = action.payload
        },

        addToCartList(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                action.payload.count = 1
                state.cartList.push(action.payload)
            }
        },

        increaseCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },

        decreaseCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item.count === 0) {
                return
            }
            item.count--
        },

        clearCartList(state) {
            state.cartList = []
        }
    }
})

const {setFoodList, setActiveIndex, addToCartList, decreaseCount, increaseCount, clearCartList} = foodsStore.actions
const fetchFoodList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodList(res.data))
    }
}

export {fetchFoodList, setActiveIndex, addToCartList, increaseCount, decreaseCount, clearCartList}

const reducer = foodsStore.reducer

export default reducer