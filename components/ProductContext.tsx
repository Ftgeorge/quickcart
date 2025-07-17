import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Product = {
  id: string;
  name: string;
  photo: string; // URI
  price: number;
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => boolean;
  removeProduct: (id: string) => void;
  isLimitReached: boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProductContext must be used within ProductProvider');
  return ctx;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const isLimitReached = products.length >= 5;

  const addProduct = (product: Omit<Product, 'id'>) => {
    if (products.length >= 5) return false;
    setProducts(prev => [
      ...prev,
      { ...product, id: Math.random().toString(36).slice(2, 10) },
    ]);
    return true;
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, isLimitReached }}>
      {children}
    </ProductContext.Provider>
  );
}; 