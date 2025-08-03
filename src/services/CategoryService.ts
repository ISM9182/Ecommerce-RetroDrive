import api from './api';
import { Category } from '../types';

const BASE_URL = '/categories';

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>(BASE_URL);
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get<Category>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createCategory = async (Category: Omit<Category, 'id'>): Promise<Category> => {
  const response = await api.post<Category>(BASE_URL, Category);
  return response.data;
};

export const updateCategory = async (id: string, categoria: Category): Promise<Category> => {
  const response = await api.put<Category>(`${BASE_URL}/${id}`, categoria);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};