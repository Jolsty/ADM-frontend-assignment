import { createSelector } from '@reduxjs/toolkit'

export const selectApp = createSelector(
  (state) => state.app,
  (s) => s
)
