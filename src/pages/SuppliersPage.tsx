import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSuppliers } from '../context/SupplierContext';

const SuppliersPage: React.FC = () => {
  const { suppliers, loading, error, fetchSuppliers, deleteSupplier } = useSuppliers();

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este fornecedor?')) {
      await deleteSupplier(id);
    }
  };

  return (
    <div className="page-container suppliers-page-container"> 
      <div className="list-header">
        <h1 className="page-title">Fornecedores</h1> 
        <Link to="/suppliers/new" className="button button-primary">
          Adicionar Novo Fornecedor
        </Link>
      </div>

      {loading && <p className="loading-message">Carregando fornecedores...</p>}
      {error && <p className="error-message">Erro ao carregar fornecedores: {error}</p>}

      {!loading && !error && suppliers.length === 0 && (
        <p className="suppliers-list-placeholder">Nenhum fornecedor encontrado.</p> 
      )}

      {!loading && !error && suppliers.length > 0 && (
        <ul className="supplier-list"> 
          {suppliers.map(supplier => (
            <li key={supplier.id} className="supplier-item"> 
              <div className="supplier-details"> 
                <h2 className="supplier-name">{supplier.name}</h2> 
                <p className="supplier-info"><strong>Contato:</strong> {supplier.contact}</p> 
                <p className="supplier-info"><strong>Endereço:</strong> {supplier.address}</p> 
              </div>
              <div className="supplier-actions">
                <Link
                  to={`/suppliers/edit/${supplier.id}`}
                  className="button button-secondary"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(supplier.id)}
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

export default SuppliersPage;