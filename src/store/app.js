import { configureStore, createSlice } from '@reduxjs/toolkit';
import  DUMMY_BOOKS  from '../data/Book';

const initialState = {
    books: DUMMY_BOOKS,
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.unshift(action.payload);
        },
    },
});

export const { addBook } = booksSlice.actions;


export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});