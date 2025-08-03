
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Category } from '../types'; 

// Define o tipo de dados do contexto da categoria
interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>; 
  loading: boolean;
  error: string | null;
}

const API_BASE_URL = 'http://localhost:5000';

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar categorias do json-server
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err: any) {
      console.error("Erro ao buscar categorias:", err);
      setError(err.message || "Falha ao carregar categorias.");
    } finally {
      setLoading(false);
    }
  };

  // Carrega as categorias quando o provedor é montado
  useEffect(() => {
    fetchCategories();
  }, []);

  // Função para adicionar uma nova categoria
  const addCategory = async (category: Omit<Category, 'id'>) => {
    setLoading(true); 
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newCategory: Category = await response.json();
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } catch (err: any) {
      console.error("Erro ao adicionar categoria:", err);
      setError(err.message || "Falha ao adicionar categoria.");
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar uma categoria existente
  const updateCategory = async (category: Category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedCategory: Category = await response.json();
      setCategories((prevCategories) =>
        prevCategories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
      );
    } catch (err: any) {
      console.error("Erro ao atualizar categoria:", err);
      setError(err.message || "Falha ao atualizar categoria.");
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir uma categoria
  const deleteCategory = async (id: string) => { 
    setLoading(true); 
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setCategories((prevCategories) => prevCategories.filter((c) => c.id !== id));
    } catch (err: any) {
      console.error("Erro ao excluir categoria:", err);
      setError(err.message || "Falha ao excluir categoria.");
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const value = { categories, addCategory, updateCategory, deleteCategory, loading, error };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};