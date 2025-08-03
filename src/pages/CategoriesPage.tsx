
import React from 'react';
import { Link } from 'react-router-dom';

import { useCategories } from '../context/CategoryContext';
import type { Category } from '../types'; 

const CategoriesPage: React.FC = () => {
  const { categories, deleteCategory, loading, error } = useCategories();

  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await deleteCategory(categoryId);
        alert('Categoria excluída com sucesso!');
      } catch (e) {
        alert('Houve um erro ao excluir a categoria.');
        console.error("Erro ao excluir a categoria:", e);
      }
    }
  };

  return (
    <div className="page-container products-page-container">
      <div className="list-header">
        <h1 className="page-title">Lista de Categorias</h1>
        <Link
          to="/categories/new"
          className="button button-primary"
        >
          Adicionar Nova Categoria
        </Link>
      </div>

      {loading && <p className="loading-message">Carregando categorias...</p>}
      {error && <p className="error-message">Erro: {error}</p>}

      {!loading && !error && categories.length === 0 && (
        <p className="categories-list-placeholder">Nenhuma categoria encontrada.</p>
      )}

      {!loading && !error && categories.length > 0 && (
        <ul className="product-list">
          {categories.map(category => (
            <li key={category.id} className="product-item">
              <div className="product-details">
                <h2 className="product-name">{category.name}</h2>
                <p className="category-description">{category.description}</p>
              </div>
              <div className="product-actions">
                <Link
                  to={`/categories/edit/${category.id}`}
                  className="button button-secondary"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="button button-danger"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesPage;