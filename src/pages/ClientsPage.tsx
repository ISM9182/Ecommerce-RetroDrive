
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useClients } from '../context/ClientContext';

const ClientsPage: React.FC = () => {
  const { clients, loading, error, fetchClients, deleteClient } = useClients();

  useEffect(() => {
    fetchClients();
  }, [fetchClients]); 

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este cliente?')) {
      await deleteClient(id);
    }
  };

  return (
    <div className="page-container clients-page-container"> 
      <div className="list-header">
        <h1 className="page-title">Clientes</h1>
        <Link to="/clients/new" className="button button-primary">
          Adicionar Novo Cliente
        </Link>
      </div>

      {loading && <p className="loading-message">Carregando clientes...</p>}
      {error && <p className="error-message">Erro ao carregar clientes: {error}</p>}

      {!loading && !error && clients.length === 0 && (
        <p className="clients-list-placeholder">Nenhum cliente encontrado.</p> 
      )}

      {!loading && !error && clients.length > 0 && (
        <ul className="client-list"> 
          {clients.map(client => (
            <li key={client.id} className="client-item">
              <div className="client-details"> 
                <h2 className="client-name">{client.name}</h2>
                <p className="client-info"><strong>CPF:</strong> {client.cpf}</p>
                <p className="client-info"><strong>Telefone:</strong> {client.phone}</p>
                <p className="client-info"><strong>Email:</strong> {client.email}</p>
                <p className="client-info"><strong>Endereço:</strong> {client.address}</p>
                
              </div>
              <div className="client-actions"> 
                <Link
                  to={`/clients/edit/${client.id}`}
                  className="button button-secondary"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(client.id)}
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

export default ClientsPage;