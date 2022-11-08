import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fetchedContent: false,
  avocados: [],
  selectedAvocado: {},
  footer: {},
  locale: 'en-US',
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContentFetched: (state, action) => {
      state.fetchedContent = action.payload
    },
    setAvocados: (state, action) => {
      state.avocados = action.payload
    },
    setSelectedAvocado: (state, action) => {
      state.selectedAvocado = action.payload
    },
    setFooter: (state, action) => {
      state.footer = action.payload
    },
    setLocale: (state, action) => {
      state.locale = action.payload
    },
  },
})

export const { setContentFetched, setAvocados, setSelectedAvocado, setFooter, setLocale, getLocale } = contentSlice.actions

export const selectFetchedContent = (state) => state.content.fetchedContent
export const selectAvocados = (state) => state.content.avocados
export const selectLocale = (state) => state.content.locale
