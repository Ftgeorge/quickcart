import { create } from 'zustand';

// Product type definition
export type Product = {
  id: string;
  name: string;
  photo: string; // URI to the product image
  price: number;
};

// Zustand store state and actions for product management
type ProductState = {
  products: Product[]; // List of products
  addProduct: (product: Omit<Product, 'id'>) => boolean; // Add a new product, returns false if limit reached
  removeProduct: (id: string) => void; // Remove a product by id
  isLimitReached: boolean; // True if 5 products are already added
};

// Zustand store for managing products
export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  // Computed property: true if product limit is reached
  get isLimitReached() {
    return get().products.length >= 5;
  },
  // Add a new product if limit not reached
  addProduct: (product) => {
    if (get().products.length >= 5) return false;
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Math.random().toString(36).slice(2, 10) },
      ],
    }));
    return true;
  },
  // Remove a product by id
  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
})); 