import { createSlice } from '@reduxjs/toolkit'
import isEmpty from 'lodash.isempty'
import { fetchPlanet } from '../thunks/popup'

const initialState = {
  props: {},
  show: false,
  planet: {
    loading: false,
    error: null,
    data: null
  }
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup(state, { payload }) {
      state.show = true
      state.props = isEmpty(payload?.props) ? {} : payload.props
      state.planet = initialState.planet
    },
    hidePopup(state) {
      return { ...initialState }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanet.pending, (state) => {
        state.planet.loading = true
        state.planet.error = null
      })
      .addCase(fetchPlanet.fulfilled, (state, { payload }) => {
        state.planet.loading = false
        state.planet.error = null
        state.planet.data = payload
      })
      .addCase(fetchPlanet.rejected, (state) => {
        state.planet.error = 'Something went wrong, please try again.'
        state.planet.loading = false
      })
  }
})

// Action creators are generated for each case reducer function
export const { showPopup, hidePopup } = popupSlice.actions

export default popupSlice.reducer
