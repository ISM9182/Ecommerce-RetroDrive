import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CategoryProvider } from './context/CategoryContext'; // <--- Nova importação
import { SupplierProvider } from './context/SupplierContext';
import { ClientProvider } from './context/ClientContext';
import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <ProductProvider>       
        <CategoryProvider> 
          <SupplierProvider>
             <ClientProvider>
                <NavBar />
                <AppRoutes />
              </ClientProvider>
          </SupplierProvider>
        </CategoryProvider> 
      </ProductProvider>
    </Router>
  );
};

export default App;