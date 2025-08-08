import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  results: any[];
  isLoading: boolean;
  isSearchOpen: boolean;
}

const initialState: SearchState = {
  query: '',
  results: [],
  isLoading: false,
  isSearchOpen: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<any[]>) => {
      state.results = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
    },
  },
});

export const { setQuery, setResults, setIsLoading, setIsSearchOpen, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
