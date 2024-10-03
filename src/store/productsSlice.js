import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch products from API or local storage
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products; // Assuming response is paginated under 'products'
});

// Update a product by ID
export const updateProduct = createAsyncThunk(
  'products/update',
  async (updatedProduct) => {
    const { id, ...data } = updatedProduct;
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log(action, "action slice")
        state.list = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default productsSlice.reducer;
