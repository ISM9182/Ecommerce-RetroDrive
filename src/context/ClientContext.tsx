
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { Client } from '../types'; 
import { clientService } from '../services/ClientService'; 

interface ClientContextType {
  clients: Client[];
  fetchClients: () => Promise<void>;
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  updateClient: (client: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientService.getAll();
      setClients(data);
    } catch (err: any) {
      console.error("Erro ao buscar clientes:", err);
      setError(err.message || "Falha ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const addClient = useCallback(async (client: Omit<Client, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      await clientService.create(client);
      await fetchClients(); 
    } catch (err: any) {
      console.error("Erro ao adicionar cliente:", err);
      setError(err.message || "Falha ao adicionar cliente.");
      throw err; 
    } finally {
      setLoading(false);
    }
  }, [fetchClients]); 

  const updateClient = useCallback(async (client: Client) => {
    setLoading(true);
    setError(null);
    try {
      await clientService.update(client.id, client);
      await fetchClients(); 
    } catch (err: any) {
      console.error("Erro ao atualizar cliente:", err);
      setError(err.message || "Falha ao atualizar cliente.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchClients]);

  const deleteClient = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await clientService.delete(id);
      await fetchClients(); 
    } catch (err: any) {
      console.error("Erro ao excluir cliente:", err);
      setError(err.message || "Falha ao excluir cliente.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchClients]); 

  const value = { clients, fetchClients, addClient, updateClient, deleteClient, loading, error };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};