import api from './api';
import { Supplier } from '../types';

const BASE_URL = '/Suppliers';

export const getSupplier = async (): Promise<Supplier[]> => {
  const response = await api.get<Supplier[]>(BASE_URL);
  return response.data;
};

export const getSupplierById = async (id: string): Promise<Supplier> => {
  const response = await api.get<Supplier>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createSupplier = async (Supplier: Omit<Supplier, 'id'>): Promise<Supplier> => {
  const response = await api.post<Supplier>(BASE_URL, Supplier);
  return response.data;
};

export const updateSupplier = async (id: string, Supplier: Supplier): Promise<Supplier> => {
  const response = await api.put<Supplier>(`${BASE_URL}/${id}`, Supplier);
  return response.data;
};

export const deleteSupplier = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};