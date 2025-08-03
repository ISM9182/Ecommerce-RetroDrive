import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types'; 


interface ProductFormData {
  id?: string; 
  name: string;
  description: string;
  price: string;
  quantity: string;
  color: string;
  category: string;
  supplier: string;
}

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  
  const { products, addProduct, updateProduct, loading } = useProducts();

  const isEditing = !!id; 

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    quantity: '',
    color: '',
    category: '',
    supplier: '',
  });

  useEffect(() => {
    if (isEditing && products.length > 0) {
      const productToEdit = products.find(p => p.id === id);
      if (productToEdit) {
        setFormData({
          id: productToEdit.id,
          name: productToEdit.name,
          description: productToEdit.description,
          price: productToEdit.price.toString(),
          quantity: productToEdit.quantity.toString(), 
          color: productToEdit.color,
          category: productToEdit.category,
          supplier: productToEdit.supplier,
        });
      } else {
        alert('Produto não encontrado.');
        navigate('/products');
      }
    } else if (!isEditing) {
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        color: '',
        category: '',
        supplier: '',
      });
    }
  }, [id, isEditing, products, navigate]); 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const productData: Omit<Product, 'id'> = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      color: formData.color,
      category: formData.category,
      supplier: formData.supplier,
    };

    try {
      if (isEditing && formData.id) {
        await updateProduct({ ...productData, id: formData.id });
        alert('Produto atualizado com sucesso!');
      } else {
        await addProduct(productData);
        alert('Produto salvo com sucesso!');
      }
      navigate('/products'); 
    } catch (e) {
      alert(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} o produto. Verifique o console para mais detalhes.`);
      console.error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} produto:`, e);
    }
  };

  return (
    <div className="page-container product-form-container">
      <h1 className="product-form-title">
        {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nome do Produto</label>
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
        <div className="form-group">
          <label htmlFor="price" className="form-label">Preço</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity" className="form-label">Quantidade</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color" className="form-label">Cor</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input form-select"
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="freios">Freios</option>
            <option value="motor">Motor</option>
            <option value="suspensao">Suspensão</option>
            <option value="iluminacao">Iluminação</option>
            <option value="escapamento">Escapamento</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="supplier" className="form-label">Fornecedor</label>
          <select
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="form-input form-select"
            required
          >
            <option value="">Selecione um fornecedor</option>
            <option value="fornecedorA">Fornecedor A (Freios)</option>
            <option value="fornecedorB">Fornecedor B (Motor)</option>
            <option value="fornecedorC">Fornecedor C (Suspensão)</option>
          </select>
        </div>

        <div className="form-actions">
          <Link to="/products" className="button button-secondary">
            Cancelar
          </Link>
          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Salvando...' : (isEditing ? 'Atualizar Produto' : 'Salvar Produto')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;