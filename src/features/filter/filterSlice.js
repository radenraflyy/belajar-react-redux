import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchCategories = createAsyncThunk(
  "filter/fetchCategories",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products/categories")
    const data = await response.json()
    return data
  }
)

const initialState = {
  categoryItems: [],
  paramsCategory: "",
  paramsAbjad: "",
  searchKeyword: "",
  paramsUrutkan: null,
  status: "idle",
  error: null,
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.paramsCategory = action.payload
    },
    setAbjad: (state, action) => {
      state.paramsAbjad = action.payload
    },
    setUrutkan: (state, action) => {
      if (action.payload === "harga termurah") {
        state.paramsUrutkan = (a, b) => a.price - b.price
      } else if (action.payload === "harga termahal") {
        state.paramsUrutkan = (a, b) => b.price - a.price
      }
    },
    setSearchKeyword: (state, action) => {
      console.log(action.payload)
      state.searchKeyword = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "Success Fetching"
        state.categoryItems = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "Failed Fetching"
        state.error = action.error.message
      })
  },
})

export const { setCategory, setAbjad, setUrutkan, setSearchKeyword } =
  filterSlice.actions

export default filterSlice.reducer

export const selectorCategory = (state) => state.filter.categoryItems
export const selectStatus = (state) => state.filter.status
export const selectorParamsCategory = (state) => state.filter.paramsCategory
export const selectorParamsAbjad = (state) => state.filter.paramsAbjad
export const selectorParamsUrutkan = (state) => state.filter.paramsUrutkan
export const selectorSearchKeyword = (state) => state.filter.searchKeyword
