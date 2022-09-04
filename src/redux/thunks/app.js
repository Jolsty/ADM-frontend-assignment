import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPeople = createAsyncThunk('fetchPeople', async ({ url }) => {
  const { data } = await axios.get(url)

  return data
})
