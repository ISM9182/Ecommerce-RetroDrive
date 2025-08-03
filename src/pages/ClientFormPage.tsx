
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClients } from '../context/ClientContext'; 
import type { Client } from '../types'; 


interface ClientFormData {
  id?: string; 
  name: string;
  cpf: string;
  address: string;
  phone: string;
  email: string;
}

const ClientFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); 

  const { clients, addClient, updateClient, loading: contextLoading } = useClients();

  const isEditing = !!id;

  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    cpf: '',
    address: '',
    phone: '',
    email: '',
  });

 
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && clients.length > 0) {
      const clientToEdit = clients.find(c => c.id === id);
      if (clientToEdit) {
        setFormData({
          id: clientToEdit.id,
          name: clientToEdit.name,
          cpf: clientToEdit.cpf || '', 
          address: clientToEdit.address || '',
          phone: clientToEdit.phone || '',
          email: clientToEdit.email || '',
        });
      } else {
        alert('Cliente não encontrado.');
        navigate('/clients');
      }
    } else if (!isEditing) {
      setFormData({
        name: '',
        cpf: '',
        address: '',
        phone: '',
        email: '',
      });
    }
  }, [id, isEditing, clients, navigate]); 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (submitting || contextLoading) return;

    setSubmitting(true); 

    const clientData: Omit<Client, 'id'> = {
      name: formData.name,
      cpf: formData.cpf,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      if (isEditing && formData.id) {
        await updateClient({ ...clientData, id: formData.id });
        alert('Cliente atualizado com sucesso!');
      } else {
        await addClient(clientData);
        alert('Cliente salvo com sucesso!');
      }
      navigate('/clients');
    } catch (e) {
      alert(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} o cliente. Verifique o console para mais detalhes.`);
      console.error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} cliente:`, e);
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div className="page-container client-form-container"> 
      <h1 className="form-page-title">
        {isEditing ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
      </h1>
      <form onSubmit={handleSubmit} className="app-form"> 
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nome do Cliente</label>
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
          <label htmlFor="cpf" className="form-label">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="form-input"
            required
            pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" 
            title="Digite um CPF válido (ex: 123.456.789-00)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Telefone</label>
          <input
            type="tel" 
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            required
            pattern="\(\d{2}\)\s?\d{4,5}-?\d{4}" 
            title="Digite um telefone válido (ex: (DD) 91234-5678 ou (DD) 1234-5678)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">Endereço</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input form-textarea"
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="button button-primary" disabled={submitting || contextLoading}>
            {submitting ? 'Salvando...' : (isEditing ? 'Atualizar Cliente' : 'Salvar Cliente')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/clients')}
            className="button button-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientFormPage;