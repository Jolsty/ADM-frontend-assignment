import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPlanet = createAsyncThunk('fetchPlanet', async ({ url }) => {
  const { data } = await axios.get(url)

  return data
})
