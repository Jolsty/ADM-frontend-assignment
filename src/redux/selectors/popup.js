import { createSelector } from '@reduxjs/toolkit'

export const selectPopup = createSelector(
  (state) => state.popup,
  (popup) => popup
)

export const selectPlanet = createSelector(selectPopup, (s) => s.planet)
