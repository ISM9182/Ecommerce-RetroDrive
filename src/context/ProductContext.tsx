import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface Product {
  id: string; 
  name: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  category: string;
  supplier: string;
  
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const API_BASE_URL = 'http://localhost:5000';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos.');
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      console.error("Erro ao buscar produtos:", err);
      setError(err.message || "Falha ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar produto.');
      }
      const newProduct: Product = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]); 
    } catch (err: any) {
      console.error("Erro ao adicionar produto:", err);
      setError(err.message || "Falha ao adicionar produto.");
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (product: Product) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar produto.');
      }
      const updatedProduct: Product = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } catch (err: any) {
      console.error("Erro ao atualizar produto:", err);
      setError(err.message || "Falha ao atualizar produto.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir produto.');
      }
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id)); // Remove do estado local
    } catch (err: any) {
      console.error("Erro ao excluir produto:", err);
      setError(err.message || "Falha ao excluir produto.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = { products, addProduct, updateProduct, deleteProduct, loading, error };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};