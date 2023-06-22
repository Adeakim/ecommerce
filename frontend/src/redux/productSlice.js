import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: []
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductData: (state, action) => {
      console.log('payload', action.payload.data);
      state.productList = [...action.payload.data];
      console.log(state.productList)
    }
  }
});

export const { setProductData } = productSlice.actions;

export default productSlice.reducer;

