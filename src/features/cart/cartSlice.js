import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload

      const selectedCartIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      )

      if (selectedCartIndex !== -1) {
        state.cartItems[selectedCartIndex].quantity += 1
        state.cartItems[selectedCartIndex].totalPrice =
          state.cartItems[selectedCartIndex].quantity * newItem.price
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        })
      }
    },
    setQuantity: (state, action) => {
      const { item, name } = action.payload
      const selectedItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      )

      if (selectedItemIndex !== -1) {
        if (name === "add") {
          state.cartItems[selectedItemIndex].quantity += 1
          state.cartItems[selectedItemIndex].totalPrice =
            state.cartItems[selectedItemIndex].quantity * item.price
        } else if (
          name === "minus" &&
          state.cartItems[selectedItemIndex].quantity > 1
        ) {
          state.cartItems[selectedItemIndex].quantity -= 1
          state.cartItems[selectedItemIndex].totalPrice -= item.price

          state.cartItems[selectedItemIndex].totalPrice = parseFloat(
            state.cartItems[selectedItemIndex].totalPrice.toFixed(2)
          )
        }
      }
    },
  },
})

export const { addItemToCart, setQuantity } = cartSlice.actions

export default cartSlice.reducer

// Selector
export const selectorCart = (state) => state.cart.cartItems
export const selectorTotalCart = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
export const selectorTotalPrice = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0)
