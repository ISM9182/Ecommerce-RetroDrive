import api from './api';
import { Product } from '../types'; 

const BASE_URL = '/products'; 

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>(BASE_URL);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createProduct = async (Product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.post<Product>(BASE_URL, Product);
  return response.data;
};

export const updateProduct = async (id: string, Product: Product): Promise<Product> => {
  const response = await api.put<Product>(`${BASE_URL}/${id}`, Product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};