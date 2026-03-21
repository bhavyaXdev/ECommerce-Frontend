# UrbanCart - E-Commerce Frontend

A modern, responsive, and visually stunning e-commerce frontend built using React, Vite, and Tailwind CSS. The project features a global Redux architecture that directly integrates with the live [FakeStoreAPI](https://fakestoreapi.com/) to dynamically fetch and organize products, simulate a shopping cart, provide wishlists, and populate detailed user profiles!

## 🚀 Tech Stack
- **Framework**: React 19 (via Vite)
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit (Utilizing `createAsyncThunk` for live REST API queries)
- **API Backend (Mocking)**: [FakeStoreAPI](https://fakestoreapi.com/)
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## 🏗️ Live Implementation Details

### 1. Project Organization
The application is engineered into dedicated feature directories for simple and rapid feature extension.
- `src/Components/`: Global UI blocks, including the sticky `Header.jsx`, robust `Footer.jsx`, and dynamic homepage elements (`SuggestionSection.jsx`, `EthnicWearSection.jsx`).
- `src/Pages/`: All high-level route wrappers. Spans `Home.jsx`, `Category.jsx`, `ProductDetail.jsx`, `Cart.jsx`, `Login.jsx`, `Wishlist.jsx`, and `Profile.jsx`.
- `src/Routes/`: Encapsulates all nested layouts utilizing the latest React Router `createBrowserRouter` implementation natively in `RoutingArea.jsx`.
- `src/Utility/`: Central Redux store dispatchers, including the vital `ProductSlice.js` that houses the `fetchProducts` asynchronous hooks.

### 2. State Management & Live FakeStoreAPI
Instead of hosting hardcoded state within Redux, this application mimics a production web deployment:
- When the DOM mounts at `App.jsx`, a master `useEffect` fires `dispatch(fetchProducts())`.
- Using `createAsyncThunk`, Redux immediately sends a GET request to `https://fakestoreapi.com/products`.
- While fetching via the internal network, UI pages (like `Category.jsx` or `ProductDetail.jsx`) listen to the `status === 'loading'` signal and mount gorgeous animated spinners.
- Once the Promise completes, a native mapper sanitizes the data (converting raw numbers into INR integers with `.toLocaleString()`, applying arbitrary discount strings, mapping generic FakeStore tags such as `'jewelery'` cleanly to `"Women's Fashion"`, and injecting everything precisely into the Redux state tree). 

### 3. Dynamic Sidebar Filtering & Routing Engines
The primary product view (`Category.jsx`) behaves identically to modern commercial stores:
- **Smart URL Matching**: Hitting explicit routes like `/category/mens-fashion` implicitly captures the keyword, scans the global Redux array, applies the active categorization filter silently, and returns the expected result.
- **Empty State Fallbacks**: If you navigate to an unavailable category or cross-filter variables (Price, Brand, Type) that trigger 0 matches, the map aborts gracefully into an active "No products found" error state rather than crashing. 
- **Framer Motion Integration**: The Grid layout uses `<AnimatePresence>` and `<motion.div layout>` to intuitively shrink, append, or animate cards directly as they are stripped away or added into your search logic queries.

---

## 🔗 Future Backend Upgrade Guide

Although the frontend successfully polls FakeStoreAPI concurrently, stepping up to a persistent backend stack (Node + MongoDB + Express) is straightforward!

### 1. Creating the MongoDB Models
To override my active parsing logic natively on your future server, draft the following Mongoose models:
* **User**: `name`, `email`, `password` (hashed), `wishlist[]`. (For Auth and Profile usage)
* **Product**: `name`, `price`, `originalPrice`, `category`, `image[]`, `rating`.
* **Order**: `userId`, `items[]`, `totalAmount`, `status`, `shippingAddress`.

### 2. Swapping the Redux Async Endpoints
Currently `ProductSlice.js` uses:
```javascript
const response = await fetch("https://fakestoreapi.com/products");
```
When your Node endpoint is completed, change your base URL endpoint:
```javascript
// Example Local Migration
const response = await fetch("http://localhost:5000/api/products");
```
And create a generic HTTP helper layer (e.g., Axios Interceptors) to consistently apply `Authorization: Bearer <cookie-token>` for Cart and Wishlist POST requests. 
