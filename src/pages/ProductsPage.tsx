import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductsPage: React.FC = () => {
  const { products, loading, error, deleteProduct } = useProducts();

  if (loading) {
    return (
      <div className="page-container products-page-container">
        <h1 className="products-page-title">Produtos</h1>
        <div className="products-list-container">
          <p className="loading-message">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container products-page-container">
        <h1 className="products-page-title">Produtos</h1>
        <div className="products-list-container">
          <p className="error-message">Erro ao carregar os produtos: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container products-page-container">
      <h1 className="products-page-title">Produtos</h1>
      <div className="products-list-container">
        {products.length === 0 ? (
          <p className="products-list-placeholder">Nenhum produto cadastrado.</p>
        ) : (
          <ul className="product-list">
            {products.map(product => (
              <li key={product.id} className="product-item">
                <div className="product-details">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-info"><strong>Preço:</strong> R${product.price.toFixed(2)}</p>
                  <p className="product-info"><strong>Quantidade:</strong> {product.quantity}</p>
                  <p className="product-info"><strong>Cor:</strong> {product.color}</p>
                  <p className="product-info"><strong>Categoria:</strong> {product.category}</p>
                  <p className="product-info"><strong>Fornecedor:</strong> {product.supplier}</p>
                </div>
                <div className="product-actions">
                
                  <Link to={`/products/edit/${product.id}`} className="button button-secondary">
                    Editar
                  </Link>
                  <button onClick={() => deleteProduct(product.id)} className="button button-danger">
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link to="/products/new" className="button button-primary add-product-button">
          Adicionar Novo Produto
        </Link>
      </div>
    </div>
  );
};

export default ProductsPage;