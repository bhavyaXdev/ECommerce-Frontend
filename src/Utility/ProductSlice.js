import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch from free FakeStoreAPI
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      // We map the Fakestore categories to match the exact strings used in your Header.jsx routes
      const categoryMap = {
        "electronics": "Electronics",
        "jewelery": "Women's Fashion",    // Treating jewelry as Women's for mapping
        "men's clothing": "Men's Fashion",
        "women's clothing": "Women's Fashion"
      };

      const transformedProducts = data.map(p => {
        let mappedCat = categoryMap[p.category] || p.category;
        
        // Generate Indian Rupee styled price visually
        const inrPrice = Math.round(p.price * 80);
        // Create an arbitrary original price to make the shop look realistic
        const originalPrice = Math.round(inrPrice * 1.25);
        const discount = "20% OFF";
        
        return {
          id: p.id,
          name: p.title,
          category: mappedCat,
          brand: "Premium Item", // Fakestore doesn't supply brands
          price: inrPrice,
          originalPrice: originalPrice,
          rating: p.rating?.rate || 4.5,
          reviews: p.rating?.count || 120,
          image: p.image, // Fakestore guarantees this image URL works flawlessly across CORS
          discount: discount,
          isNew: (p.rating?.rate || 0) > 4.2
        };
      });

      return transformedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: {
    allProducts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    removeProduct: (state, action) => {
      state.allProducts = state.allProducts.filter(p => p.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { removeProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
