
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCategories } from '../context/CategoryContext';
import { Category } from '../types'; 

interface CategoryFormData {
  id?: string;
  name: string;
  description: string;
}

const CategoryFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories, addCategory, updateCategory, loading: contextLoading } = useCategories();

  const isEditing = !!id;

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && categories.length > 0) {
      const categoryToEdit = categories.find(c => c.id === id);
      if (categoryToEdit) {
        setFormData({
          id: categoryToEdit.id,
          name: categoryToEdit.name,
          description: categoryToEdit.description || '',
        });
      } else {
        alert('Categoria não encontrada.');
        navigate('/categories');
      }
    } else if (!isEditing) {
      setFormData({
        name: '',
        description: '',
      });
    }
  }, [id, isEditing, categories, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || contextLoading) return;

    setSubmitting(true);

    const categoryData: Omit<Category, 'id'> = {
      name: formData.name,
      description: formData.description,
    };

    try {
      if (isEditing && formData.id) {
        await updateCategory({ ...categoryData, id: formData.id });
        alert('Categoria atualizada com sucesso!');
      } else {
        await addCategory(categoryData);
        alert('Categoria salva com sucesso!');
      }
      navigate('/categories');
    } catch (e) {
      alert(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} a categoria. Verifique o console para mais detalhes.`);
      console.error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} categoria:`, e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container product-form-container">
      <h1 className="form-page-title">
        {isEditing ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
      </h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nome da Categoria</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input form-textarea"
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="button button-primary" disabled={submitting || contextLoading}>
            {submitting ? 'Salvando...' : (isEditing ? 'Atualizar Categoria' : 'Salvar Categoria')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/categories')}
            className="button button-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryFormPage;