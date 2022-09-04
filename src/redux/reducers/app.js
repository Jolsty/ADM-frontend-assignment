import { createSlice } from '@reduxjs/toolkit'
import { fetchPeople } from '../thunks/app'

const initialState = {
  next: null,
  data: [],
  filteredData: null,
  loading: false,
  searchValue: '',
  error: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    init: () => {},
    setFilteredData: (state, action) => {
      state.filteredData = action?.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action?.payload || ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPeople.fulfilled, (state, { payload }) => {
        state.next = payload?.next
        state.data = [...state.data, ...payload?.results]
        state.loading = false
        state.error = null
      })
      .addCase(fetchPeople.rejected, (state) => {
        state.error = 'Something went wrong, please try again.'
        state.loading = false
      })
  }
})

// Action creators are generated for each case reducer function
export const { init, setFilteredData, setSearchValue } = appSlice.actions

export default appSlice.reducer
