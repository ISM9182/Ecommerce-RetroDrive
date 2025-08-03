
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react'; // Importe useCallback
import { Supplier } from '../types';

interface SupplierContextType {
  suppliers: Supplier[];
  fetchSuppliers: () => Promise<void>;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Promise<void>;
  updateSupplier: (supplier: Supplier) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const API_BASE_URL = 'http://localhost:5000';

const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

interface SupplierProviderProps {
  children: ReactNode;
}

export const SupplierProvider: React.FC<SupplierProviderProps> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => { 
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Supplier[] = await response.json();
      setSuppliers(data);
    } catch (err: any) {
      console.error("Erro ao buscar fornecedores:", err);
      setError(err.message || "Falha ao carregar fornecedores.");
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]); 

  const addSupplier = useCallback(async (supplier: Omit<Supplier, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json(); 
      await fetchSuppliers(); 
    } catch (err: any) {
      console.error("Erro ao adicionar fornecedor:", err);
      setError(err.message || "Falha ao adicionar fornecedor.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchSuppliers]); 

  const updateSupplier = useCallback(async (supplier: Supplier) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers/${supplier.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json(); 
      await fetchSuppliers(); 
    } catch (err: any) {
      console.error("Erro ao atualizar fornecedor:", err);
      setError(err.message || "Falha ao atualizar fornecedor.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchSuppliers]); 

  const deleteSupplier = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchSuppliers(); 
    } catch (err: any) {
      console.error("Erro ao excluir fornecedor:", err);
      setError(err.message || "Falha ao excluir fornecedor.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchSuppliers]);

  const value = { suppliers, fetchSuppliers, addSupplier, updateSupplier, deleteSupplier, loading, error };

  return (
    <SupplierContext.Provider value={value}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSuppliers = () => {
  const context = useContext(SupplierContext);
  if (context === undefined) {
    throw new Error('useSuppliers must be used within a SupplierProvider');
  }
  return context;
};