import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useSuppliers } from '../context/SupplierContext';
import type { Supplier } from '../types';

interface SupplierFormData {
  id?: string;
  name: string;
  contact: string;
  address: string;
}

const SupplierFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { suppliers, addSupplier, updateSupplier, loading: contextLoading } = useSuppliers();

  const isEditing = !!id;

  const [formData, setFormData] = useState<SupplierFormData>({
    name: '',
    contact: '',
    address: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && suppliers.length > 0) {
      const supplierToEdit = suppliers.find(s => s.id === id);
      if (supplierToEdit) {
        setFormData({
          id: supplierToEdit.id,
          name: supplierToEdit.name,
          contact: supplierToEdit.contact || '',
          address: supplierToEdit.address || '',
        });
      } else {
        alert('Fornecedor não encontrado.');
        navigate('/suppliers');
      }
    } else if (!isEditing) {
      setFormData({
        name: '',
        contact: '',
        address: '',
      });
    }
  }, [id, isEditing, suppliers, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || contextLoading) return;

    setSubmitting(true);

    const supplierData: Omit<Supplier, 'id'> = {
      name: formData.name,
      contact: formData.contact,
      address: formData.address,
    };

    try {
      if (isEditing && formData.id) {
        await updateSupplier({ ...supplierData, id: formData.id });
        alert('Fornecedor atualizado com sucesso!');
      } else {
        await addSupplier(supplierData);
        alert('Fornecedor salvo com sucesso!');
      }
      navigate('/suppliers');
    } catch (e) {
      alert(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} o fornecedor. Verifique o console para mais detalhes.`);
      console.error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} fornecedor:`, e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container supplier-form-container"> 
      <h1 className="form-page-title"> 
        {isEditing ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}
      </h1>
      <form onSubmit={handleSubmit} className="app-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nome do Fornecedor</label>
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
          <label htmlFor="contact" className="form-label">Contato</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
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
            {submitting ? 'Salvando...' : (isEditing ? 'Atualizar Fornecedor' : 'Salvar Fornecedor')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/suppliers')}
            className="button button-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierFormPage;